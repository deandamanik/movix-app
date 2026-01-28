import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Watchlist from './pages/Watchlist';
import MovieDetail from './pages/MovieDetail';
import WatchlistToast from './components/WatchlistToast'; 

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-app-bg relative"> 
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