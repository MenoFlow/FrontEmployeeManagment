import DataTable from 'react-data-table-component';
import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../App.css'; // Assurez-vous d'ajouter des styles pour le scroll vertical
import { length } from '../../../node_modules/stylis/src/Tokenizer';
import PdfGenerator from './PdfGenerator';
  
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


const MyDataTable = (props) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const columns = [
    { name: 'Imatricule', selector: row => row.im, sortable: true },
    { name: 'Nom', selector: row => row.nom, sortable: true },
    { name: 'Prenoms', selector: row => row.prenom, sortable: true },
    { name: 'Mouvements', selector: row => row.mouvement, sortable: true },
    { name: 'Nombre_acte', selector: row => row.nb_acte, sortable: true },
    { name: 'Chapitre', selector: row => row.chapitre, sortable: true },
    { name: 'Actions',
      width: '250px',
        cell: (row) => (
          <div className='d-flex content-center'>
            <button className='btn btn-outline-primary me-2' onClick={()=>{addMouvement(row.im)}} style={{minWidth: "111px", textAlign:"center"}}>
              mvt
            </button>
            {isPopupOpen && <Popup closePopup={togglePopup} />}
            <button className='btn btn-outline-primary'  onClick={()=>{addChapitre(row.im)}} style={{minWidth: "111px"}}>
              chapitre
            </button>
          </div>

        ),
  
      ignorerowClick: true,
      allowoverflow: true,
      // button: true
     },
  ];

  const scrollContainerRef = useRef(null);

  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/list_person_solde")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          // alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {



  const addChapitre = (im) => {

    const number = props.chapitre;

    // const im = employee[0];
    // im = im

    axios
      .put("http://localhost:3000/auth/add_chapitre", {number, im})
      .then((result) => {
        if (result.data.Status) {
          // setEmployee(result.data.Result);
          console.log("axios backend OK chapitre")
        } else {
          console.log(result.data)
          // alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }
  const addMouvement = (im) => {
    const number = props.mouvement;
    const mouvToCount = number.mouvement;

    const countSlash = (mouvToCount) => {
      return mouvToCount.split('/').length;
    }
    const nb_acte = countSlash(mouvToCount)

    axios
      .put("http://localhost:3000/auth/add_mouvement", {number, nb_acte, im})
      .then((result) => {
        if (result.data.Status) {
          // setEmployee(result.data.Result);
          console.log("axios backend OK Mouvement")
        } else {
          console.log(result.data)
          // alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }

  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/auth/delete_employee/'+id)
    .then(result => {
        if(result.data.Status) {
            window.location.reload()
        } else {
            alert(result.data.Error)
        }
    })
  } 


  const scroll = (direction) => {
    if (direction === 'next') {
      scrollContainerRef.current.scrollBy({ top: 550, behavior: 'smooth' }); // Défile vers le bas
    } else if (direction === 'prev') {
      scrollContainerRef.current.scrollBy({ top: -550, behavior: 'smooth' }); // Défile vers le haut
    }
  };
  return (
    <div style={{  }}>
      {/* <h1>Tableau avec défilement vertical</h1> */}

      <div className="table-container" ref={scrollContainerRef}>
        <DataTable
          columns={columns}
          data={employee}
          noDataComponent="Pas de données à afficher"
        />
      </div>
      <div className="d-flex scroll-buttons">
        <button className='btn btn-outline-secondary me-2 mt-4 ms-2' onClick={() => scroll('prev')}> <i className='fas fa-arrow-down'></i> PRÉCÉDENT</button>
        <button className='btn btn-outline-secondary me-2 mt-4'  onClick={() => scroll('next')}>SUIVANT <i className='fas fa-arrow-up'></i></button>
        <PdfGenerator employeeP={employee}/>
      </div>
    </div>
  );
};

export default MyDataTable;
