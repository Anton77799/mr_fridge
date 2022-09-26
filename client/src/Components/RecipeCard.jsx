/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import './recipeCardCSS.css';
import Favorite from './favorite/Favorite';

function RecipeCard({
  id, url, title, dishType, preparationMinutes, likes,
}) {
  return (
    <div className="recipe-card">
      <figure className="card-bg-transparent">
        <Link to={`/recipe/${id}`}>
          {url
            ? <img src={url} alt="..." />
            : <img src="https://spoonacular.com/recipeImages/471334-312x231.jpg" alt="..." />}
        </Link>
      </figure>

      <div className="card-meta">
        <p className="dish-type">{dishType || 'dish type'}</p>

        <ul className="dish-stats">
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
              <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
            </svg>
            {preparationMinutes}
            min
          </li>
          {/* <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
            </svg>
            {likes}
          </li> */}
          <li>
            <Favorite id={id} className="svg-small" />
          </li>
        </ul>
      </div>
      <h1>{title}</h1>
    </div>
  );
}

export default RecipeCard;
