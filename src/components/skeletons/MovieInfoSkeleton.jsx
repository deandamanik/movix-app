const MovieInfoSkeleton = () => {
  return (
    <div className="flex-1 animate-pulse">
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="w-16 h-6 bg-slate-200 rounded-md" />
        <div className="w-16 h-6 bg-slate-200 rounded-md" />
        <div className="w-16 h-6 bg-slate-200 rounded-md" />
      </div>

      <div className="w-3/4 h-12 md:h-16 bg-slate-200 rounded-xl mb-4" />

      <div className="flex flex-wrap gap-6 items-center mb-8">
        <div className="w-20 h-10 bg-slate-100 rounded-lg border border-slate-200" />
        <div className="w-24 h-10 bg-slate-100 rounded-lg border border-slate-200" />
        <div className="w-20 h-10 bg-slate-100 rounded-lg border border-slate-200" />
      </div>

      <div className="w-full max-w-md h-6 bg-slate-100 rounded-md mb-8 italic" />

      <div className="flex flex-wrap gap-4 mb-12">
        <div className="w-44 h-14 bg-slate-200 rounded-2xl" />
        <div className="w-44 h-14 bg-slate-200 rounded-2xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div className="w-32 h-4 bg-slate-200 rounded-md" />
          <div className="space-y-2">
            <div className="w-full h-4 bg-slate-100 rounded-md" />
            <div className="w-full h-4 bg-slate-100 rounded-md" />
            <div className="w-4/5 h-4 bg-slate-100 rounded-md" />
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="w-24 h-4 bg-slate-200 rounded-md" />
            <div className="w-32 h-6 bg-slate-100 rounded-md" />
          </div>
          <div className="space-y-2">
            <div className="w-24 h-4 bg-slate-200 rounded-md" />
            <div className="w-40 h-6 bg-slate-100 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfoSkeleton;