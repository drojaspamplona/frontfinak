import { FC } from 'react';
import '../components/Popup.css';

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    message: string
}

const Popup: FC<PopupProps> = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <div className="popup">
            <div className="popup-content">
                <span className="close" onClick={onClose}>&times;</span>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Popup;
