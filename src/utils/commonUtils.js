export const getPnlClass = (value) => {
  const amount = Number(value);
  if (Number.isNaN(amount) || amount === 0) return "text-slate-100";
  return amount > 0 ? "text-emerald-400" : "text-rose-400";
};

export const formatPnl = (value) => {
  if (value === null || value === undefined) return "-";
  const amount = Number(value);
  if (Number.isNaN(amount)) return String(value);
  return amount.toFixed(2);
};

export const getHealthBadge = (health) => {
  const isOk = String(health).toLowerCase() === "ok";
  return {
    label: isOk ? "OK" : "NOT OK",
    icon: isOk ? "✓" : "✕",
    className: isOk
      ? "bg-emerald-500/10 text-emerald-300"
      : "bg-rose-500/10 text-rose-300",
  };
};

export const getLifecycleClass = (text) => {
  const value = String(text || "").toLowerCase();
  if (
    value.includes("closing") ||
    value.includes("exit") ||
    value.includes("closing positions")
  ) {
    return "bg-rose-500/10 text-rose-300 border border-rose-500/20";
  }
  if (value.includes("monitoring") || value.includes("waiting")) {
    return "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20";
  }
  if (value.includes("converting") || value.includes("conversion")) {
    return "bg-amber-500/10 text-amber-300 border border-amber-500/20";
  }
  if (
    value.includes("running") ||
    value.includes("active") ||
    value.includes("ok")
  ) {
    return "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20";
  }
  return "bg-slate-800 text-slate-300 border border-slate-700";
};

export const getIndexPriceClass = (currentPrice, prevIndexPrice) => {
  const current = Number(currentPrice);
  const previous = prevIndexPrice === null ? null : Number(prevIndexPrice);
  if (Number.isNaN(current) || previous === null || Number.isNaN(previous)) {
    return "text-white";
  }
  if (current > previous) return "text-emerald-400";
  if (current < previous) return "text-rose-400";
  return "text-white";
};
