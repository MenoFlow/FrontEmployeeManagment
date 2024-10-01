import React, { useState} from 'react';
import { Link, Outlet } from 'react-router-dom';

function Navbar() {
 
        const [isOpen, setIsOpen] = useState(false);
        const toggleDropdown = () => {
            setIsOpen(!isOpen);
        };

        const toggleDropdownOnDiv = () => {
            if(isOpen===true){
                setIsOpen(false);
            }
        
        };
        return (    
            <div onClick={toggleDropdownOnDiv}>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark ps-1"
                    style={{ backgroundColor:"rgba(33, 27, 41, 1)", zIndex:"1", paddingLeft: "150px" }}>  
                        <div className="container-fluid" style={{ margin: '0px' }}>
                            <Link className="navbar-brand" style={{ paddingLeft: "75px" }} to="/">Bordereau d'envoi</Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">

                                <ul key={4} className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li key={0} className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/">Acceuil</Link>
                                    </li>
                                    <li key={1} className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/importation">Importation</Link>
                                    </li>
                                    <li key={3} className="nav-item dropdown">
                                    <button onClick={toggleDropdown} className="nav-link dropdown-toggle" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                        Division
                                    </button>
                                    {isOpen && (
                                    <ul className='list-group' aria-labelledby="navbarDropdown" style={{top: '100%',left: '0',zIndex: '1',listStyle: 'none', position: 'absolute'}}>
                                        <li className='list-group-item'><Link className="dropdown-item" to="/solde">Solde</Link></li>
                                        <li className='list-group-item'><Link className="dropdown-item" to="/list_pension">Pension</Link></li>
                                        <li className='list-group-item'><a className="dropdown-item" href="/">Secours</a></li>
                                        <li className='list-group-item'><a className="dropdown-item" href="/">BAF</a></li>
                                        <li className='list-group-item'><a className="dropdown-item" href="/">VISA</a></li>
                                    </ul>
                                    )}
                                    </li>
                                    <li className="nav-item">
                                    <a className="nav-link disabled" href="/" tabIndex="-1" aria-disabled="true">Admin</a>
                                    </li>
                                </ul>
                                {/* <form className="d-flex">
                                    <input className="form-control me-2" type="search" placeholder="Rechercher" aria-label="Search" />
                                    <button className="btn btn-outline-success" type="submit">Rechercher</button>
                                </form> */}
                            </div>
                            
                        </div>
                    
                        
                    </nav>
                </div>
                <div>
                <Outlet />
                </div>
            </div>
                
    );
    
}

export default Navbar;