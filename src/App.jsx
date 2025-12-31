// src/App.jsx
import { useState, useEffect } from 'react';
// import Header from './components/Header'
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import AllResultsPage from './pages/AllResultsPage';
import { getGames, getTodayResults, getResultsByDate, getGameResults } from './utils/supabase';
import './App.css';

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedGame, setSelectedGame] = useState(null);
  const [games, setGames] = useState([]);
  const [todayResults, setTodayResults] = useState([]);
  const [gameResults, setGameResults] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Format date: "Jan Thu 1st, 2026"
  const formatDate = (date) => {
      const d = new Date(date);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const day = d.getDate();
      const suffix = day === 1 || day === 21 || day === 31 ? 'st' : 
                    day === 2 || day === 22 ? 'nd' : 
                    day === 3 || day === 23 ? 'rd' : 'th';
      return `${months[d.getMonth()]} ${days[d.getDay()]} ${day}${suffix}, ${d.getFullYear()}`;
  };

  // Initialize games and today's results from Supabase
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch games
        const gamesData = await getGames();
        setGames(gamesData);

        // Fetch today's results
        const todayData = await getTodayResults();
        setTodayResults(todayData);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please check your internet connection.');
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Load game results when a game is selected
  useEffect(() => {
    const fetchGameResults = async () => {
      if (selectedGame) {
        try {
          setLoading(true);
          const results = await getGameResults(selectedGame.id);
          setGameResults(results);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching game results:', err);
          setError('Failed to load game results.');
          setLoading(false);
        }
      }
    };

    fetchGameResults();
  }, [selectedGame]);

  const handleGameClick = (game) => {
    setSelectedGame(game);
    setCurrentView('game');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHomeClick = () => {
    setCurrentView('home');
    setSelectedGame(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAllResultsClick = () => {
    setCurrentView('allresults');
    setSelectedGame(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDateSearch = async (searchDate) => {
    try {
      setLoading(true);
      const results = await getResultsByDate(searchDate);
      setLoading(false);
      return results;
    } catch (err) {
      console.error('Error searching by date:', err);
      setLoading(false);
      return [];
    }
  };

  if (loading && games.length === 0) {
    return (
      <div className="app">
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <p>Loading Green Lotto results...</p>
        </div>
      </div>
    );
  }

  if (error && games.length === 0) {
    return (
      <div className="app">
        <div className="error-screen">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
        <Header
      
        onHomeClick={handleHomeClick}
        onAllResultsClick={handleAllResultsClick}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        games={games}
        onGameClick={handleGameClick}
      /> 

      <div className="main-container">
        <Sidebar
          games={games}
          selectedGame={selectedGame}
          onGameClick={handleGameClick}
        />

        <main className="main-content">
          {currentView === 'home' ? (
            <HomePage
              todayResults={todayResults}
              games={games}
              formatDate={formatDate}
              onGameClick={handleGameClick}
              onDateSearch={handleDateSearch}
            />
          ) : currentView === 'allresults' ? (
            <AllResultsPage
              games={games}
              onGameClick={handleGameClick}
            />
          ) : (
            <GamePage
              selectedGame={selectedGame}
              gameResults={gameResults}
              formatDate={formatDate}
              onHomeClick={handleHomeClick}
            />
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default App;