import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
// import Demandeur from './Demandeur';
import SideBar from './SideBar';
import DataTable from 'react-data-table-component';


const AddIm = () => {
    const [im, setIm] = useState()
    const navigate = useNavigate()

    const [toTrue, setToTrue] = useState(false)
    const [personToFiltre, setPerson] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/auth/add_im_pension', {im})
        .then(result => {
            if(result.data.Status) {
                navigate('/')
                console.log(22)
            } else {
                alert(result.data.Error)
                setToTrue(true)
            }
        })
        .catch(err => console.log(err))
    }
    useEffect(() => {
        axios.get('http://localhost:3000/auth/filtre_im/'+im)
        .then(result=>{
            if (result.data.Status){
                setPerson(result.data.Result)
                // console.log(result.data.Result)
            } else {
                alert(result.data.Error)
                
            }
        })
        .catch(err => console.log(err))
            
    });
    const columns = [

        { name: 'Imatricule', selector: row => row.im, sortable: true },
        { name: 'Nom', selector: row => row.nom, sortable: true },
        { name: 'Prenoms', selector: row => row.prenoms, sortable: true },
 ];
  return (
    <div className='d-flex justify-content-center align-items-center h-75' style={{textAlign: "center", marginBottom: "0px"}}>
    <SideBar/>
    <div className='p-3 border bg-white rounded' style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", marginTop: "50px"}}>
        <h2>Ajouter l'imatricule du demandeur</h2>
        <form onSubmit={handleSubmit} className=''>
            <div className='mb-5 mt-4 p-3 mb-5'>
                <label htmlFor="im"><strong>Imatricule:</strong></label>
                <input type="text" name='category' placeholder="Entrer l'imatricule"
                 onChange={(e) => setIm(e.target.value)} className='form-control rounded-0'
                 maxLength="10"

                 />
            </div>
            <button className='btn btn-outline-success w-100 rounded-0 mb-5'>Ajouter</button>
        </form>
        <div className='mb-3'>
            <DataTable
                columns={columns}
                data={personToFiltre}
                noDataComponent="Pas de données à afficher"
            />
        </div>

        {toTrue && (
            <div>
                <button className='btn btn-success' style={{ transition:"1000ms" }}>
                    Ajouter manuellement l'IM
                </button>
                <button className='btn' style={{ color:"green" }} onClick={()=>setToTrue(false)}>
                    Non merci
                </button>
            </div>
        )}
    </div>


</div>
  )
}

export default AddIm;