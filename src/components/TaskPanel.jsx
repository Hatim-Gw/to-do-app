function TaskPanel({
  title,
  subtitle,
  emptyText,
  tasks,
  actionLabel,
  onAction,
  locked = false,
}) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-cyan-950/20 backdrop-blur">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
          <p className="mt-1 text-sm text-slate-300">{subtitle}</p>
        </div>
        <span className="rounded-full border border-white/10 bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
          {tasks.length}
        </span>
      </div>

      {tasks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-slate-900/60 px-4 py-8 text-center text-sm text-slate-400">
          {emptyText}
        </div>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="rounded-2xl border border-white/10 bg-slate-950/70 p-4"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-white">
                    {task.name}
                  </p>
                  <p className="text-sm text-slate-300">
                    Final date: {formatDate(task.finalDate)}
                  </p>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                      task.state === "done"
                        ? "bg-emerald-400/15 text-emerald-300"
                        : "bg-amber-400/15 text-amber-300"
                    }`}
                  >
                    {task.state}
                  </span>
                </div>

                {!locked ? (
                  <button
                    type="button"
                    onClick={() => onAction?.(task.id)}
                    className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/20 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                  >
                    {actionLabel}
                  </button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function formatDate(dateValue) {
  if (!dateValue) {
    return "No date set";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateValue));
}

export default TaskPanel;
