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
      <div className="" style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" , textAlign:"center"}}>
        <h3>Ajouté avec succès</h3>
        <i className="fas fa-check-circle" style={{ fontSize: "60px", color: "green" }}></i>
      </div>
    </div>
  );
};

const ListBeneficiairePension = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tabState, setTabState] = useState([]);
  
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);

    setTimeout(() => {
          setIsPopupOpen(false);
    }, 1000);
  };

  const columns = [
    { name: 'Selection',
      width: '100px',
        cell: (row) => (
          <div className='d-flex content-center'>
            <input type='radio' className='' onClick={()=>{ajouter(row)}} style={{ textAlign:"center"}}/>
            
          </div>

        ),

     },
    { name: 'Imatricule', selector: row => row.im, sortable: true },
    { name: 'Nom', selector: row => row.nom, sortable: true },
    { name: 'Prenoms', selector: row => row.prenoms, sortable: true },
    { name: 'Mouvements', selector: row => row.mouvement, sortable: true },
    { name: 'Nombre', selector: row => row.nb, sortable: true },
    { name: 'bill', selector: row => row.bill, sortable: true },

  ];

  const scrollContainerRef = useRef(null);

  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/list_person_pension")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert("this : "+result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);


  const ajouter = (row) => {
    let isInTab = false;
    tabState.map((t) => {
      if ( row.im === t.cle.im ){
        isInTab = true;
      }

    })
    if ( !isInTab ){
      togglePopup();
      const obj = {
        cle : {
          im: row.im,
          nom: row.nom,
          prenoms: row.prenoms,
          mouvement: row.mouvement,
          bill: row.bill,
          nb: row.nb
        }
      }
  
      tabState.push(obj);
      
      setTabState(tabState);
      console.log(tabState);
  
    } else {
      console.log('Anaty table ann');
    }

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
    <div>
        <SideBar/>
      {/* <h1>Tableau avec défilement vertical</h1> */}

      <div className="table-container" ref={scrollContainerRef} style={{ position:"relative", opacity: "0.99" }}>
      <h2 className='mt-3' style={{ textAlign:"center" }}>
        Liste des beneficiaires de pensions
      </h2>
        <DataTable
          columns={columns}
          data={employee}
          fixedHeader 
          fixedHeaderScrollHeight="600px"
          noDataComponent="Pas de données à afficher"
        />
      </div>
      {isPopupOpen && <Popup closePopup={togglePopup} />}
      <div className="d-flex scroll-buttons">
        <button className='btn btn-outline-secondary me-2 mt-4 ms-2' onClick={() => scroll('prev')}> <i className='fas fa-arrow-up'></i> </button>
        <button className='btn btn-outline-secondary me-2 mt-4'  onClick={() => scroll('next')}><i className='fas fa-arrow-down'></i></button>
        <PdfGenerator tabState={tabState}/>
        <button className='btn btn-primary mt-4' onClick={()=>{window.location.reload()}} style={{ height: "40px" }}>Tout effacer</button>
      </div>
    </div>
  );
};

export default ListBeneficiairePension;
