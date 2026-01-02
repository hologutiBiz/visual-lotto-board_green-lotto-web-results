import "../styles/GameTable.css"

const GameTable = ({ results, formatDate }) => {
    // Normalize data structure - handle both Supabase format and API format
    const normalizeResult = (result) => {
        // If it's from Supabase (real-time results)
        if (result.draw_date && result.winning_numbers) {
            return {
                id: result.id,
                date: result.draw_date,
                winning: result.winning_numbers,
                machine: result.machine_numbers
            };
        }
        
        // If it's from API (historical results from JSON)
        if (result.date && result.winning) {
            return {
                id: result.drawNumber || result.date, // Use drawNumber or date as fallback
                date: result.date,
                winning: result.winning,
                machine: result.machine
            };
        }
        
        // Fallback - return as is
        return result;
    };

    return (
        <div className="table-container">
            {results.length === 0 ? (
                <p className="no-results">No past results available for this game.</p>
            ) : (
                <table className="game-table">
                    <thead>
                        <tr>
                            <th>SN</th>
                            <th>Date</th>
                            <th>Winning</th>
                            <th>Machine</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => {
                            const normalized = normalizeResult(result);
                            
                            return (
                                <tr key={normalized.id}>
                                    <td>ref_{String(index + 1).padStart(2, '0')}</td>
                                    <td>{formatDate(normalized.date)}</td>
                                    <td>
                                        <div className="table-numbers">
                                            {normalized.winning.map((num, idx) => (
                                                <span key={idx} className="table-ball winning">
                                                    {String(num).padStart(2, '0')}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="table-numbers">
                                            {normalized.machine.map((num, idx) => (
                                                <span key={idx} className="table-ball machine">
                                                    {String(num).padStart(2, '0')}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default GameTable;