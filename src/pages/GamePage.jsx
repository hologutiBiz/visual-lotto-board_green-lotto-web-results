import { useState } from 'react';
import { Home, Search } from 'lucide-react';
import GameTable from '../components/GameTable';
import AdUnit from '../components/AdUnit';
import "../styles/GamePage.css";

const GamePage = ({ selectedGame, gameResults, formatDate, onHomeClick }) => {
    const [searchDate, setSearchDate] = useState('');

    const handleSearch = () => {
        // Search functionality will be implemented with Supabase
        console.log('Searching for:', searchDate);
    };

    return (
        <div className="page-content">
            <div className="game-header">
                <button onClick={onHomeClick} className="back-btn">
                    <Home size={24} />
                </button>
                <div>
                    <h1 className="game-title">{selectedGame.game_name}</h1>
                    <p className="game-subtitle">Complete historical results</p>
                </div>
            </div>

            <AdUnit position="Game Page Top" />

            <div className="search-box">
                <div className="search-input-group">
                    <label className="search-label">Search by Date</label>
                    <input
                        type="date"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                        className="search-input"
                    />
                </div>

                <button onClick={handleSearch} className="search-btn">
                    <Search size={18} />
                        Search
                </button>
            </div>

            <GameTable results={gameResults} formatDate={formatDate} />
            <AdUnit position="Game Page Bottom" />
        </div>
    );
};

export default GamePage;