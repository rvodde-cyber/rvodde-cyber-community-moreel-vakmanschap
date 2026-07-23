export function bepaalFaseDirect(antwoorden) {
  // antwoorden: array van 5 strings — elk 'forming' | 'storming' | 'norming' | 'performing'
  const tellingen = { forming: 0, storming: 0, norming: 0, performing: 0 };
  antwoorden.forEach((fase) => {
    tellingen[fase] += 1;
  });

  const maxAantal = Math.max(...Object.values(tellingen));
  const kandidaten = Object.keys(tellingen).filter((fase) => tellingen[fase] === maxAantal);

  if (kandidaten.length > 1) {
    return { fase: "gemengd beeld", tellingen };
  }
  return { fase: kandidaten[0], tellingen };
}
