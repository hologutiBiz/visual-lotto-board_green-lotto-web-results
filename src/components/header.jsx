// src/components/Header.jsx
import { Home, Menu, X, Archive, Info, Mail, UserPlus } from 'lucide-react';
import '../styles/Header.css';


const Header = ({ onHomeClick, onAllResultsClick, mobileMenuOpen, setMobileMenuOpen, games, onGameClick }) => {
  return (
    <header className="site-header">
      <div className="header-container">
        <div className="header-content">
          <button onClick={onHomeClick} className="logo-btn">
            <h1 className="logo">Visual Lotto Board</h1>
            <p className="logo-subtitle">Green Lotto Results</p>
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
            <button onClick={onAllResultsClick} className="nav-link">
              <Archive size={18} />
              All Games
            </button>
            <a href="https://visuallottoboard.com/about" target="_blank" rel="noopener noreferrer" className="nav-link">
              <Info size={18} />
              About
            </a>
            <a href="https://visuallottoboard.com/contact" target="_blank" rel="noopener noreferrer" className="nav-link">
              <Mail size={18} />
              Contact
            </a>
            <a href="https://visuallottoboard.com/signup" target="_blank" rel="noopener noreferrer" className="nav-link nav-link-primary">
              <UserPlus size={18} />
              Sign Up
            </a>
          </nav>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-menu">
            <button onClick={onHomeClick} className="mobile-menu-item">
              <Home size={16} />
              Home
            </button>
            <button onClick={onAllResultsClick} className="mobile-menu-item">
              <Archive size={16} />
              All Results
            </button>
            <a href="https://visuallottoboard.com/about" target="_blank" rel="noopener noreferrer" className="mobile-menu-item">
              <Info size={16} />
              About
            </a>
            <a href="https://visuallottoboard.com/contact" target="_blank" rel="noopener noreferrer" className="mobile-menu-item">
              <Mail size={16} />
              Contact
            </a>
            <a href="https://visuallottoboard.com/signup" target="_blank" rel="noopener noreferrer" className="mobile-menu-item">
              <UserPlus size={16} />
              Sign Up
            </a>
            <p className="mobile-menu-title">Quick Access</p>
            {games.slice(0, 8).map(game => (
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
  );
};

export default Header;