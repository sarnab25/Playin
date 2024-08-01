import React from 'react';
import './Popup.css';

const Popup = ({location, temperature, onClose}) => {
 

  return (
    <div className="modal-overlay">
      <div className="modal-content">
       <div> Country : {location.country}</div>
       <div> State : {location.region}</div>
       <div> City : {location.city}</div>
       <div>Temperature: {(temperature.main.temp-273.15).toFixed(2)}° C</div>
        <button className="modal-close" onClick={onClose}>&times;</button>
    
      </div>
    </div>
  );
};

export default Popup;
