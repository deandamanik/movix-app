const DetailHero = ({ backdropPath }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-125 z-0">
      <img 
        src={`https://image.tmdb.org/t/p/original${backdropPath}`} 
        alt=""
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-white/60 to-white" />
    </div>
  );
};

export default DetailHero;