import MovieRowTemplate from '../MovieRowTemplate';
import TabSwitcher from '../TabSwitcher'; 

const TrendingSection = ({ movies, loading, timeWindow, setTimeWindow, isSearching, query }) => {
  const trendingTabs = [
    { id: 'day', label: 'Today' },
    { id: 'week', label: 'This Week' }
  ];

  return (
    <MovieRowTemplate 
      title={isSearching ? `Results for "${query}"` : 'Trending'} 
      movies={movies} 
      loading={loading}
      animationKey={timeWindow}
    >
      {!isSearching && (
        <TabSwitcher 
          tabs={trendingTabs} 
          activeTab={timeWindow} 
          onChange={setTimeWindow} 
        />
      )}
    </MovieRowTemplate>
  );
};

export default TrendingSection;