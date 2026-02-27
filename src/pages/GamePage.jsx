// src/pages/GamePage.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Home } from "lucide-react";
import GameTable from "../components/GameTable";
import AdUnit from "../components/AdUnit";
import { getGames } from "../utils/supabase";
import "../styles/GamePage.css";

const GamePage = ({ formatDate }) => {
    const { game_name } = useParams(); // get game id from URL
    const [game, setGame] = useState(null);
    const [gameResults, setGameResults] = useState([]);
    const [gameLoading, setGameLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGameResults = async () => {
            if (!game_name) return;

            try {
                setGameLoading(true);
                setError(null);
                setGameResults([]);

                // Get game info from Supabase
                const gamesData = await getGames();
                const selectedGame = gamesData.find(g => String(g.game_name).toLowerCase().replace(/\s+/g, "-") === game_name);
                setGame(selectedGame);

                if (!selectedGame) { 
                    setError("Game not found."); 
                    setGameLoading(false); 
                    return;
                }

                // Fetch results from API
                const apiUrl = import.meta.env.VITE_RESULT_API_URL;
                const year = new Date().getFullYear();

                const response = await fetch(`${apiUrl}?gameId=${selectedGame.id}&year=${year}`);
                const text = await response.text();

                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                let json;
                try {
                    json = JSON.parse(text);
                } catch (err) {
                    setError("Invalid API response");
                    setGameLoading(false);
                    return;
                }

                if (json.success && json.data) {
                    const transformedResults = json.data.results.map(result => ({
                        id: result.drawNumber,
                        draw_date: result.date,
                        draw_time: result.time,
                        winning_numbers: result.winning,
                        machine_numbers: result.machine
                    }));
                    setGameResults(transformedResults);
                } else {
                    setError(json.message || "No past results available for this game.");
                }

                setGameLoading(false);
            } catch (err) {
                console.error("Error fetching game results:", err);
                setError("Failed to load game results.");
                setGameResults([]);
                setGameLoading(false);
            }
        };

        fetchGameResults();
    }, [game_name]);

    return (
        <div className="page-content">
            <div className="game-header">
                <Link to="/" className="back-btn">
                <Home size={24} />
                </Link>
                <div>
                    <h1 className="game-title">{game ? game.game_name : "Game Results"}</h1>
                    <p className="game-subtitle">Complete results</p>
                </div>
            </div>

            {/* Top Ad */}
            {/* <AdUnit slot="9150572957" /> */}

            <GameTable
                results={gameResults}
                formatDate={formatDate}
                loading={gameLoading}
                error={error}
                gameName={game?.game_name}
            />

            {/* Bottom Ad */}
            <AdUnit slot="9952179429" />
        </div>
    );
};

export default GamePage;
