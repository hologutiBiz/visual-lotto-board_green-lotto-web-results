// src/pages/AllResultsPage.jsx
import { ArrowRight, TrendingUp } from 'lucide-react';
import AdUnit from '../components/AdUnit';
import '../styles/AllResultsPage.css';

const AllResultsPage = ({ games, onGameClick }) => {
  return (
    <div className="all-results-page">
      <div className="page-header">
        <TrendingUp size={32} className="header-icon" />
        <div>
          <h1 className="page-title">All Game Results</h1>
          <p className="page-subtitle">
            Browse historical results for all 16 Green Lotto games
          </p>
        </div>
      </div>

      {/* Ad Unit: GreenLotto_Home_Top */}
      <AdUnit slot={9150572957} />

      <div className="games-list">
        {games.map((game, index) => (
          <div key={game.id} style={{ display: "contents" }}>
            <button
              key={game.id}
              onClick={() => onGameClick(game)}
              className="game-list-item"
            >
              <div className="game-info">
                <h3 className="game-name">{game.game_name}</h3>
                <p className="game-description">View complete past and lastest results from the year <time>2026</time></p>
              </div>
              <ArrowRight size={20} className="arrow-icon" />
            </button>

            {/* <Ad Unit GreenLotto_Middle_Page Injection/> */}
            {index === 7 && (
              <div className='mid-list-ad' style={{ width: '100%', gridColumn: '1 / -1'}}>
                <AdUnit slot="7215508900" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Ad Unit: GreenLotto_Bottom_Page */}
      <AdUnit slot="9952179429" />

      <div className="info-box">
        <h3>About Historical Results</h3>
        <p>
          Click on any game above to view its complete draw history. Results include 
          draw numbers, dates, times, winning numbers, and machine numbers for every draw.
        </p>
      </div>
    </div>
  );
};

export default AllResultsPage;