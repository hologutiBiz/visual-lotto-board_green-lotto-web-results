// src/components/Sidebar.jsx
import { TrendingUp } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = ({ games }) => {
  const location = useLocation();

  return ( 
    <aside className="sidebar">
      <div className="sidebar-content">
        <h3 className="sidebar-title">
          <TrendingUp size={20} />
        </h3>
        <nav className="sidebar-nav">
          {games.map(game => {
            const isActive = location.pathname === `/game/result/${game.game_name}`;
            return (
              <Link
                key={game.id}
                to={`/game/result/${game.game_name}`}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
              >
                {game.game_name}
              </Link>
            );
          })}
        </nav>
        <div className="sidebar-footer">
          <Link 
            to="/gamelist" 
            className={`sidebar-link ${location.pathname === '/gamelist' ? 'active' : ''}`}
          >
            View All Results
          </Link>
        </div>
      </div>
    </aside>
  );
};
 
export default Sidebar;
