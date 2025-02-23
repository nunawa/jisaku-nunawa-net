export function formatKb(kb: number): string {
  let formattedKb = `${kb} KB`;

  const m = kb / 1000;
  const g = m / 1000;
  const t = g / 1000;

  if (t >= 1) {
    formattedKb = `${t} TB`;
  } else if (g >= 1) {
    formattedKb = `${g} GB`;
  } else if (m >= 1) {
    formattedKb = `${m} MB`;
  }

  return formattedKb;
}
