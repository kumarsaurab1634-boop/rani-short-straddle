import {
  getHealthBadge,
  getLifecycleClass,
  getPnlClass,
  formatPnl,
  getIndexPriceClass,
} from "../utils/commonUtils";

const Overview = ({ health, status, summary, prevIndexPrice }) => {
  const state = status?.strategy_state ?? {};

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
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-3xl bg-slate-950/70 p-5">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Strategy state
            </p>
            <p className="mt-3 text-lg text-white">
              {state.status_message || "No message yet"}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${getLifecycleClass(state.action)}`}
              >
                Action: {state.action ?? "—"}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${getLifecycleClass(state.status)}`}
              >
                Status: {state.status ?? "—"}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${state.triggered ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20" : "bg-slate-800 text-slate-300 border border-slate-700"}`}
              >
                {state.triggered ? "TRIGGERED" : "Idle"}
              </span>
            </div>
            <div className="mt-4 grid gap-2 text-sm text-slate-300">
              <div className="flex items-center justify-between rounded-2xl bg-slate-900/90 px-4 py-3">
                <span className="text-slate-400">Current structure</span>
                <span>{state.current_structure ?? "—"}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-900/90 px-4 py-3">
                <span className="text-slate-400">Strike threshold</span>
                <span>{state.threshold ?? "—"}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-900/90 px-4 py-3">
                <span className="text-slate-400">Last transition</span>
                <span>{state.last_transition ?? "—"}</span>
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
            <div className="mt-4 grid gap-2 text-sm text-slate-300">
              <div className="flex items-center justify-between rounded-2xl bg-slate-900/90 px-4 py-3">
                <span className="text-slate-400">Unrealized PnL</span>
                <span className={getPnlClass(summary?.unrealized_pnl)}>
                  {formatPnl(summary?.unrealized_pnl)}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-900/90 px-4 py-3">
                <span className="text-slate-400">Index price</span>
                <span
                  className={getIndexPriceClass(
                    summary?.index_price,
                    prevIndexPrice,
                  )}
                >
                  {formatPnl(summary?.index_price)}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-900/90 px-4 py-3">
                <span className="text-slate-400">Combined PnL</span>
                <span className={getPnlClass(state.combined_pnl)}>
                  {formatPnl(state.combined_pnl)}
                </span>
              </div>
            </div>
          </div>
          <div className="rounded-3xl bg-slate-950/70 p-5">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Exit settings
            </p>
            <div className="mt-4 grid gap-3 text-sm text-slate-300">
              <div className="flex items-center justify-between rounded-2xl bg-slate-900/90 px-4 py-3">
                <span className="text-slate-400">Profit target</span>
                <span>{formatPnl(state.profit_target)}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-900/90 px-4 py-3">
                <span className="text-slate-400">Stop loss</span>
                <span>{formatPnl(state.stop_loss)}</span>
              </div>
              <div className="flex flex-col gap-1 rounded-2xl bg-slate-900/90 px-4 py-3">
                <span className="text-slate-400">Exit reason</span>
                <span className="text-slate-200">
                  {state.exit_reason || "None"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
