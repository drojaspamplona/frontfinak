import { useState, useEffect } from 'react';
import './App.css';
import LogForm from './assets/views/LogForm';
import LogTable from './assets/views/LogTable';
import { Log } from './models/Log';


function App() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<Log[]>([]);
  const [eventType, setEventType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');

  async function getData() {
    try {
      const result = await fetch('https://localhost:7105/api/EventLog');
      const data = await result.json();
      setLogs(data);
      setFilteredLogs(data);
    } catch (error) {
      setMessage('Error obteniendo los datos');
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleFilter = () => {
    let filtered = logs;

    if (eventType) {
      filtered = filtered.filter((log: Log) => {
        if (eventType === 'Api') return log.idEventType === 1;
        if (eventType === 'Manual') return log.idEventType === 2;
        return true;
      });
    }

    if (startDate) {
      filtered = filtered.filter(log => new Date(log.eventDate) >= new Date(startDate));
    }

    if (endDate) {
      filtered = filtered.filter(log => new Date(log.eventDate) <= new Date(endDate));
    }

    setFilteredLogs(filtered);
  };

  return (
    <div className="app-container">
      <LogForm getData={getData} />
      <LogTable
        logs={filteredLogs}
        eventType={eventType}
        startDate={startDate}
        endDate={endDate}
        setEventType={setEventType}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        handleFilter={handleFilter}
        message={message}
      />
    </div>
  );
}

export default App;
