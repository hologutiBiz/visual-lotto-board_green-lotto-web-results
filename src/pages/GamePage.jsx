import { useState, useEffect } from 'react';
import { Home, Search } from 'lucide-react';
import GameTable from '../components/GameTable';
import AdUnit from '../components/AdUnit';
import "../styles/GamePage.css";

const GamePage = ({ selectedGame, gameResults, formatDate, onHomeClick, gameLoading, error }) => {
    const [searchDate, setSearchDate] = useState('');
    const [filteredResults, setFilteredResults] = useState(gameResults);

    // Update filtered results when gameResults changes
    useEffect(() => {
        setFilteredResults(gameResults);
    }, [gameResults]);

    const handleSearch = () => {
        if (!searchDate) {
            setFilteredResults(gameResults);
            return; 
        }
        
        // Filter results by selected date
        const filtered = gameResults.filter(result => result.draw_date === searchDate);
        setFilteredResults(filtered);

        const handleClearSearch = () => {
            setSearchDate('');
            setFilteredResults(gameResults);
        };
    };

    return (
        <div className="page-content">
            <div className="game-header">
                <button onClick={onHomeClick} className="back-btn">
                    <Home size={24} />
                </button>
                <div>
                    <h1 className="game-title">{selectedGame.game_name}</h1>
                    <p className="game-subtitle">Complete results</p>
                </div>
            </div>

            <AdUnit position="Game Page Top" />

            {/* <div className="search-box">
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

                {searchDate && (
                    <button onClick={handleClearSearch} className="clear-btn">
                        Clear
                    </button>
                )}
            </div> */}

            <GameTable 
                results={gameResults} 
                formatDate={formatDate}
                loading={gameLoading} 
                error={error}
                gameName={selectedGame?.game_name}
            />
            <AdUnit position="Game Page Bottom" />
        </div>
    );
};

export default GamePage;