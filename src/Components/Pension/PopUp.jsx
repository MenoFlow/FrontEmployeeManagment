const Popup = ({ closePopup }) => {
    return (
      <div className="popup-overlay">
        <div className="popup-content">
          <h2>Pop-up</h2>
          <p>Mercii tyyy</p>
          <button className='btn btn-secondary' onClick={closePopup}>Fermer</button>
        </div>
      </div>
    );
  };