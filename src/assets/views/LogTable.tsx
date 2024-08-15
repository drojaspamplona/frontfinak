import { Log } from '../../models/Log';

interface LogTableProps {
    logs: Log[];
    eventType: string;
    startDate: string;
    endDate: string;
    setEventType: (value: string) => void;
    setStartDate: (value: string) => void;
    setEndDate: (value: string) => void;
    handleFilter: () => void;
    message: string;
}

function LogTable({
    logs,
    eventType,
    startDate,
    endDate,
    setEventType,
    setStartDate,
    setEndDate,
    handleFilter,
    message,
}: LogTableProps) {
    return (
        <div className="log-table-container">
            <h2>Lista de Eventos
            </h2>
            <div className="filter-form">
                <label>
                    Tipo de evento:
                    <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
                        <option value="">Todos</option>
                        <option value="Api">API</option>
                        <option value="Manual">Manual</option>
                    </select>
                </label>
                <label>
                    Fecha inicial:
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </label>
                <label>
                    Fecha final:
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </label>
                <button onClick={handleFilter}>Filtrar</button>
            </div>
            {logs.length > 0 ? (
                <table className="log-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log) => (
                            <tr key={log.idEventLog}>
                                <td>{log.idEventLog}</td>
                                <td>{new Date(log.eventDate).toLocaleDateString()}</td>
                                <td>{log.descriptionEvent}</td>
                                <td>{log.idEventType === 1 ? 'API' : 'Manual'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No logs available</p>
            )}
            {message && <p className="error-message">{message}</p>}
        </div>
    );
}

export default LogTable;
