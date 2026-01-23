import MovieCard from '../MovieCard';
import MovieSkeleton from '../MovieSkeleton';

const TopRatedSection = ({ movies, loading }) => {
  return (
    <section className="max-w-6xl mx-auto py-8">
      <div className="flex items-center gap-6 mb-6 px-6 md:px-0">
        <h2 className="text-2xl font-bold text-text-main">Top Rated</h2>
      </div>
      
      <div className="flex overflow-x-auto gap-6 pb-6 px-6 md:px-0 scrollbar-hide">
        {loading ? (
          [...Array(10)].map((_, i) => (
            <div key={i} className="min-w-37.5 md:min-w-45">
              <MovieSkeleton />
            </div>
          ))
        ) : (
          movies.map((movie) => (
            <div key={movie.id} className="min-w-37.5 md:min-w-45">
              <MovieCard movie={movie} />
            </div>
          ))
        )}
      </div>
    </section>
  ); 
};

export default TopRatedSection;