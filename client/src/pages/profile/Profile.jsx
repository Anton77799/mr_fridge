/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-tabs */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGoogleLogout } from 'react-google-login';
import {
  Routes, Link, Route, Navigate, useLocation, useNavigate,
} from 'react-router-dom';
import { logoutUser } from '../../store/action';
import './profileCSS.css';
import RecipeCard from '../../Components/RecipeCard';
import { keys } from '../api_keys';

function Profile() {
  // const apiKey = 'aa844e1894b74bc2a3e672c59f887e64';
  const [fav, setFav] = useState('non-active');
  const [meal, setMeal] = useState('non-active');
  const [mealData, setMealData] = useState([]);
  const [favData, setFavData] = useState([]);
  const userId = useSelector((store) => store.user.id);
  const userName = useSelector((store) => store.user.login);
  const userIcon = useSelector((store) => store.user.imageUrl);
  const isAuth = useSelector((store) => store.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navToMain = () => navigate('/');
  const { signOut } = useGoogleLogout({
    clientId: '732344056543-jeo72mj73978okpth0nr3k1mrlpl19ac.apps.googleusercontent.com',
    onLogoutSuccess: navToMain,
  });

  const favClick = async () => {
    setFav('active');
    setMeal('non-active');
    const getFavreq = await fetch('http://localhost:3100/api/v1/getUserFav/', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    const getFavRes = await getFavreq.json();
    const ids = getFavRes.join(',');
    const recipesRes = await fetch(`https://api.spoonacular.com/recipes/informationBulk?ids=${ids}&apiKey=${keys.apiKey2}`);
    const recipesReq = await recipesRes.json();
    setFavData(recipesReq);
  };
  const mealClick = async () => {
    setFav('non-active');
    setMeal('active');
    const getMealReq = await fetch('http://localhost:3100/api/v1/mealSave/get', {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    const getMealRes = await getMealReq.json();
    setMealData(getMealRes);
  };

  const getMealPlan = () => {
    if (Array.isArray(mealData)) {
      return (mealData.map((recipe) => (
        <RecipeCard id={recipe.id} url={`https://spoonacular.com/recipeImages/${recipe.id}-556x370.jpg`} title={recipe.title} summary={recipe.summary} dishType="dish type" preparationMinutes={recipe.readyInMinutes} key={recipe.id} />
      )));
    }
    if (mealData.monday) {
      return (
        <>
          <h3>Monday</h3>
          {mealData.monday.meals.map((recipe) => <RecipeCard id={recipe.id} url={`https://spoonacular.com/recipeImages/${recipe.id}-556x370.jpg`} title={recipe.title} summary={recipe.summary} dishType="dish type" preparationMinutes={recipe.readyInMinutes} key={recipe.id} />)}
          <h3>Tuesday</h3>
          {mealData.tuesday.meals.map((recipe) => <RecipeCard id={recipe.id} url={`https://spoonacular.com/recipeImages/${recipe.id}-556x370.jpg`} title={recipe.title} summary={recipe.summary} dishType="dish type" preparationMinutes={recipe.readyInMinutes} key={recipe.id} />)}
          <h3>Wednesday</h3>
          {mealData.wednesday.meals.map((recipe) => <RecipeCard id={recipe.id} url={`https://spoonacular.com/recipeImages/${recipe.id}-556x370.jpg`} title={recipe.title} summary={recipe.summary} dishType="dish type" preparationMinutes={recipe.readyInMinutes} key={recipe.id} />)}
          <h3>Thursday</h3>
          {mealData.thursday.meals.map((recipe) => <RecipeCard id={recipe.id} url={`https://spoonacular.com/recipeImages/${recipe.id}-556x370.jpg`} title={recipe.title} summary={recipe.summary} dishType="dish type" preparationMinutes={recipe.readyInMinutes} key={recipe.id} />)}
          <h3>Friday</h3>
          {mealData.friday.meals.map((recipe) => <RecipeCard id={recipe.id} url={`https://spoonacular.com/recipeImages/${recipe.id}-556x370.jpg`} title={recipe.title} summary={recipe.summary} dishType="dish type" preparationMinutes={recipe.readyInMinutes} key={recipe.id} />)}
          <h3>Saturday</h3>
          {mealData.saturday.meals.map((recipe) => <RecipeCard id={recipe.id} url={`https://spoonacular.com/recipeImages/${recipe.id}-556x370.jpg`} title={recipe.title} summary={recipe.summary} dishType="dish type" preparationMinutes={recipe.readyInMinutes} key={recipe.id} />)}
          <h3>Sunday</h3>
          {mealData.sunday.meals.map((recipe) => <RecipeCard id={recipe.id} url={`https://spoonacular.com/recipeImages/${recipe.id}-556x370.jpg`} title={recipe.title} summary={recipe.summary} dishType="dish type" preparationMinutes={recipe.readyInMinutes} key={recipe.id} />)}
        </>
      );
    }
    return (
      <h2>Here would be your meal plan</h2>
    );
  };

  const logoutHandler = async () => {
    const req = await fetch('http://localhost:3100/api/v1/logout', {
      credentials: 'include',
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
    });
    if (req.status === 200) dispatch(logoutUser());
    signOut();
    localStorage.removeItem('isAuth');
  };
  useEffect(() => {
    JSON.parse(localStorage.getItem('isAuth')) ? null : navigate('/');
  }, []);
  return (
    <div className="wrapper">
      <div className="user">
        <div className="icon_name">
          <div className="icon" style={{ backgroundImage: `url(${userIcon})` }} />
          <span className="name title">{userName}</span>
        </div>
        <Link onClick={logoutHandler}>
          <svg width="40" height="40" viewBox="0 0 32 32">
            <g id="login" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <path d="M11,20 L13,20 L13,22 C13,23.1045695 13.8954305,24 15,24 L23,24 C24.1045695,24 25,23.1045695 25,22 L25,10 C25,8.8954305 24.1045695,8 23,8 L15,8 C13.8954305,8 13,8.8954305 13,10 L13,12 L11,12 L11,10 C11,7.790861 12.790861,6 15,6 L23,6 C25.209139,6 27,7.790861 27,10 L27,22 C27,24.209139 25.209139,26 23,26 L15,26 C12.790861,26 11,24.209139 11,22 L11,20 Z" id="Combined-Shape" fill="#2F2F36" fillRule="nonzero" />
              <path d="M16,15 L16,14.1618022 C16,13.6095174 16.4477153,13.1618022 17,13.1618022 C17.2372126,13.1618022 17.4667008,13.2461275 17.647477,13.3997172 L19.8110488,15.237915 C20.2319367,15.5955067 20.2832484,16.2265891 19.9256568,16.647477 C19.8906181,16.6887178 19.8522895,16.7270463 19.8110488,16.762085 L17.647477,18.6002828 C17.2265891,18.9578745 16.5955067,18.9065627 16.237915,18.4856748 C16.0843253,18.3048986 16,18.0754104 16,17.8381978 L16,17 L8,17 C7.44771525,17 7,16.5522847 7,16 C7,15.4477153 7.44771525,15 8,15 L16,15 Z" id="Combined-Shape" fill="#2F2F36" />
            </g>
          </svg>
        </Link>
      </div>
      <div className="social">
        <h2 className="_84e0044158 title">Добавьте ссылки на свои соц.&nbsp;сети</h2>
        <div className="socail_links">
          <div className="vk">
            <img src="/img/vk.svg" width="20" height="20" alt="..." />
            <input placeholder="vk.com/" className="social-input" value="" />
            <div><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M18.6971 4.72076L14.4333 0.505796C14.1135 0.189673 13.6658 0 13.1967 0H11.214V3.56164C11.214 3.91992 10.9156 4.21496 10.5531 4.21496H4.94611C4.58368 4.21496 4.28521 3.91992 4.28521 3.56164V0H1.72687C0.7675 0 0 0.758693 0 1.70706V18.2929C0 19.2413 0.7675 20 1.72687 20H17.4819C18.4413 20 19.2088 19.2413 19.2088 18.2929V5.9431C19.2088 5.47945 19.0169 5.03688 18.6971 4.72076ZM14.9023 16.1433C14.9023 16.5016 14.6038 16.7966 14.2414 16.7966H4.94611C4.58368 16.7966 4.28521 16.5016 4.28521 16.1433V8.15595C4.28521 7.79768 4.58368 7.50263 4.94611 7.50263H8.74097V11.8862L7.5684 10.7271C7.44049 10.6006 7.24861 10.6006 7.12069 10.7271L6.35319 11.4858C6.22528 11.6122 6.22528 11.8019 6.35319 11.9283L9.38055 14.8999C9.50847 15.0263 9.70035 15.0263 9.82826 14.8999L12.8556 11.9073C12.9835 11.7808 12.9835 11.5911 12.8556 11.4647L12.0881 10.706C11.9602 10.5796 11.7683 10.5796 11.6404 10.706L10.4465 11.8651V7.48156H14.2201C14.5825 7.48156 14.881 7.77661 14.881 8.13488V16.1433H14.9023Z" fill="#2F2F36" /></svg></div>
          </div>
          <div className="odnoklassniki">
            <img src="/img/odnoklassniki.svg" width="20" height="20" alt="..." />
            <input placeholder="ok.ru/" className="social-input" value="" />
            <div className="_6ad855169c fce95a844a"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M18.6971 4.72076L14.4333 0.505796C14.1135 0.189673 13.6658 0 13.1967 0H11.214V3.56164C11.214 3.91992 10.9156 4.21496 10.5531 4.21496H4.94611C4.58368 4.21496 4.28521 3.91992 4.28521 3.56164V0H1.72687C0.7675 0 0 0.758693 0 1.70706V18.2929C0 19.2413 0.7675 20 1.72687 20H17.4819C18.4413 20 19.2088 19.2413 19.2088 18.2929V5.9431C19.2088 5.47945 19.0169 5.03688 18.6971 4.72076ZM14.9023 16.1433C14.9023 16.5016 14.6038 16.7966 14.2414 16.7966H4.94611C4.58368 16.7966 4.28521 16.5016 4.28521 16.1433V8.15595C4.28521 7.79768 4.58368 7.50263 4.94611 7.50263H8.74097V11.8862L7.5684 10.7271C7.44049 10.6006 7.24861 10.6006 7.12069 10.7271L6.35319 11.4858C6.22528 11.6122 6.22528 11.8019 6.35319 11.9283L9.38055 14.8999C9.50847 15.0263 9.70035 15.0263 9.82826 14.8999L12.8556 11.9073C12.9835 11.7808 12.9835 11.5911 12.8556 11.4647L12.0881 10.706C11.9602 10.5796 11.7683 10.5796 11.6404 10.706L10.4465 11.8651V7.48156H14.2201C14.5825 7.48156 14.881 7.77661 14.881 8.13488V16.1433H14.9023Z" fill="#2F2F36" /></svg></div>
          </div>
          <div className="telegram">
            <img src="/img/telegram.svg" width="20" height="20" alt="..." />
            <input placeholder="@UserName" className="social-input" value="" />
            <div className="_6ad855169c fce95a844a"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M18.6971 4.72076L14.4333 0.505796C14.1135 0.189673 13.6658 0 13.1967 0H11.214V3.56164C11.214 3.91992 10.9156 4.21496 10.5531 4.21496H4.94611C4.58368 4.21496 4.28521 3.91992 4.28521 3.56164V0H1.72687C0.7675 0 0 0.758693 0 1.70706V18.2929C0 19.2413 0.7675 20 1.72687 20H17.4819C18.4413 20 19.2088 19.2413 19.2088 18.2929V5.9431C19.2088 5.47945 19.0169 5.03688 18.6971 4.72076ZM14.9023 16.1433C14.9023 16.5016 14.6038 16.7966 14.2414 16.7966H4.94611C4.58368 16.7966 4.28521 16.5016 4.28521 16.1433V8.15595C4.28521 7.79768 4.58368 7.50263 4.94611 7.50263H8.74097V11.8862L7.5684 10.7271C7.44049 10.6006 7.24861 10.6006 7.12069 10.7271L6.35319 11.4858C6.22528 11.6122 6.22528 11.8019 6.35319 11.9283L9.38055 14.8999C9.50847 15.0263 9.70035 15.0263 9.82826 14.8999L12.8556 11.9073C12.9835 11.7808 12.9835 11.5911 12.8556 11.4647L12.0881 10.706C11.9602 10.5796 11.7683 10.5796 11.6404 10.706L10.4465 11.8651V7.48156H14.2201C14.5825 7.48156 14.881 7.77661 14.881 8.13488V16.1433H14.9023Z" fill="#2F2F36" /></svg></div>
          </div>
        </div>
      </div>
      <div className="tabs">
        <h2 onClick={favClick} className={`title ${fav}`}>Favourites</h2>
        <h2 onClick={mealClick} className={`title ${meal}`}>My meal plan</h2>
      </div>
      <div className="content">
        {fav === 'active' ? favData.map((favdata) => <RecipeCard id={favdata.id} url={`https://spoonacular.com/recipeImages/${favdata.id}-556x370.jpg`} title={favdata.title} summary={favdata.summary} dishType="dish type" preparationMinutes={favdata.readyInMinutes} key={favdata.id} />) : getMealPlan()}
      </div>
    </div>
  );
}

export default Profile;
