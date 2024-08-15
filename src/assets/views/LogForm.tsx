import React, { FC, useState } from 'react';
import Popup from '../components/Popup';

interface LogFormProps {
    getData: () => void
}

const LogForm: FC<LogFormProps> = ({ getData }) => {
    const [descriptionEvent, setDescriptionEvent] = useState('');
    const [idEventType, setIdEventType] = useState('2');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newLog = {
            descriptionEvent,
            idEventType: Number(idEventType),
        };

        try {
            const response = await fetch('https://localhost:7105/api/EventLog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newLog),
            });

            if (response) {
                const result = await response.json();
                await getData();
                setDescriptionEvent("");
                setIdEventType("2");
                setMessage("Se ha creado el evento" + result)
            }
        } catch (error) {
            setMessage('Error al enviar los datos:' + error);
        }
    };

    return (
        <div className="log-form-container">
            <Popup message={message} isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
            <h2>Crear Evento</h2>
            <form onSubmit={handleSubmit} className="log-form">
                <div className="form-group">
                    <label>Descripción:</label>
                    <textarea
                        value={descriptionEvent}
                        onChange={(e) => setDescriptionEvent(e.target.value)}
                        required
                        placeholder="Describa el evento"
                    />
                </div>
                <div className="form-group">
                    <label>Tipo de Evento:</label>
                    <select
                        value={idEventType}
                        onChange={(e) => setIdEventType(e.target.value)}
                        required
                    >
                        <option value="">Seleccionar...</option>
                        <option value="1">API</option>
                        <option value="2">Manual</option>
                    </select>
                </div>
                <button type="submit" className="submit-button">Crear</button>
            </form>
        </div>
    );
}

export default LogForm;
