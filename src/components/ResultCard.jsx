import "../styles/ResultCard.css";

const NumberBall = ({ number, type = 'winning' }) => (
    <div className={`number-ball ${type}`}>
        {number}
    </div>
);

const ResultCard = ({ result, game, onViewAll }) => {
    return (
        <div className="result-card">
            <div className="result-card-header">
                <div>
                    <h3 className="result-card-title">{game.game_name}</h3>
                    <p className="result-card-meta">
                        Draw #{result.draw_number}
                    </p>
                </div>
                <span className="result-card-time"><time>DrawTime: {result.draw_time}</time></span>
            </div>
        
            <div className="result-card-body">
                <div className="number-section">
                    <p className="number-label">Winning Numbers</p>
                    <div className="number-balls">
                        {result.winning_numbers.map((num, idx) => (
                            <NumberBall key={idx} number={num} type="winning" />
                        ))}
                    </div>
                </div>
                
                <div className="number-section">
                    <p className="number-label">Machine Numbers</p>
                    <div className="number-balls">
                        {result.machine_numbers.map((num, idx) => (
                            <NumberBall key={idx} number={num} type="machine" />
                        ))}
                    </div>
                </div>
            </div>
        
            <button onClick={onViewAll} className="view-all-btn">
                View All <b>{game.game_name}</b> Results
            </button>
        </div>
    );
};

export default ResultCard;

