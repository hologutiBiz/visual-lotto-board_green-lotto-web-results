import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import './styles/App.css';

// Mock data generator (remove when connecting to real Supabase)
const mockGames = [
      { id: 1, game_name: 'Naija Vag', slug: 'naija-vag' },
      { id: 2, game_name: 'Dream Number', slug: 'dream-number' },
      { id: 3, game_name: 'Odogwu', slug: 'odogwu' },
      { id: 4, game_name: 'Unlimited', slug: 'unlimited' },
      { id: 5, game_name: 'Noon Rush', slug: 'noon-rush' },
      { id: 6, game_name: 'Wazobia', slug: 'wazobia' },
      { id: 7, game_name: 'Destiny', slug: 'destiny' },
      { id: 8, game_name: 'Faaji', slug: 'faaji' },
      { id: 9, game_name: 'Champion', slug: 'champion' },
      { id: 10, game_name: 'Monday Special', slug: 'monday-special' },
      { id: 11, game_name: 'Tuesday Lucky', slug: 'tuesday-lucky' },
      { id: 12, game_name: 'Midweek', slug: 'midweek' },
      { id: 13, game_name: 'Fortune', slug: 'fortune' },
      { id: 14, game_name: 'Bonanza', slug: 'bonanza' },
      { id: 15, game_name: 'National', slug: 'national' },
      { id: 16, game_name: 'Aseda', slug: 'aseda' }
  ];

const generateMockResult = (gameId, date = new Date()) => ({
    id: Math.random(),
    game_id: gameId,
    draw_number: Math.floor(Math.random() * 9000) + 1000,
    draw_date: date.toISOString().split('T')[0],
    draw_time: `${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')} ${Math.random() > 0.5 ? 'PM' : 'AM'}`,
    machine: String(Math.floor(Math.random() * 5) + 1),
    winning_numbers: Array.from({ length: 5 }, () => Math.floor(Math.random() * 90) + 1).sort((a, b) => a - b),
    machine_numbers: Array.from({ length: 5 }, () => Math.floor(Math.random() * 90) + 1).sort((a, b) => a - b)
});

const App = () => {
    const [currentView, setCurrentView] = useState('home');
    const [selectedGame, setSelectedGame] = useState(null);
    const [games, setGames] = useState([]);
    const [todayResults, setTodayResults] = useState([]);
    const [gameResults, setGameResults] = useState([]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

    useEffect(() => {
        setGames(mockGames);
        const today = mockGames.map(game => generateMockResult(game.id));
        setTodayResults(today);
    }, []);

    useEffect(() => {
        if (selectedGame) {
            const results = [];
            for (let i = 0; i < 50; i++) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                results.push(generateMockResult(selectedGame.id, date));
            }
            setGameResults(results);
        }
    }, [selectedGame]);

    const handleGameClick = (game) => {
        setSelectedGame(game);
        setCurrentView('game');
        setMobileMenuOpen(false);
    };

    const handleHomeClick = () => {
        setCurrentView('home');
        setSelectedGame(null);
        setMobileMenuOpen(false);
    };

  return (
      <div className="app">
          <Header
              onHomeClick={handleHomeClick}
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
