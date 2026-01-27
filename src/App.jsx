import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Watchlist from './pages/Watchlist';
import MovieDetail from './pages/MovieDetail';
import WatchlistToast from './components/WatchlistToast'; // Impor di sini

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-app-bg relative"> 
        {/* Panggil di sini, dia akan melayang secara global */}
        <WatchlistToast />
        
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;