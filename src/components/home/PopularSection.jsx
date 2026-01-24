import MovieRowTemplate from '../MovieRowTemplate';

const PopularSection = ({ movies, loading }) => {
  return (
    <MovieRowTemplate 
      title="What's Popular" 
      movies={movies} 
      loading={loading} 
    />
  );
};

export default PopularSection;