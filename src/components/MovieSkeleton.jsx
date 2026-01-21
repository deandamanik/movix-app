const MovieSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-2/3 w-full bg-brand-muted/20 rounded-movix animate-pulse" />
      <div className="h-4 bg-brand-muted/20 rounded-full w-3/4 animate-pulse" />
      <div className="h-3 bg-brand-muted/20 rounded-full w-1/2 animate-pulse" />
    </div>
  );
};

export default MovieSkeleton;