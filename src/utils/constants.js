export const API_BASE_URL =
  import.meta.env.VITE_API_BASE || "http://localhost:8000";

export const statCards = [
  { label: "Bot Status", key: "running" },
  { label: "Index Price", key: "index_price" },
  { label: "Unrealized PnL", key: "unrealized_pnl" },
  { label: "Combined PnL", key: "combined_pnl" },
  { label: "Profit Target", key: "profit_target" },
  { label: "Stop Loss", key: "stop_loss" },
  { label: "Positions", key: "position_count" },
];
