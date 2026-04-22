// src/pages/AllGamesListPage.jsx
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
// import AdUnit from '../components/AdUnit';
import AdCodeGlTop from '../components/google-ad-manager/adsterra/AdCodeGlTop';
import SEO from '../components/SEO';
import { slugify } from '../utils/slugify';
import '../styles/AllResultsPage.css';

const AllGamesListPage = ({ games }) => {
    return (
        <div className="all-results-page">
            <SEO
                title="All Green Lotto Games — View Results by Game"
                description="Browse all 16 Green Lotto games and view complete draw history including winning numbers and machine numbers."
                url="/gamelist"
            />

            <div className="page-header">
                <TrendingUp size={32} className="header-icon" />
                <div>
                    <h1 className="page-title">All Game Lists</h1>
                    <p className="page-subtitle">
                        Browse all available Green Lotto games
                    </p>
                </div>
            </div>

            {/* Ad Unit: GreenLotto_Home_Top */}
            {/* <AdUnit slot="9150572957" /> */}
            <AdCodeGlTop/>

            <div className="games-list">
                {games.map((game, index) => (
                    <div key={game.id} style={{ display: "contents" }}>
                        <Link
                            to={`/game/result/${slugify(game.game_name)}`}
                            className="game-list-item"
                        >
                            <div className="game-info">
                                <h3 className="game-name">{game.game_name}</h3>
                                <p className="game-description">
                                    View complete past and latest results from the year <time>{new Date().getFullYear()}</time>
                                </p>
                            </div>
                            <ArrowRight size={20} className="arrow-icon" />
                        </Link>

                        {/* Mid-list Ad injection */}
                        {index === 7 && (
                            <div className='mid-list-ad' style={{ width: '100%', gridColumn: '1 / -1' }}>
                                {/* <AdUnit slot="7215508900" /> */}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Ad Unit: GreenLotto_Bottom_Page */}
            {/* <AdUnit slot="9952179429" /> */}

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

export default AllGamesListPage;