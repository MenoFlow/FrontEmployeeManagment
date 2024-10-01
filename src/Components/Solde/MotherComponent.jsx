
import AddIm from './AddImSolde';
import AddMouvement from './AddMouvement';
import AddChapitre from '../AddChapitre';
import Demandeur from './Demandeur';
import Navbar from '../Navbar';

const MotherComponent = () => {
    return(


                <div>
                    <Navbar />
                    {/* <AddIm /> */}
                    {/* <hr/> */}
                    <Demandeur />
                </div>

    )
}

export default MotherComponent;