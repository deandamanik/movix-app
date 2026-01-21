import { Search } from 'lucide-react';

const Home = () => {
  return (
    <div className="py-12 px-6">
      <div className="max-w-2xl mx-auto mb-16 text-center">
        <h1 className="text-3xl font-bold mb-6 tracking-tight">
          Find your next favorite movie<span className="text-brand-primary">.</span>
        </h1>
        
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-brand-primary transition-colors" size={20} />
          <input 
            type="text"
            placeholder="Search for movies..."
            className="w-full h-14 pl-12 pr-6 rounded-movix bg-surface border border-brand-muted/30 outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 shadow-soft transition-all"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-6">Trending Movies</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="aspect-2/3 bg-brand-light rounded-movix animate-pulse flex items-center justify-center">
              <span className="text-brand-muted text-sm font-medium">Loading...</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;