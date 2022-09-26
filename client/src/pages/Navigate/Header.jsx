/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector } from 'react-redux';
import {
  Routes, Link, Route, Navigate, useLocation,
} from 'react-router-dom';
import './nav.css';

function Header() {
  const isAuth = JSON.parse(localStorage.getItem('isAuth'));
  const userName = useSelector((store) => store.user.login);
  const userIcon = useSelector((store) => store.user.imageUrl);
  const cuisines = useSelector((store) => store.cuisines);
  const types = useSelector((store) => store.types);

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <img src="/img/125663.png" className="logo" alt="..." />
        <p className="navbar-brand">Mr.Fridge</p>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              {isAuth
                ? (
                  <div className="profLink">
                    <div className="icon" style={{ backgroundImage: `url(${userIcon})` }} />
                    <span data-bs-toggle="offcanvas" className="link-text">
                      <Link className="nav-link-text" to="/profile">
                        {userName}
                      </Link>
                    </span>
                  </div>
                )
                : (
                  <div className="profLink">
                    <span data-bs-toggle="offcanvas" className="link-text"><Link className="nav-link-text" to="/login">Login |</Link></span>
                    <span data-bs-toggle="offcanvas" className="link-text"><Link className="nav-link-text" to="/registration">| Registration</Link></span>
                  </div>
                )}
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item" data-bs-dismiss="offcanvas">
                <Link className="nav-link-text" to="/"><span className="link-text">Home</span></Link>
              </li>
              <li className="nav-item" data-bs-dismiss="offcanvas">
                <Link className="nav-link-text" to="/my-ref"><span className="link-text">My fridge</span></Link>
              </li>
              <li className="nav-item" data-bs-dismiss="offcanvas">
                <Link className="nav-link-text" to="/mealPlan"><span className="link-text">Get meal plan</span></Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <span className="link-text">National cuisine</span>
                </a>
                <ul className="dropdown-menu nav-link-text">
                  {cuisines.map((cuisine) => <li data-bs-dismiss="offcanvas" key={cuisine}><Link to={`/cuisine/${cuisine}`} className="dropdown-item"><span className="link-text">{cuisine}</span></Link></li>)}
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <span className="link-text">Types</span>
                </a>
                <ul className="dropdown-menu nav-link-text">
                  {types.map((type) => <li data-bs-dismiss="offcanvas" key={type}><Link to={`/type/${type}`} className="dropdown-item"><span className="link-text">{type}</span></Link></li>)}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
