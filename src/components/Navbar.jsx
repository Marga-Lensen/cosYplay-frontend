import { Link } from "react-router-dom";

const Navbar = () => {
  return (

<nav>
      <Link to="/cosYhome">Home </Link>  <span>  |  </span> 
      <Link to="/register"> Register</Link>  <span>  |  </span> 
      <Link to="/login">Login  </Link> <span>  | </span>      
      <Link to="/logout">Logout  </Link>    

    </nav>

  );
};

export default Navbar;
