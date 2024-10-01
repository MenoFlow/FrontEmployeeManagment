import DataTable from 'react-data-table-component';
import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../App.css'; 
  
// const Popup = (props) => {
//   return (
//     <div className="popup-overlay" style={{ zIndex:"1" }}>
//       <div className="popup-content">
//         {/* <h2>Pop-up</h2> */}
//         <h3>Ajouter avec succes</h3>
//         <i className="fas fa-check-circle" style={{ fontSize:"60px" }}></i>
//         {/* <button className='btn btn-secondary' onClick={()=>console.log(props.closePopup())}>Fermer</button> */}
//       </div>
//     </div>
//   );
// };
// const Popup = (props) => {
//   return (
//     <div className="" style={{ position: "fixed", top: "20px", right: "20px", zIndex: "1" }}>
//       <div className="" style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
//         <h3>Ajouter avec succès</h3>
//         <i className="fas fa-check-circle" style={{ fontSize: "60px", color: "green" }}></i>
//       </div>
//     </div>
//   );
// };
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



const MyDataTable = (props) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
      setIsPopupOpen(!isPopupOpen);

      setTimeout(() => {
            setIsPopupOpen(false);
      }, 1000);
    };

  const columns = [
    { name: 'Imatricule', selector: row => row.im, sortable: true },
    { name: 'Nom', selector: row => row.nom, sortable: true },
    { name: 'Prenoms', selector: row => row.prenoms, sortable: true },
    { name: 'Mouvements', selector: row => row.mouvement, sortable: true },
    { name: 'Nombre', selector: row => row.nb, sortable: true },
    { name: 'bill', selector: row => row.bill, sortable: true },
    { name: 'Actions',
      width: '250px',
        cell: (row) => (
          <div className='d-flex content-center'>
            <button className='btn btn-outline-primary me-2' onClick={()=>{addMouvement(row.im)}} style={{minWidth: "111px", textAlign:"center"}}>
              mvt
            </button>
            
            <button className='btn btn-outline-primary'  onClick={()=>{addbill(row.im)}} style={{minWidth: "111px"}}>
              bill
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

  // useEffect(() => {



  const addbill = (im) => {

    const number = props.bill;
    console.log(number.bill)

    if (number.bill === undefined){
      alert("Le champ 'BILL' est vide")
    } else {
      axios
      .put("http://localhost:3000/auth/add_bill", {number, im})
      .then((result) => {
        if (result.data.Status) {
          // setEmployee(result.data.Result);
          togglePopup();
          
        } else {
          console.log(result.data)
          // alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
    }
  }
  const addMouvement = (im) => {
    const number = props.mouvement;

    if (number.mouvement === undefined){
      alert("Le champ 'mouvement' est vide")

    } else {
      const mouvToCount = number.mouvement;

      const countSlash = (mouvToCount) => {
        return mouvToCount.split('/').length;
      }
      const nb = countSlash(mouvToCount)
  
  
      axios
      .put("http://localhost:3000/auth/add_mouvement_pension", {number, nb, im})
      .then((result) => {
        if (result.data.Status) {
          // setEmployee(result.data.Result);
          togglePopup();
        } else {
          console.log(result.data)
          // alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
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
      {/* <h1>Tableau avec défilement vertical</h1> */}

      <div className="table-container" ref={scrollContainerRef} style={{ height:"500px" }}>
        <DataTable
          columns={columns}
          data={employee}
          fixedHeader
          fixedHeaderScrollHeight="500px" 
          noDataComponent="Pas de données à afficher"
        />
      </div>
      {isPopupOpen && <Popup closePopup={togglePopup} />}
      <div className="d-flex scroll-buttons">
        <button className='btn btn-outline-secondary me-2 mt-4 ms-2' onClick={() => scroll('prev')}> <i className='fas fa-arrow-up'></i></button>
        <button className='btn btn-outline-secondary me-2 mt-4'  onClick={() => scroll('next')}> <i className='fas fa-arrow-down'></i></button>
        {/* <PdfGenerator employeeP={employee}/> */}
      </div>
    </div>
  );
};

export default MyDataTable;