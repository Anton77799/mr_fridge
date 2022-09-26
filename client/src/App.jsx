import React, { useEffect } from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { gapi } from 'gapi-script';
import { setUser } from './store/action';
import Header from './pages/Navigate/Header';
import './App.css';
import Cousines from './pages/Cousines/Cousines';
import Types from './pages/Types/Types';
import Refrigirator from './pages/Refrigirator/Refrigirator';
import OneMeal from './pages/OneMeal/OneMeal';
// import Testik from './pages/Testik/Testik';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import Profile from './pages/profile/Profile';
import Home from './pages/Home/Home';
import MealPlan from './pages/MealPlan/MealPlan';

const clientId = '732344056543-jeo72mj73978okpth0nr3k1mrlpl19ac.apps.googleusercontent.com';

function App() {
  const dispatch = useDispatch();
  const checkSessionHandler = async () => {
    const req = await fetch('http://localhost:3100/api/v1/checkSession', {
      credentials: 'include',
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
    });
    const res = await req.json();
    if (req.status === 200) dispatch(setUser(res));
  };
  useEffect(() => {
    checkSessionHandler();
  }, []);
  useEffect(() => {
    function start() {
      gapi.auth2.init({
        client_id: clientId,
        scope: '',
      });
    }
    gapi.load('client:auth2', start);
  });

  return (
    <BrowserRouter>
      <Header />
      {/* <div className="container-xl"> */}
      <div className="container-all">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/recipe/:id" element={<OneMeal />} />
          <Route path="/my-ref" element={<Refrigirator />} />
          <Route path="/cuisine/:cuisine" element={<Cousines />} />
          <Route path="/type/:type" element={<Types />} />
          <Route path="/mealPlan" element={<MealPlan />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
