import React, { useEffect, useState, useRef } from "react";
import MyDataTable from './MyDataTable';
import SideBar from './SideBar';

const personPension = () => {

  const [mouvement, setMouvement] = useState([]);
  const [bill, setBill] = useState([]);

  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (direction === 'next') {
      scrollContainerRef.current.scrollBy({ top: 550, behavior: 'smooth' }); // Défile vers le bas
    } else if (direction === 'prev') {
      scrollContainerRef.current.scrollBy({ top: -550, behavior: 'smooth' }); // Défile vers le haut
    }
  };
  return (
    <div className="px-5 mt-3" style={{ marginLeft:"40px" }}>
      <SideBar />
      <div className="d-flex justify-content-center">
        <h3>Ajouter un :</h3>
      </div>
      <div className="d-flex justify-content-center">
      <div style={{ display: "block" }}>
    <label htmlFor="mouvement">Mouvement</label><br />
    <input
        type="text"
        className="form-control rounded-2"
        onChange={(e) => { setMouvement({ ...mouvement, mouvement: e.target.value }) }}
        placeholder="Entrez le mouvement"
        style={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            color: "black",
            border: "1px solid #ccc", // Couleur de la bordure
            transition: "border-color 0.3s, box-shadow 0.3s", // Transition pour le focus
            padding: "0 10px", // Ajoute de l'espace à gauche et à droite
            width: "162px",
            height: "35px",

        }}
        onFocus={(e) => {
            e.target.style.borderColor = "#007bff"; // Couleur de la bordure au focus
            e.target.style.boxShadow = "0 0 5px rgba(0, 123, 255, 0.5)"; // Ajouter une ombre au focus
        }}
        onBlur={(e) => {
            e.target.style.borderColor = "#ccc"; // Réinitialiser la couleur de la bordure
            e.target.style.boxShadow = "none"; // Retirer l'ombre au blur
        }}
    />
</div>

<div className="ms-4">
    <label htmlFor="bill">Bill</label><br />
    <input
        type="text"
        className="form-control rounded-2"
        onChange={(e) => { setBill({ ...bill, bill: e.target.value }) }}
        placeholder="Entrez le bill"
        style={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            color: "black",
            border: "1px solid #ccc", // Couleur de la bordure
            transition: "border-color 0.3s, box-shadow 0.3s", // Transition pour le focus
            padding: "0 10px", // Ajoute de l'espace à gauche et à droite
            width: "162px",
            height: "35px",
        }}
        onFocus={(e) => {
            e.target.style.borderColor = "#007bff"; // Couleur de la bordure au focus
            e.target.style.boxShadow = "0 0 5px rgba(0, 123, 255, 0.5)"; // Ajouter une ombre au focus
        }}
        onBlur={(e) => {
            e.target.style.borderColor = "#ccc"; // Réinitialiser la couleur de la bordure
            e.target.style.boxShadow = "none"; // Retirer l'ombre au blur
        }}
    />
</div>


      </div>
      <MyDataTable

      mouvement={mouvement}
      bill={bill}
      noDataComponent="Pas de données à afficher"
      />
      
    </div>
  );
};

export default personPension;
