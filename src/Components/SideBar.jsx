// @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200");
// @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");

import {Link} from 'react-router-dom';

const sideBar = () => {
    return(
  <aside className="sidebar" style={{ zIndex: "0" }}>
    <div className="sidebar-header">
      {/* <img src="images/logo.png" alt="logo" /> */}
      <h2></h2>
    </div>
    {/* <ul className="sidebar-links">
      <h4>
        <i className="fas fa-bars" style={{ fontSize: "50px" }}></i>
        <div className="menu-separator"></div>
      </h4>
      <li>
        <Link to="/solde/list_solde">
          <i className="fas fa-tachometer-alt"></i>Selection
        </Link>
      </li>
      <li>
        <Link to="/solde/add_im">
          <i className="fas fa-plus"></i>Imatricule</Link>
      </li>
      <li>
        <Link to="/solde/add_mvt_chap">
          <i className="fas fa-plus"></i>Mouvement et Chapitre</Link>
      </li>
        
    </ul> */}
    <div className="user-account">
      <div className="user-profile">
      <img src="./../../Menoh.png" alt="Profile Image" />
        <div className="user-detail">
          <h3>Hermenio</h3>
          <i>Web Developer</i>
        </div>
      </div>
    </div>
  </aside>
    )
}

export default sideBar;