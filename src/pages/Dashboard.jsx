import { useEffect, useState } from "react";
import PositionTable from "../components/PositionTable";
import {
  getPnlClass,
  formatPnl,
  getIndexPriceClass,
} from "../utils/commonUtils";
import Overview from "../components/Overview";
import Stats from "../components/Stats";
import { API_BASE_URL } from "../utils/constants";
import { fetchData, postData } from "../services/api";

function App() {
  const [health, setHealth] = useState("unknown");
  const [status, setStatus] = useState({ running: false, strategy_state: {} });
  const [summary, setSummary] = useState({
    positions: [],
    unrealized_pnl: 0,
    index_price: 0,
    position_count: 0,
    strategy_state: {},
  });
  const [prevIndexPrice, setPrevIndexPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeAction, setActiveAction] = useState("");
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    if (!status.running) {
      handleAction("/start", "Start bot");
    }
  }, [status]);

  const loadHealth = async () => {
    const healthData = await fetchData("/health");
    setHealth(healthData.status);
  };

  const loadStatus = async () => {
    const statusData = await fetchData("/status");
    setStatus(statusData);
  };

  const loadSummary = async () => {
    const summaryData = await fetchData("/summary");
    setPrevIndexPrice((prev) =>
      prev === null ? summaryData.index_price : summary.index_price,
    );
    setSummary(summaryData);
  };

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      await Promise.all([loadHealth(), loadStatus(), loadSummary()]);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleAction = async (path, label) => {
    if (loading) return;
    setError("");
    setActiveAction(label);
    try {
      await postData(path);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Action failed");
    } finally {
      setActiveAction("");
    }
  };

  const handleRefresh = async () => {
    if (loading) return;
    setError("");
    setActiveAction("Refresh");
    try {
      await loadData();
    } finally {
      setActiveAction("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-slate-950/20 backdrop-blur">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-400/80">
                Delta BTC Options
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-white">
                Trading Bot Dashboard
              </h1>
              <p className="mt-2 max-w-2xl text-slate-400">
                Monitor bot health, open positions, and trading performance in
                one modern dashboard.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleAction("/start", "Start bot")}
                // disabled={loading}
                className="rounded-full cursor-pointer px-5 py-2 text-sm font-semibold transition bg-cyan-500 text-slate-950 hover:bg-cyan-400"
              >
                {activeAction === "Start bot" ? "Starting..." : "Start Bot"}
              </button>
              <button
                onClick={() => handleAction("/stop", "Stop bot")}
                disabled={loading}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  loading
                    ? "bg-slate-700/70 text-slate-300 cursor-not-allowed"
                    : "bg-slate-700 text-white hover:bg-slate-600"
                }`}
              >
                {activeAction === "Stop bot" ? "Stopping..." : "Stop Bot"}
              </button>
              {/* <button
                onClick={handleHealthCheck}
                disabled={loading}
                className={`rounded-full border px-5 py-2 text-sm transition ${
                  loading
                    ? "border-slate-700/70 text-slate-400 cursor-not-allowed"
                    : "border-slate-700 text-slate-200 hover:border-cyan-400 hover:text-cyan-300"
                }`}
              >
                {activeAction === "Health check"
                  ? "Checking..."
                  : "Health Check"}
              </button> */}
              {/* <button
                onClick={handleRefresh}
                disabled={loading}
                className={`rounded-full border px-5 py-2 text-sm transition ${
                  loading
                    ? "border-slate-700/70 text-slate-400 cursor-not-allowed"
                    : "border-slate-700 text-slate-200 hover:border-cyan-400 hover:text-cyan-300"
                }`}
              >
                {activeAction === "Refresh" ? "Refreshing..." : "Refresh"}
              </button> */}
            </div>
            {/* {loading && activeAction && (
              <p className="mt-3 text-sm text-slate-400">
                {activeAction} in progress...
              </p>
            )} */}
          </div>
        </header>
        <Stats
          summary={summary}
          prevIndexPrice={prevIndexPrice}
          status={status}
        />
        <Overview
          health={health}
          status={status}
          summary={summary}
          prevIndexPrice={prevIndexPrice}
        />
        <PositionTable summary={summary} />
      </div>
    </div>
  );
}

export default App;
