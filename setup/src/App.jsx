import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ROLES,
  createTrajectory,
  decryptPayload,
  encryptPayload,
  importKeyFromBase64Url,
  parseSetupFragment,
  randomId,
} from "./lib/crypto";
import { fetchEncryptedBlobs, purgeTrajectory, submitEncryptedAnswer } from "./lib/api";
import AppShell from "./components/AppShell";
import AdvisorHome from "./pages/AdvisorHome";
import AdvisorDashboard from "./pages/AdvisorDashboard";
import RespondentProbe from "./pages/RespondentProbe";
import MissingKey from "./pages/MissingKey";

const VIEWS = {
  home: "home",
  advisor: "advisor",
  respondent: "respondent",
  missing: "missing",
};

export default function App() {
  const [session, setSession] = useState(null);
  const [booting, setBooting] = useState(true);
  const [created, setCreated] = useState(null);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [inbox, setInbox] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function bootFromFragment() {
      const parsed = parseSetupFragment(window.location.hash);
      if (!parsed) {
        if (!cancelled) {
          setSession(null);
          setBooting(false);
        }
        return;
      }

      try {
        const key = await importKeyFromBase64Url(parsed.keyBase64Url);
        if (cancelled) return;
        setSession({
          trajectoryId: parsed.trajectoryId,
          role: parsed.role,
          sessionId: parsed.sessionId || randomId(12),
          key,
          keyBase64Url: parsed.keyBase64Url,
        });
      } catch {
        if (!cancelled) setSession({ invalid: true });
      } finally {
        if (!cancelled) setBooting(false);
      }
    }

    bootFromFragment();
    const onHash = () => {
      setBooting(true);
      bootFromFragment();
    };
    window.addEventListener("hashchange", onHash);
    return () => {
      cancelled = true;
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  const view = useMemo(() => {
    if (booting) return null;
    if (session?.invalid) return VIEWS.missing;
    if (!session) return VIEWS.home;
    if (session.role === ROLES.advisor) return VIEWS.advisor;
    if (session.role === ROLES.team || session.role === ROLES.leader) {
      return VIEWS.respondent;
    }
    return VIEWS.missing;
  }, [booting, session]);

  const handleCreate = async () => {
    setBusy(true);
    setStatus("");
    try {
      const trajectory = await createTrajectory({
        origin: window.location.origin,
        basePath: import.meta.env.BASE_URL || "/",
      });
      setCreated(trajectory);
      setStatus("Traject aangemaakt. Bewaar de drie links — zonder sleutel is het rapport onbereikbaar.");
    } catch (err) {
      setStatus(`Aanmaken mislukt: ${err.message}`);
    } finally {
      setBusy(false);
    }
  };

  const openAdvisorLink = () => {
    if (!created?.links?.advisor) return;
    window.location.href = created.links.advisor;
  };

  const handleProbeSubmit = async (note) => {
    if (!session?.key) return;
    setBusy(true);
    setStatus("");
    try {
      const payload = {
        kind: "phase1-probe",
        role: session.role,
        note: note || "Probe zonder tekst",
        likertSample: 4,
        submittedAt: new Date().toISOString(),
      };
      const { ciphertext, iv } = await encryptPayload(session.key, payload);
      await submitEncryptedAnswer({
        trajectoryId: session.trajectoryId,
        role: session.role,
        respondentId: session.sessionId,
        ciphertext,
        iv,
      });
      setStatus("Versleuteld antwoord verzonden. De server ziet alleen cijferbrij.");
    } catch (err) {
      setStatus(`Verzenden mislukt: ${err.message}`);
    } finally {
      setBusy(false);
    }
  };

  const handleFetch = async () => {
    if (!session?.key) return;
    setBusy(true);
    setStatus("");
    try {
      const data = await fetchEncryptedBlobs(session.trajectoryId);
      const decrypted = [];
      for (const blob of data.blobs) {
        try {
          const payload = await decryptPayload(session.key, blob.ciphertext, blob.iv);
          decrypted.push({
            role: blob.role,
            respondentId: blob.respondentId,
            updatedAt: blob.updatedAt,
            payload,
          });
        } catch {
          decrypted.push({
            role: blob.role,
            respondentId: blob.respondentId,
            updatedAt: blob.updatedAt,
            error: "ontsleuteling_mislukt",
          });
        }
      }
      setInbox({ count: data.count, items: decrypted });
      setStatus(
        data.count === 0
          ? "Nog geen versleutelde antwoorden in de postbus."
          : `${data.count} blob(s) opgehaald en in deze browser ontsleuteld.`
      );
    } catch (err) {
      setStatus(`Ophalen mislukt: ${err.message}`);
    } finally {
      setBusy(false);
    }
  };

  const handlePurge = async () => {
    if (!session?.trajectoryId) return;
    setBusy(true);
    setStatus("");
    try {
      const result = await purgeTrajectory(session.trajectoryId);
      setInbox(null);
      setStatus(`Postbus gewist (${result.purged} blob(s)). TTL wist restanten later als vangnet.`);
    } catch (err) {
      setStatus(`Wissen mislukt: ${err.message}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AppShell>
      <AnimatePresence mode="wait">
        {view ? (
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {view === VIEWS.home ? (
              <AdvisorHome
                created={created}
                busy={busy}
                status={status}
                onCreate={handleCreate}
                onOpenAdvisor={openAdvisorLink}
              />
            ) : null}

            {view === VIEWS.advisor ? (
              <AdvisorDashboard
                session={session}
                busy={busy}
                status={status}
                inbox={inbox}
                onFetch={handleFetch}
                onPurge={handlePurge}
              />
            ) : null}

            {view === VIEWS.respondent ? (
              <RespondentProbe
                session={session}
                busy={busy}
                status={status}
                onSubmit={handleProbeSubmit}
              />
            ) : null}

            {view === VIEWS.missing ? <MissingKey /> : null}
          </motion.div>
        ) : (
          <p className="text-sm text-ink-muted">Sleutel laden…</p>
        )}
      </AnimatePresence>
    </AppShell>
  );
}
