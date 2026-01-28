const WatchlistHeader = ({ count }) => (
  <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-text-main mb-2">
        My Watchlist<span className="text-brand-primary">.</span>
      </h1>
      <p className="text-text-secondary">You have saved {count} movies.</p>
    </div>

    <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
      <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">Storage</span>
      <div className="h-2 w-24 bg-slate-200 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-500 ${count >= 5 ? 'bg-red-500' : 'bg-brand-primary'}`}
          style={{ width: `${(count / 5) * 100}%` }}
        />
      </div>
      <span className="text-xs font-bold text-text-main">{count}/5</span>
    </div>
  </header>
);

export default WatchlistHeader;