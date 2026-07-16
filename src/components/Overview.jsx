import {
  getHealthBadge,
  getLifecycleClass,
  getPnlClass,
  formatPnl,
  getIndexPriceClass,
} from "../utils/commonUtils";

const Overview = ({ health, status, summary, prevIndexPrice }) => {
  return (
    <section className="mt-6 grid gap-4">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-slate-950/20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Overview</h2>
            <p className="mt-1 text-sm text-slate-400">
              Current strategy summary and risk metrics.
            </p>
          </div>
          <div
            className={`inline-flex items-center gap-2 rounded-2xl px-3 py-1 text-sm ${getHealthBadge(health)?.className}`}
          >
            <span>{getHealthBadge(health)?.icon}</span>
            <span>Health: {getHealthBadge(health)?.label}</span>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-slate-950/70 p-5">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Strategy state
            </p>
            <p className="mt-3 text-lg text-white">
              {status?.strategy_state?.status_message || "No message yet"}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${getLifecycleClass(status?.strategy_state?.action)}`}
              >
                Action: {status?.strategy_state?.action ?? "—"}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${getLifecycleClass(status?.strategy_state?.status)}`}
              >
                Status: {status?.strategy_state?.status ?? "—"}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${status?.strategy_state?.triggered ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20" : "bg-slate-800 text-slate-300 border border-slate-700"}`}
              >
                {status?.strategy_state?.triggered ? "TRIGGERED" : "Idle"}
              </span>
            </div>
            <div className="mt-4 grid gap-2 text-sm text-slate-300">
              <div className="flex items-center justify-between rounded-2xl bg-slate-900/90 px-4 py-3">
                <span className="text-slate-400">Trigger price</span>
                <span>{status?.strategy_state?.trigger_price ?? "—"}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-900/90 px-4 py-3">
                <span className="text-slate-400">Trigger PnL</span>
                <span>
                  {status?.strategy_state?.trigger_pnl != null
                    ? formatPnl(status?.strategy_state?.trigger_pnl)
                    : "—"}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-900/90 px-4 py-3">
                <span className="text-slate-400">Last price</span>
                <span>{status?.strategy_state?.last_index_price ?? "—"}</span>
              </div>
            </div>
          </div>
          <div className="rounded-3xl bg-slate-950/70 p-5">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Risk snapshot
            </p>
            <p className="mt-3 text-lg text-white">
              Total positions: {summary?.position_count}
            </p>
            <p className={`mt-2 text-sm`}>
              Unrealized PnL :{" "}
              <span className={`${getPnlClass(summary?.unrealized_pnl)}`}>
                {formatPnl(summary?.unrealized_pnl)}
              </span>
            </p>
            <p className={`mt-2 text-sm`}>
              Index price :{" "}
              <span
                className={`${getIndexPriceClass(summary?.index_price, prevIndexPrice)}`}
              >
                {formatPnl(summary?.index_price)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
