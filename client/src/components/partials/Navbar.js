import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../logo192.png';

const Navbar = () => {
  const navigate = useNavigate();
  const authorized = localStorage.getItem('authorization');
  const isAuthenticated = authorized ? Boolean(authorized) : false;
  const logoutHandler = () => {
    navigate('/login');
    localStorage.removeItem('authorization');
    localStorage.removeItem('auth_token');
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-lg text-bg-light mb-2 fw-semibold">
            <div className="container-fluid">
              <NavLink className="navbar-brand" to="/">
                <img src={logo} alt="logo" className='img-fluid' width="80" height="auto"/>
              </NavLink>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                {
                  isAuthenticated &&
                  <ul className='navbar-nav ms-auto'>
                    <li className='nav-item me-2'>
                      <NavLink className="nav-link fw-semibold" to="/">Home</NavLink>
                    </li>
                    <li className='nav-item me-2'>
                      <NavLink className="nav-link fw-semibold" to="*">Example-1</NavLink>
                    </li>
                    <li className='nav-item me-2'>
                      <NavLink className="nav-link fw-semibold" to="*">Example-2</NavLink>
                    </li>
                    <li className='nav-item me-2'>
                      <NavLink className="nav-link fw-semibold" to="*">Example-3</NavLink>
                    </li>
                    <li className='nav-item'>
                      <button
                        type='button'
                        className="btn btn-outline-secondary fw-semibold"
                        onClick={logoutHandler}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                }
                {
                  !isAuthenticated &&
                  <ul className='navbar-nav ms-auto'>
                    <li className='nav-item me-2'>
                      <NavLink className="btn btn-outline-secondary fw-semibold" to="/signup">Signup</NavLink>
                    </li>
                    <li className='nav-item'>
                      <NavLink className="btn btn-outline-secondary px-3 fw-semibold" to="/login">Login</NavLink>
                    </li>
                  </ul>
                }
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Navbar;