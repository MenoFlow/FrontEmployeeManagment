import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import Demandeur from './Demandeur';

const AddChapitre = () => {
    const [category, setCategory] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/auth/add_category', {category})
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/category')
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='justify-content-center align-items-center h-75' style={{textAlign: "center"}}>

        <div className='p-3 rounded w-25 border' style={{marginTop: "50px", marginLeft: "600px"}}>
            <h2>Ajouter une imatricule</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    {/* <label htmlFor="category"><strong>Imatricule:</strong></label> */}
                    <input type="text" name='category' placeholder="Entrer l'imatricule"
                     onChange={(e) => setCategory(e.target.value)} className='form-control rounded-0'/>
                </div>
                <button className='btn btn-success w-100 rounded-0 mb-2'>Ajouter</button>
            </form>
        </div>
        <br/>
    </div>
  )
}

export default AddChapitre;