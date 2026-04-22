export function formatSalary(salary) {
  if (!salary) return 'Competitive';
  const { min, max, currency, period } = salary;
  const fmt = (n) => n.toLocaleString();
  return `${currency} ${fmt(min)} – ${fmt(max)} / ${period}`;
}

export function formatSalaryShort(salary) {
  if (!salary) return 'Negotiable';
  const { min, max, currency } = salary;
  const k = (n) => (n >= 1000 ? `${(n / 1000).toFixed(0)}K` : n);
  return `${currency} ${k(min)}–${k(max)}`;
}

const toUSD = { AED: 0.27, QAR: 0.27, SAR: 0.27, KWD: 3.25, OMR: 2.6, BHD: 2.65, USD: 1, INR: 0.012 };

export function salaryToUSD(salary) {
  if (!salary) return 0;
  const rate = toUSD[salary.currency] ?? 1;
  return ((salary.min + salary.max) / 2) * rate;
}
