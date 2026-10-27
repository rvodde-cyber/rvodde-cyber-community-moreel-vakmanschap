type Props = {
  step: number;
  title: string;
  lead: string;
  sub?: string;
};

export function TaskBar({ step, title, lead, sub }: Props) {
  return (
    <section className="task" aria-label="Jullie opdracht">
      <span className="k">STAP {step} VAN 4 / {title}</span>
      <p>{lead}</p>
      {sub ? <p>{sub}</p> : null}
    </section>
  );
}
