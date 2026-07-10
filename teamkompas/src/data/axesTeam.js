// data/axesTeam.js — teamscan (teamlid, route /team/:teamCode, pas nodig vanaf sessie 2
// maar bestand nu al aanmaken zodat het patroon vastligt)
export const axesTeam = [
  {
    key: "doelen",
    label: "Motiverende doelen",
    resultaat: "Uitdaging",
    niveaus: {
      kwetsbaar: "Ik weet eigenlijk niet goed waar dit team nou echt naartoe werkt",
      groeiend: "Ik ken het doel, maar het voelt niet altijd als 'mijn' doel",
      sterk: "Ik voel me elke dag verbonden met waar we samen naartoe werken",
    },
  },
  {
    key: "initiatief",
    label: "Initiatief tonen",
    resultaat: "Energie",
    niveaus: {
      kwetsbaar: "Ik durf niet zomaar met een idee te komen zonder dat erom gevraagd wordt",
      groeiend: "Ik neem soms initiatief, maar niet altijd met evenveel vertrouwen",
      sterk: "Ik voel me vrij om zelf met ideeën en voorstellen te komen",
    },
  },
  {
    key: "flexibiliteit",
    label: "Flexibel aanpassen",
    resultaat: "Ontwikkeling",
    niveaus: {
      kwetsbaar: "Als er iets verandert, voel ik vooral onrust in het team",
      groeiend: "We komen er wel, maar veranderingen verlopen bij ons vaak stroef",
      sterk: "Ik merk dat we soepel omgaan met dingen die anders lopen dan gepland",
    },
  },
  {
    key: "respect",
    label: "Respect voor verschillen",
    resultaat: "Vertrouwen",
    niveaus: {
      kwetsbaar: "Ik voel dat mijn manier van werken niet altijd gewaardeerd wordt",
      groeiend: "Verschillen mogen er zijn, maar we doen er nog weinig mee",
      sterk: "Ik voel me gewaardeerd, ook als ik het anders aanpak",
    },
  },
  {
    key: "communicatie",
    label: "Open communicatie",
    resultaat: "Helderheid",
    niveaus: {
      kwetsbaar: "Ik houd dingen liever voor mezelf dan dat ik ze hardop bespreek",
      groeiend: "Ik zeg meestal wat ik denk, maar niet over alles even makkelijk",
      sterk: "Ik kan gewoon zeggen wat ik denk, ook als het schuurt",
    },
  },
  {
    key: "verantwoordelijkheid",
    label: "Gedeelde verantwoordelijkheid",
    resultaat: "Verbinding",
    niveaus: {
      kwetsbaar: "Als iets misgaat, voelt niemand zich er echt verantwoordelijk voor",
      groeiend: "Ik weet wat mijn taak is, maar spreek anderen zelden aan op hun afspraken",
      sterk: "Ik voel me mede-eigenaar van wat we samen bereiken, niet alleen van mijn eigen taak",
    },
  },
];
