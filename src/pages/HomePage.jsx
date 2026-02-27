// src/pages/HomePage.jsx
import { useState, useEffect } from 'react';
import { Clock, Search } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import ResultCard from '../components/ResultCard';
import AdUnit from '../components/AdUnit';
import "../styles/HomePage.css";

const HomePage = ({ todayResults, games, formatDate, onDateSearch }) => {
    const [searchDate, setSearchDate] = useState('');
    const [displayResults, setDisplayResults] = useState(todayResults);
    const [isSearching, setIsSearching] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const navigate = useNavigate();

    const handleDateSearch = async () => {
        if (!searchDate) {
            alert('Please select a date');
            return;
        }

        setIsSearching(true);
        const results = await onDateSearch(searchDate);
        setDisplayResults(results);
        setCurrentDate(new Date(searchDate));
        setIsSearching(false);
    };

    const handleShowToday = () => {
        setSearchDate('');
        setDisplayResults(todayResults);
        setCurrentDate(new Date());
    };

    useEffect(() => {
        if (!searchDate) {
            setDisplayResults(todayResults);
        }
    }, [todayResults, searchDate]);

    return (
        <div className="home-page">
            <h1 className="main-title">
                Green Lotto Today Result: Daily Winning Number, Machine Number & Past Results
            </h1>
            <p className="main-subtitle">
                Real-time updates for all daily draws including Naija Vag, Dream Number, Odogwu, Wazobia, Destiny and more.
            </p>

            {/* Navigation Guide */}
            <div className="navigation-guide">
                <h2 className="guide-title">How to Check Results</h2>
                <div className="guide-steps">
                    <div className="guide-step">
                        <div className="step-number">1</div>
                        <p>View "today's results" below for daily results</p>
                    </div>
                    <div className="guide-step">
                        <div className="step-number">2</div>
                        <p>Use "Search by Date" to view results from previous days</p>
                    </div>
                    <div className="guide-step">
                        <div className="step-number">3</div>
                        <p>Click "View All Results" on any game to see complete historical data</p>
                    </div>
                </div>
            </div>

          {/* Search by Date */}
            <div className="search-section">
                <h3 className="search-title">
                  <Search size={20} />
                  Search Results by Date
                </h3>
                <p className="search-description">
                  Select a date to view that day's lottery results for all games
                </p>
                <div className="date-search-box">
                  <div className="date-input-group">
                    <label className="date-label">Select Date</label>
                    <input
                      type="date"
                      value={searchDate}
                      onChange={(e) => setSearchDate(e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      className="date-input"
                    />
                  </div>
                  <div className="search-actions">
                      <button 
                        onClick={handleDateSearch} 
                        className="search-btn"
                        disabled={isSearching}
                      >
                          <Search size={18} />
                          {isSearching ? 'Searching...' : 'Search'}
                      </button>
                      {searchDate && (
                        <button onClick={handleShowToday} className="today-btn">
                          Show Today's Results
                        </button>
                      )}
                  </div>
                </div>
            </div>

          {/* Ad Unit */}
          <AdUnit slot="9150572957" />

          {/* Results Section */}
          <div className="today-section">
            <div className="section-header">
              <h2 className="section-title">
                <Clock size={28} />
                {searchDate ? 'Results for ' + formatDate(currentDate) : "Today's Results"}
              </h2>
              <span className="section-date">{formatDate(currentDate)}</span>
            </div>

            {displayResults.length > 0 ? (
              <div className="results-grid">
                {displayResults.map((result) => {
                  const game = games.find(g => g.id === result.game_id);
                  return game ? (
                    <ResultCard 
                      key={result.id} 
                      result={result} 
                      game={game}
                      onViewAll={() => navigate(`/game/result/${game.game_name}`)}
                    />
                  ) : null;
                })}
              </div>
            ) : (
              <div className="no-results">
                <p>No results found for this date. Results may not be available yet.</p>
              </div>
            )}
          </div>

          {/* Bottom Ad */}
          <AdUnit position="Bottom Banner" />

          {/* Optional link to all results */}
          {/* <div className="all-results-link">
            <Link to="/gamelist">View All Results</Link>
          </div> */}
        </div>
    );
};

export default HomePage;
