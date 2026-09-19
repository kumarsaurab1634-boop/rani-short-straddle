export const API_BASE_URL =
  import.meta.env.VITE_API_BASE || "http://localhost:8001";

const configuredSeconds = Number(
  import.meta.env.VITE_POLL_INTERVAL_SECONDS ??
    (Number(import.meta.env.VITE_POLL_INTERVAL_MS ?? 2000) / 1000 || 2),
);

export const UI_POLL_INTERVAL_MS =
  Number.isFinite(configuredSeconds) && configuredSeconds > 0
    ? configuredSeconds * 1000
    : 2000;

export const statCards = [
  { label: "Bot Status", key: "running" },
  { label: "Index Price", key: "index_price" },
  { label: "Unrealized PnL", key: "unrealized_pnl" },
  { label: "Realized PnL", key: "realized_pnl" },
  { label: "Combined PnL", key: "combined_pnl" },
  { label: "Profit Target", key: "profit_target" },
  { label: "Stop Loss", key: "stop_loss" },
  { label: "Positions", key: "position_count" },
];
