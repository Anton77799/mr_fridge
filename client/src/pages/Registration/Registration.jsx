/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../store/action';
import './reg.css';

const initValues = {
  login: '',
  email: '',
  password: '',
  imageUrl: '',
};

const clientId = '732344056543-jeo72mj73978okpth0nr3k1mrlpl19ac.apps.googleusercontent.com';

function Registration() {
  const [inputValue, setInputValue] = useState(initValues);
  const [errMessage, setErrMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    JSON.parse(localStorage.getItem('isAuth')) ? navigate('/') : null;
  }, []);
  const onSuccess = async (res) => {
    const req = await fetch('http://localhost:3100/api/v1/google', {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(res.profileObj),
    });
    const response = await req.json();
    if (response.id) {
      dispatch(setUser(response));
      localStorage.setItem('isAuth', JSON.stringify(true));
      navigate('/');
    }
  };
  const onFailure = (res) => {
    setErrMessage(res.error);
  };

  const changeHandler = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const regHandler = async (e) => {
    e.preventDefault();
    const req = await fetch('http://localhost:3100/api/v1/registration', {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(inputValue),
    });
    const res = await req.json();
    if (res.message) setErrMessage(res.message);
    if (res.id) {
      dispatch(setUser(res));
      localStorage.setItem('isAuth', JSON.stringify(true));
      navigate('/');
    }
  };

  return (
    <div className="center">
      <form onSubmit={regHandler} className="form-signin" id="regForm">
        <div className="form-group">
          <label htmlFor="inputLogin" className="form-label">
            Login
            <input onChange={changeHandler} name="login" value={inputValue.login} type="text" className="form-control" id="inputLogin" required />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="inputEmail" className="form-label">
            Email
            <input onChange={changeHandler} name="email" value={inputValue.email} type="email" className="form-control" id="inputEmail" required />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword" className="form-label">
            Password
            <input onChange={changeHandler} name="password" value={inputValue.password} type="password" className="form-control" id="inputPassword" required />
          </label>
        </div>
        <button className="btn btn-lg btn-secondary" type="submit">Register</button>
        <div>
          {errMessage}
        </div>
      </form>
      <GoogleLogin
        className="btn google"
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        // eslint-disable-next-line react/jsx-curly-brace-presence
        cookiePolicy={'single_host_origin'}
        // eslint-disable-next-line react/jsx-boolean-value
        isSignedIn={true}
      />
    </div>
  );
}

export default Registration;
