const MovieSkeleton = ({ type = "movie" }) => {
  return (
    <div className="flex flex-col gap-3">
      {type === "movie" ? (
        // Versi Movie (Poster 2:3)
        <>
          <div className="aspect-2/3 w-full bg-brand-muted/20 rounded-movix animate-pulse" />
          <div className="h-4 bg-brand-muted/20 rounded-full w-3/4 animate-pulse" />
          <div className="h-3 bg-brand-muted/20 rounded-full w-1/2 animate-pulse" />
        </>
      ) : (
        <>
          <div className="aspect-video w-full bg-white/10 rounded-xl animate-pulse" />
          <div className="h-4 bg-white/10 rounded-full w-3/4 mx-auto animate-pulse" />
          <div className="h-2 bg-white/10 rounded-full w-1/4 mx-auto animate-pulse" />
        </>
      )}
    </div>
  );
};

export default MovieSkeleton;