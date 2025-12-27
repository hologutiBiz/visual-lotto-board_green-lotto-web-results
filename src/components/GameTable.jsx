const GameTable = ({ results, formatDate }) => {
    return (
        <div className="table-container">
            <table className="game-table">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Draw #</th>
                        <th>Machine</th>
                        <th>Winning Numbers</th>
                        <th>Machine Numbers</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result, index) => (
                        <tr key={result.id}>
                            <td>{index + 1}</td>
                            <td>{formatDate(result.draw_date)}</td>
                            <td>{result.draw_time}</td>
                            <td className="draw-number">{result.draw_number}</td>
                            <td>{result.machine}</td>
                            <td>
                                <div className="table-numbers">
                                    {result.winning_numbers.map((num, idx) => (
                                        <span key={idx} className="table-ball winning">
                                            {num}
                                        </span>
                                    ))}
                                </div>
                            </td>
                            <td>
                                <div className="table-numbers">
                                    {result.machine_numbers.map((num, idx) => (
                                        <span key={idx} className="table-ball machine">
                                            {num}
                                        </span>
                                    ))}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GameTable;