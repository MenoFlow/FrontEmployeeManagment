import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import MotherComponent from './Components/Solde/MotherComponent';
import NavSide from './Components/NavSide';
import Acceuil from './Components/Acceuil';
import Demandeur from './Components/Solde/Demandeur';
import PersonPension from './Components/Pension/PersonPension';
import AddIm from './Components/Pension/AddIm';
import AddImSolde from './Components/Solde/AddImSolde';
import ListBeneficiairePension from './Components/Pension/ListBeneficiairePension';
import ListDemandeur from './Components/Solde/ListDemandeur';
import Importation from './Components/Importation';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<NavSide />}>
      <Route path='' element={<Acceuil />}></Route>
        {/* <Route path='/'> */}

        {/* </Route> */}
        <Route path='/solde' element={<ListDemandeur />}></Route>
        <Route path='/add_im' element={<AddIm />}></Route>
        <Route path='/list_pension' element={<ListBeneficiairePension />}></Route>
        <Route path='/add_mvt_bill' element={<PersonPension />}></Route>

        <Route path='/solde/list_solde' element={<ListDemandeur/>}></Route>
        <Route path='/solde/add_im' element={<AddImSolde/>}></Route>
        <Route path='/solde/add_mvt_chap' element={<Demandeur/>}></Route>
        <Route path='/importation' element={<Importation/>}></Route>

      </Route>
    </Routes>
    </BrowserRouter>    
  )
}
// 
export default App
