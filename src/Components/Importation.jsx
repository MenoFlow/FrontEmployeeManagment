import { useState } from "react";
import axios from 'axios';
import guide1 from '../assets/guide1.png'; // chemin vers votre image
import Popup from './Popup'; // Importer le popup
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'; // Icône de chargement

const Importation = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("Aucun fichier choisi");
    const [showPopup, setShowPopup] = useState(false); // État pour afficher ou non le popup
    const [popupMessage, setPopupMessage] = useState(""); // Message personnalisé du popup
    const [loading, setLoading] = useState(false); // État pour le loading

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0]; // Récupérer le fichier sélectionné
        setFile(selectedFile);
        setFileName(selectedFile ? selectedFile.name : "Aucun fichier choisi"); // Mettre à jour le nom du fichier
    };

    const convertToSql = () => {
        const formData = new FormData();
        formData.append('file', file); // Ajouter le fichier au FormData

        // Afficher le loading
        setLoading(true);
        
        axios.post('http://localhost:3000/auth/importExcelToSql', formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Indiquer que le contenu est un formulaire
            }
        })
        .then(result => {
            // Mettre à jour le message de succès
            setPopupMessage("Importation réussie !");
        })
        .catch(err => {
            // Mettre à jour le message d'erreur
            setPopupMessage("Erreur lors de l'importation");
        })
        .finally(() => {
            // Après 2 secondes, masquer le loading et afficher le popup
            setTimeout(() => {
                setLoading(false);
                setShowPopup(true); // Afficher le popup
            }, 2000);
        });
    };

    const closePopup = () => {
        setShowPopup(false); // Fermer le popup
    };

    return (
        <div className='d-flex justify-content-center align-items-center mt-2'>
            <div className="justify-content-center">
                <h2>Mise à jour du fichier Excel contenant la liste des personnels</h2>
                <div className="notice">
                    <h5>NOTICES : </h5>
                    <p>La mise à jour du fichier n'effacera pas la liste des personnels existants.</p>
                    <p>Les noms des colonnes sont les suivants : AGENTMATRICULE, AGENTNOM, AGENTPRENOMS</p>
                    <p>Si ce n'est pas encore le cas, changez les.</p>
                    <p>Voici un exemple de contenu du fichier à importer :</p>
                    <img
                        src={guide1}
                        alt="Guide"
                        style={{
                            maxWidth: '100%',   
                            height: 'auto',     
                        }}
                    />
                </div>

                <div className="justify-content-center">
                    {/* Input file masqué */}
                    <input
                        type="file"
                        id="customFile"
                        className="custom-file-input"
                        onChange={handleFileChange}
                        style={{ 
                            display: 'none',
                            borderRadius: '0px',
                        }} 
                    />
                        
                    {/* Label personnalisé comme bouton */}
                    <label className="custom-file-label btn btn-outline-primary mt-3" htmlFor="customFile"
                        style={{ 
                            borderRadius: '0px',
                        }}
                    >
                        {fileName}
                    </label>
                    
                    {/* Ajouter un bouton pour déclencher l'input file */}
                    <button
                        className="btn btn-secondary mt-3 me-2"
                        onClick={() => document.getElementById('customFile').click()}
                        style={{
                            borderRadius: '0px',
                        }}
                    >
                        Choisir un fichier
                    </button>

                    <button className="btn btn-primary float-end mt-3" onClick={convertToSql}>
                        Importer
                    </button>
                </div>
                
                {/* Popup de chargement */}
                {loading && (
                    <Popup show={true} handleClose={() => {}} message={
                        <div className="d-flex justify-content-center align-items-center">
                            <FontAwesomeIcon icon={faSpinner} spin size="2x" className="me-2" />
                            importation en cours...
                        </div>
                    } />
                )}

                {/* Utilisation du composant Popup pour le résultat */}
                <Popup show={showPopup} handleClose={closePopup} message={popupMessage} />
            </div>
        </div>
    );
};

export default Importation;
