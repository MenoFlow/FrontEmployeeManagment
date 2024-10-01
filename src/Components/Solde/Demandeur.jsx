import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyDataTable from './MyDataTable';
import SideBar from './SideBar';

const Demandeur = () => {

  const [mouvement, setMouvement] = useState([]);
  const [chapitre, setChapitre] = useState([]);


  return (
    <div className="px-5 mt-3">
    <SideBar/>
      <div className="d-flex justify-content-center">
        <h3>Ajouter un :</h3>
      </div>
      <div className="d-flex justify-content-center">
        <div style={{display: "block"}}>
          <label htmlFor="mouvement">Mouvement</label><br/>
          <input
            type="text"
            className="styled-input"
            onChange={(e) => { setMouvement({ ...mouvement, mouvement: e.target.value }) }}
            placeholder="Entrez le mouvement"
            style={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid #ccc", // Couleur de la bordure
                borderRadius: "6px",
                marginRight: "10px",
                width: "162px",
                height: "35px",
                padding: "0 10px", // Ajoute de l'espace à gauche et à droite
                fontSize: "14px", // Taille de la police
                transition: "border-color 0.3s, box-shadow 0.3s", // Transition pour les effets au focus
            }}
            onFocus={(e) => {
                e.target.style.borderColor = "#007bff"; // Changer la couleur de la bordure au focus
                e.target.style.boxShadow = "0 0 5px rgba(0, 123, 255, 0.5)"; // Ajouter une ombre au focus
            }}
            onBlur={(e) => {
                e.target.style.borderColor = "#ccc"; // Réinitialiser la couleur de la bordure
                e.target.style.boxShadow = "none"; // Retirer l'ombre au blur
            }}
          />


        </div>
        <div>
          <label htmlFor="mouvement">Chapitre</label><br/>
          <input
            type="text"
            className="styled-input"
            onChange={(e) => { setChapitre({ ...chapitre, chapitre: e.target.value }) }}
            placeholder="Entrez le chapitre"
            style={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid #ccc", // Couleur de la bordure
                borderRadius: "6px",
                marginRight: "10px",
                width: "162px",
                height: "35px",
                padding: "0 10px", // Ajoute de l'espace à gauche et à droite
                fontSize: "14px", // Taille de la police
                transition: "border-color 0.3s, box-shadow 0.3s", // Transition pour les effets au focus
            }}
            onFocus={(e) => {
                e.target.style.borderColor = "#007bff"; // Changer la couleur de la bordure au focus
                e.target.style.boxShadow = "0 0 5px rgba(0, 123, 255, 0.5)"; // Ajouter une ombre au focus
            }}
            onBlur={(e) => {
                e.target.style.borderColor = "#ccc"; // Réinitialiser la couleur de la bordure
                e.target.style.boxShadow = "none"; // Retirer l'ombre au blur
            }}
          />

        </div>

      </div>
      <MyDataTable mouvement={mouvement} chapitre={chapitre} noDataComponent="Pas de données à afficher" />

    </div>
  );
};

export default Demandeur;
