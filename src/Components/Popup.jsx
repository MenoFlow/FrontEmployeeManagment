import React from "react";

const Popup = ({ message, show, handleClose }) => {
    if (!show) {
        return null; // Si le popup ne doit pas être affiché, ne rien retourner
    }

    return (
        <div style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1000'
        }}>
            <div style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                textAlign: 'center'
            }}>
                <h4>{message}</h4>
                <button onClick={handleClose} className="btn btn-primary mt-3">
                    Fermer
                </button>
            </div>
        </div>
    );
};

export default Popup;
