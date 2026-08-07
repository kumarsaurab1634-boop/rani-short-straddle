const LogsPanel = ({ logs }) => {
  return (
    <section className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-slate-950/20">
      <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Recent Logs</h2>
          <p className="mt-1 text-sm text-slate-400">
            Latest API and bot activity for troubleshooting.
          </p>
        </div>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-400">
          {logs?.length ?? 0} entries
        </span>
      </div>
      <div className="mt-4 max-h-80 overflow-y-auto text-sm text-slate-200">
        {logs?.length === 0 ? (
          <p className="px-4 py-8 text-center text-slate-500">
            No logs available yet.
          </p>
        ) : (
          <div className="space-y-3">
            {logs.slice(0, 20).map((log, index) => (
              <div
                key={`${log.timestamp}-${index}`}
                className="rounded-2xl border border-slate-800 bg-slate-950/90 p-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.24em] text-slate-500">
                  <span>{log.timestamp ?? "—"}</span>
                  <span>{log.level ?? "INFO"}</span>
                </div>
                <p className="mt-2 text-sm text-slate-200">{log.message}</p>
                {log.data && (
                  <pre className="mt-3 overflow-x-auto rounded-2xl bg-slate-900 px-3 py-2 text-xs text-slate-300">
                    {JSON.stringify(log.data, null, 2)}
                  </pre>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LogsPanel;
