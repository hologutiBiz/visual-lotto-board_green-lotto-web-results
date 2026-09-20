import "../styles/GameTable.css"

const GameTable = ({ results, formatDate, loading, error, gameName }) => {
    // Normalize data structure - handle both Supabase format and API format
    const normalizeResult = (result) => {
        // If it's from Supabase (real-time results)
        if (result.draw_date && result.winning_numbers) {
            return {
                id: result.id,
                date: result.draw_date,
                serialNumber: result.serialNumber ?? result.id,
                winning: Array.isArray(result.winning_numbers)
                    ? result.winning_numbers.map(num => (typeof num === 'object' ? num.number : num))
                    : result.winning_numbers,
                machine: Array.isArray(result.machine_numbers)
                    ? result.machine_numbers.map(num => (typeof num === 'object' ? num.number : num))
                    : result.machine_numbers
            };
        }
        
        // If it's from API (historical results from JSON)
        if (result.date && result.winning) {
            return {
                id: result.drawNumber || result.date,
                date: result.date,
                serialNumber: result.serialNumber ?? result.drawNumber ?? result.date,
                winning: Array.isArray(result.winning)
                    ? result.winning.map(num => (typeof num === 'object' ? num.number : num))
                    : result.winning,
                machine: Array.isArray(result.machine)
                    ? result.machine.map(num => (typeof num === 'object' ? num.number : num))
                    : result.machine
            };
        }
        
        // Fallback - return as is
        return result;
    };


    return (
        <div className="table-container">
            {loading && <p className="loading">Loading {gameName} results...</p>}
            {!loading && error && <p className="error">{error}</p>}
            {!loading && !error && results.length === 0 && (
                <p className="no-results">No past results available for this game.</p>
            )} 
            {!loading && !error && results.length > 0 && (
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
                        {results.map((result) => {
                            const normalized = normalizeResult(result);
                            
                            return (
                                <tr key={normalized.id}>
                                    <td className="sn-ref-cell">{normalized.serialNumber}</td>
                                    <td className="date-cell">{formatDate(normalized.date)}</td>
                                    <td className="winning">
                                        <div className="table-numbers">
                                            {normalized.winning.map((num, idx) => (
                                                <span key={idx} className="table-ball">
                                                    {String(num).padStart(2, '0')}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="machine">
                                        <div className="table-numbers">
                                            {normalized.machine.map((num, idx) => (
                                                <span key={idx} className="table-ball">
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