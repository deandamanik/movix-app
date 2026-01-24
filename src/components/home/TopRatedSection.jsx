import MovieRowTemplate from '../MovieRowTemplate';

const TopRatedSection = ({ movies, loading }) => {
  return (
    <MovieRowTemplate 
      title="Top Rated" 
      movies={movies} 
      loading={loading} 
    />
  );
};

export default TopRatedSection;