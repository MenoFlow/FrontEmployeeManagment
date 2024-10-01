import {Link} from 'react-router-dom';
import logoEF from '../../assets/LOGO_EF.png';
const sideBar = () => {
    return(
  <aside className="sidebar" style={{ zIndex: "1", opacity: "1", paddingTop:"0px" }}>
    <div className="sidebar-header">
      {/* <img src="images/logo.png" alt="logo" /> */}
      <h2></h2>
    </div>
    <ul className="sidebar-links">
      
        <img src={logoEF} alt='logoEF'/>
        <div className="menu-separator"></div>
      
      <li>
        <Link to="/list_pension" style={{ }}>
          <i className="fas fa-check-square"></i>Selection
        </Link>
      </li>
      <li>
        <Link to="/add_im">
          <i className="fas fa-plus"></i>Imatricule</Link>
      </li>
      <li>
        <Link to="/add_mvt_bill">
          <i className="fas fa-plus"></i>Mouvement et Bill</Link>
      </li>

    </ul>
    <div className="user-account">
      <div className="user-profile">
        <img src="Menoh.png" alt="Profile Image" />
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