import { Clock } from 'lucide-react';
import ResultCard from '../components/ResultCard';
import AdUnit from '../components/AdUnit';
import "../styles/HomePage.css"

const HomePage = ({ todayResults, games, formatDate, onGameClick }) => {
    return (
        <div className="page-content">
            <div className="navigation-guide">
                <h2 className="guide-title">How to Check Results</h2>

                <div className="guide-steps">
                    <div className="guide-step">
                        <div className="step-number">1</div>
                        <p>Browse today's results below for all 16 Green Lotto games</p>
                    </div>
                    <div className="guide-step">
                        <div className="step-number">2</div>
                        <p>Click "View All Results" on any game to see complete historical data</p>
                    </div>
                    <div className="guide-step">
                        <div className="step-number">3</div>
                        <p>Use the game menu to navigate between different lotto games</p>
                    </div>
                </div>
            </div>

            <AdUnit position="Top Banner" />

            <div className="today-section">
                <div className="section-header">
                    <h2 className="section-title">
                        <Clock size={28} />
                        Today's Results
                    </h2>
                    <span className="section-date">{formatDate(new Date())}</span>
                </div>

                <div className="results-grid">
                    {todayResults.map((result) => {
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
            </div>

            <AdUnit position="Bottom Banner" />
        </div>
    );
};

export default HomePage;
