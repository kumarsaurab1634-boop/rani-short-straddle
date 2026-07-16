import { statCards } from "../utils/constants";
import {
  getIndexPriceClass,
  getPnlClass,
  formatPnl,
} from "../utils/commonUtils";

const Stats = ({ summary, prevIndexPrice, status }) => {
  const renderValue = (key) => {
    if (key === "running") return status?.running ? "Running" : "Stopped";
    if (key === "unrealized_pnl") return formatPnl(summary?.unrealized_pnl);
    return summary[key] ?? "-";
  };
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {statCards.map((card) => (
        <article
          key={card.key}
          className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/10"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
            {card.label}
          </p>
          <p
            className={`mt-4 text-3xl font-semibold ${
              card.key === "unrealized_pnl"
                ? getPnlClass(summary?.unrealized_pnl)
                : card.key === "index_price"
                  ? getIndexPriceClass(summary?.index_price, prevIndexPrice)
                  : "text-white"
            }`}
          >
            {renderValue(card.key)}
          </p>
        </article>
      ))}
    </section>
  );
};

export default Stats;
