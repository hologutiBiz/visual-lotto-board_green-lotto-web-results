// src/components/Header.jsx
import { Home, Menu, X, Archive, Info, Mail, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { slugify } from '../utils/slugify';
import '../styles/Header.css';

const Header = ({ mobileMenuOpen, setMobileMenuOpen, games }) => {
    return ( 
        <header className="site-header">
            <div className="header-container">
                <div className="header-content">
                    <div className='brand-wrapper'>
                      <a href="/">
                          <div className='bn-wrapper' style={{ display: "flex", alignItems: 'center' }}>
                                <img 
                                    className='logo' 
                                    src="https://res.cloudinary.com/ddatfadov/image/upload/v1749649983/VLB_logo_gpiyzr.png" 
                                    alt="logo" 
                                    width={35}
                                  />
                                <span className="brand-name">Visual Lotto Board</span>
                          </div>
                          <h1 className="brand-subtitle">Green Lotto Results</h1>
                      </a>
                        {/* <Link 
                            to="/" 
                            className="brand-btn"
                            onClick={() => window.location.reload()}
                            aria-label='Refresh Green Lotto Results'
                        >
                            
                        </Link> */}
                    </div>
                  
                    <nav className="desktop-nav">
                        <Link to="/" className="nav-link">
                            <Home size={18} />
                            Home
                        </Link>
                        <Link to="/gamelist" className="nav-link">
                            <Archive size={18} />
                            All Games
                        </Link>
                        <a 
                          href="https://visuallottoboard.com/about" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="nav-link"
                        >
                          <Info size={18} />
                          About
                        </a>
                        <a 
                          href="https://visuallottoboard.com/contact" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="nav-link"
                        >
                          <Mail size={18} />
                          Contact
                        </a>
                        <a 
                          href="https://visuallottoboard.com/signup" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="nav-link nav-link-primary"
                        >
                          <UserPlus size={18} />
                          Sign Up
                        </a>
                    </nav>

                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="mobile-menu-btn"
                  >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>

                {mobileMenuOpen && (
                  <div className="mobile-menu">
                    <Link 
                        to="/" 
                        className="mobile-menu-item"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <Home size={16} />
                        Home
                    </Link>
                    <Link 
                        to="/gamelist" 
                        className="mobile-menu-item"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                      <Archive size={16} />
                      All Games
                    </Link>
                    <a 
                      href="https://visuallottoboard.com/about" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="mobile-menu-item"
                    >
                      <Info size={16} />
                      About
                    </a>
                    <a 
                      href="https://visuallottoboard.com/contact" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="mobile-menu-item"
                    >
                      <Mail size={16} />
                      Contact
                    </a>
                    <a 
                      href="https://visuallottoboard.com/signup" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="mobile-menu-item"
                    >
                      <UserPlus size={16} />
                      Sign Up
                    </a>

                    <p className="mobile-menu-title">Quick Access</p>
                    {games.slice(0, 8).map(game => (
                        <Link 
                            key={game.id} 
                            to={`/game/result/${slugify(game.game_name)}`} 
                            className="mobile-menu-item game-name-item"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {game.game_name}
                        </Link>
                    ))}
                  </div>
                )}
            </div>
        </header>
    );
};
 
export default Header;
