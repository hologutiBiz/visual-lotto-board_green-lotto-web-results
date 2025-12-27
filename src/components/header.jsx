import { Home, Menu, X } from "lucide-react";
import "../styles/Header.css";

const Header = ({ onHomeClick, mobileMenuOpen, setMobileMenuOpen, games, onGameClick }) => {
    return (
        <header className="site-Header">
            <div className="container">
                <div className="header-content">
                    <button onClick={onHomeClick} className="brand-btn">
                        <h1 className="brand">Visual Lotto Board</h1>
                    </button>

                    <button 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="mobile-menu-btn"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <nav className="desktop-nav">
                        <button onClick={onHomeClick} className="nav-link">
                            <Home size={18} />
                            Home
                        </button>
                    </nav>
                </div>

                {mobileMenuOpen && (
                    <div className="mobile-menu">
                        <button onClick={onHomeClick} className="mobile-menu-item">
                            Home
                        </button>
                        <p className="mobile-menu-title">All Games</p>
                        {games.map(game => (
                            <button
                                key={game.id}
                                onClick={() => onGameClick(game)}
                                className="mobile-menu-item"
                            >
                                {game.game_name}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header;