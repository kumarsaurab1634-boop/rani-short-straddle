import { getPnlClass, formatPnl } from "../utils/commonUtils";

const PositionTable = ({ summary }) => {
  const openPositions = summary?.positions ?? [];
  const closedPositions = summary?.closed_positions ?? [];

  const renderOpenTable = () => (
    <div className="overflow-x-auto p-6">
      <table className="min-w-full text-left text-sm text-slate-200">
        <thead className="border-b border-slate-800 text-slate-400">
          <tr>
            <th className="px-3 py-3">Position</th>
            <th className="px-3 py-3">Symbol</th>
            <th className="px-3 py-3">Type</th>
            <th className="px-3 py-3">Strike</th>
            <th className="px-3 py-3">Expiry</th>
            <th className="px-3 py-3">Size</th>
            <th className="px-3 py-3">Entry</th>
            <th className="px-3 py-3">Bid</th>
            <th className="px-3 py-3">Ask</th>
            <th className="px-3 py-3">PnL</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {openPositions.length === 0 ? (
            <tr>
              <td colSpan="10" className="px-3 py-6 text-center text-slate-500">
                No open positions found.
              </td>
            </tr>
          ) : (
            openPositions.map((position) => (
              <tr key={position.product_id} className="hover:bg-slate-950/60">
                <td className="px-3 py-4">
                  {position?.size > 0 ? "Buy" : "Sell"}
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  {position.symbol.split("-").slice(0, 3).join("-")}
                </td>
                <td className="px-3 py-4">{position?.option_type}</td>
                <td className="px-3 py-4">{position?.strike}</td>
                <td className="px-3 py-4 whitespace-nowrap">
                  {position.expiry
                    ? position.expiry
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("-")
                    : "N/A"}
                </td>
                <td className="px-3 py-4">{position?.size}</td>
                <td className="px-3 py-4">{position?.entry_price}</td>
                <td className="px-3 py-4">{position?.best_bid}</td>
                <td className="px-3 py-4">{position?.best_ask}</td>
                <td
                  className={`px-3 py-4 ${getPnlClass(position?.current_pnl)}`}
                >
                  {formatPnl(position?.current_pnl)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  const renderClosedTable = () => (
    <div className="overflow-x-auto border-t border-slate-800 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Closed Positions</h3>
        <span className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs text-slate-300">
          {closedPositions.length} trades
        </span>
      </div>
      <table className="min-w-full text-left text-sm text-slate-200">
        <thead className="border-b border-slate-800 text-slate-400">
          <tr>
            <th className="px-3 py-3">Symbol</th>
            <th className="px-3 py-3">Type</th>
            <th className="px-3 py-3">Strike</th>
            <th className="px-3 py-3">Expiry</th>
            <th className="px-3 py-3">Side</th>
            <th className="px-3 py-3">Size</th>
            <th className="px-3 py-3">Entry</th>
            <th className="px-3 py-3">Closed Price</th>
            <th className="px-3 py-3">Realized PnL</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {closedPositions.length === 0 ? (
            <tr>
              <td colSpan="9" className="px-3 py-6 text-center text-slate-500">
                No closed positions yet.
              </td>
            </tr>
          ) : (
            closedPositions.map((position, index) => (
              <tr
                key={`${position.product_id ?? "closed"}-${index}`}
                className="hover:bg-slate-950/60"
              >
                <td className="px-3 py-4 whitespace-nowrap">
                  {position.symbol ?? "N/A"}
                </td>
                <td className="px-3 py-4">{position.option_type ?? "N/A"}</td>
                <td className="px-3 py-4">{position.strike ?? "N/A"}</td>
                <td className="px-3 py-4 whitespace-nowrap">
                  {position.expiry
                    ? new Date(position.expiry)
                        .toISOString()
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("-")
                    : "N/A"}
                </td>
                <td className="px-3 py-4">{position.side ?? "N/A"}</td>
                <td className="px-3 py-4">{position.size ?? "N/A"}</td>
                <td className="px-3 py-4">{position.entry_price ?? "N/A"}</td>
                <td className="px-3 py-4">{position.closed_price ?? "N/A"}</td>
                <td
                  className={`px-3 py-4 ${getPnlClass(position.realized_pnl)}`}
                >
                  {formatPnl(position.realized_pnl)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <section className="mt-6 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/90 shadow-xl shadow-slate-950/15">
      <div className="border-b border-slate-800 bg-slate-950/90 px-6 py-4">
        <h2 className="text-xl font-semibold text-white">Open Positions</h2>
        <p className="mt-1 text-sm text-slate-400">
          Current option legs and PnL details.
        </p>
      </div>
      {renderOpenTable()}
      {renderClosedTable()}
    </section>
  );
};

export default PositionTable;
