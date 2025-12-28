import { useState, useEffect } from 'react';
import { Clock, Search, Info, Mail, UserPlus } from 'lucide-react';
import ResultCard from '../components/ResultCard';
import AdUnit from '../components/AdUnit';
import "../styles/HomePage.css"




const HomePage = ({ todayResults, games, formatDate, onGameClick, onDateSearch }) => {
  const [searchDate, setSearchDate] = useState('');
  const [displayResults, setDisplayResults] = useState(todayResults);
  const [isSearching, setIsSearching] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDateSearch = async () => {
    if (!searchDate) {
      alert('Please select a date');
      return;
    }

    setIsSearching(true);
    // Call the parent function to fetch results for the selected date
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

  // Update display when todayResults changes
  useEffect(() => {
    if (!searchDate) {
      setDisplayResults(todayResults);
    }
  }, [todayResults, searchDate]);

  return (
    <div className="home-page">
      {/* Navigation Guide */}
      <div className="navigation-guide">
        <h2 className="guide-title">How to Check Results</h2>
        <div className="guide-steps">
          <div className="guide-step">
            <div className="step-number">1</div>
            <p>View today's results below for all 16 Green Lotto games</p>
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

      <AdUnit position="Top Banner" />

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
                  onViewAll={() => onGameClick(game)}
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

      <AdUnit position="Bottom Banner" />
    </div>
  );
};

export default HomePage;