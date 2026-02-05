const DetailHeroSkeleton = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-125 z-0 animate-pulse">
      <div className="w-full h-full bg-slate-200" />
      <div className="absolute inset-0 bg-linear-to-b from-slate-300/50 via-white/40 to-white" />
    </div>
  );
};

export default DetailHeroSkeleton;