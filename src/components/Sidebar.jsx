import {  TrendingUp } from "lucide-react";
import "../styles/Sidebar.css";

const Sidebar = ({ games, selectedGame, onGameClick }) => {
    return ( 
        <aside className="sidebar">
            <div className="sidebar-content">
                <h3 className="sidebar-tittle">
                    <TrendingUp size={20} />
                </h3>
                <nav className="sidebar-nav">
                    {games.map(game => (
                        <button
                            key={game.id}
                            onClick={() => onGameClick(game)}
                            className={`sidebar-link ${selectedGame?.id === game.id ? 'active' : ''}`}
                        >
                            {game.game_name}
                        </button>
                    ))}
                </nav>
            </div>
        </aside>
     );
}
 
export default Sidebar;