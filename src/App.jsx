// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
//import AllResultsPage from './pages/AllGamesListPage';
import AllGamesListPage from './pages/AllGamesListPage';
import { getGames, getTodayResults, getResultsByDate } from './utils/supabase';
import './App.css';

const App = () => {
    const [games, setGames] = useState([]);
    const [todayResults, setTodayResults] = useState([]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const formatDate = (date) => {
        const d = new Date(date);
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        const day = d.getDate();
        const suffix = day === 1 || day === 21 || day === 31 ? 'st' :
                    day === 2 || day === 22 ? 'nd' :
                    day === 3 || day === 23 ? 'rd' : 'th';
        return `${months[d.getMonth()]} ${days[d.getDay()]} ${day}${suffix}, ${d.getFullYear()}`;
    };

    useEffect(() => {
        const fetchInitialData = async () => {
        try {
            setLoading(true);
            setError(null);

            const gamesData = await getGames();
            setGames(gamesData);

            const todayData = await getTodayResults();
            setTodayResults(todayData);
            
            setLoading(false);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Failed to load data. Please check your internet connection.');
            setLoading(false);
        }
        };
        fetchInitialData();
    }, []);

    if (loading && games.length === 0) {
        return (
            <div className="app">
                <div className="loading-screen">
                    <div className="loading-spinner"></div>
                    <p>Loading Green Lotto results...</p>
                </div>
            </div>
        );
    }

    if (error && games.length === 0) {
        return  (
            <div className="app">
                <div className="error-screen">
                    <h2>Oops! Something went wrong</h2>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()} className="retry-btn">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <Router>
            <div className="app">
                <Header 
                    games={games} 
                    setMobileMenuOpen={setMobileMenuOpen}
                    mobileMenuOpen={mobileMenuOpen}
                />
                <div className="main-container">
                    <Sidebar games={games} />
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={
                                <HomePage
                                    todayResults={todayResults}
                                    games={games}
                                    formatDate={formatDate}
                                    onDateSearch={getResultsByDate}
                                />
                            } />
                    <Route path="/game/result/:game_name" element={
                        <GamePage formatDate={formatDate} />
                    } />
                    <Route path="/gamelist" element={
                        <AllGamesListPage games={games} />
                    } />
                    </Routes>
                </main>
                </div>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
