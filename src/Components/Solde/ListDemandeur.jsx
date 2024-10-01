import DataTable from 'react-data-table-component';
import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../App.css'; // Assurez-vous d'ajouter des styles pour le scroll vertical
import { length } from '../../../node_modules/stylis/src/Tokenizer';
import PdfGenerator from './PdfGenerator';
import SideBar from './SideBar';

const Popup = (props) => {
  return (
    <div className="" style={{ position: "fixed", top: "20px", right: "20px", zIndex: "1", animation: "slideIn 0.5s ease-out" }}>
      <div className="" style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", textAlign: "center" }}>
        <h3>{props.message}</h3>
        <i className={`fas ${props.success ? 'fa-check-circle' : 'fa-times-circle'}`} style={{ fontSize: "60px", color: props.success ? "green" : "red" }}></i>
      </div>
    </div>
  );
};

const ListDemandeur = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [tabState, setTabState] = useState([]);

  const togglePopup = (message, success) => {
    setPopupMessage(message);
    setIsSuccess(success);
    setIsPopupOpen(true);

    setTimeout(() => {
      setIsPopupOpen(false);
    }, 1000);
  };

  const columns = [
    {
      name: 'Selection',
      width: '100px',
      cell: (row) => (
        <div className='d-flex content-center'>
          <input
            type='checkbox'
            onChange={(e) => { handleCheckboxChange(e, row); }}
            style={{ textAlign: "center" }}
          />
        </div>
      ),
    },
    { name: 'Imatricule', selector: row => row.im, sortable: true },
    { name: 'Nom', selector: row => row.nom, sortable: true },
    { name: 'Prenoms', selector: row => row.prenom, sortable: true },
    { name: 'Mouvements', selector: row => row.mouvement, sortable: true },
    { name: 'Chapitre', selector: row => row.chapitre, sortable: true },
    { name: 'Nombre d\'acte', selector: row => row.nb_acte, sortable: true },
  ];

  const handleCheckboxChange = (e, row) => {
    if (e.target.checked) {
      ajouter(row); // Si la checkbox est cochée, ajouter l'élément
    } else {
      retirer(row); // Si la checkbox est décochée, retirer l'élément
    }
  };

  const ajouter = (row) => {
    const isInTab = tabState.some((t) => t.cle.im === row.im);
    if (!isInTab) {
      const obj = {
        cle: {
          im: row.im,
          nom: row.nom,
          prenoms: row.prenom,
          mouvement: row.mouvement,
          chapitre: row.chapitre,
          nb_acte: row.nb_acte,
        },
      };
      setTabState([...tabState, obj]); // Ajouter l'élément à tabState
      togglePopup("Ajouté avec succès", true);
    } else {
      console.log('Déjà dans le tableau');
    }
  };

  const retirer = (row) => {
    const updatedTab = tabState.filter((t) => t.cle.im !== row.im);
    setTabState(updatedTab); // Mettre à jour tabState en retirant l'élément
    togglePopup("Retiré avec succès", false);
  };

  const scrollContainerRef = useRef(null);
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/list_person_solde")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert("Erreur : " + result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <SideBar />
      <div className="table-container" ref={scrollContainerRef} style={{ marginLeft: "0px" }}>
        <h2 className='mt-3' style={{ textAlign: "center" }}>
          Liste des demandeurs
        </h2>
        <DataTable
          columns={columns}
          data={employee}
          noDataComponent="Pas de données à afficher"
        />
      </div>
      {isPopupOpen && <Popup message={popupMessage} success={isSuccess} />}
      <div className="d-flex scroll-buttons">
        <PdfGenerator employeeP={tabState} />
        <button className='btn btn-primary mt-4' onClick={() => { window.location.reload() }} style={{ height: "40px" }}>Tout effacer</button>
      </div>
    </div>
  );
};

export default ListDemandeur;
