// src/components/ResultCard.jsx
import { useNavigate } from "react-router-dom";
import "../styles/ResultCard.css";
import { slugify } from "../utils/slugify";

const NumberBall = ({ number, type = "winning" }) => (
  <div className={`number-ball ${type}`}>
    {number}
  </div>
);

const DayResultCard = ({ result, game }) => {
  const navigate = useNavigate();

  return (
    <div className="result-card">
      <div className="result-card-header">
        <div>
          <h3 className="result-card-title">{game.game_name}</h3>
          <p className="result-card-meta">Draw #{result.draw_number}</p>
        </div>
        <span className="result-card-time">
          <time>CloseTime: {result.draw_time}</time>
        </span>
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

      <button
        onClick={() => navigate(`/game/result/${slugify(game.game_name)}`)}
        className="view-all-btn"
      >
        View All <b>{game.game_name}</b> Results
      </button>
    </div>
  );
};

export default DayResultCard;
