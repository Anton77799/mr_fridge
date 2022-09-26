/* eslint-disable func-names */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addIng } from '../../store/action';
import Ingridient from '../../Components/Ingridient';
import Loader from '../../Components/Loader';
import './refCss.css';
import RecipeCard from '../../Components/RecipeCard';
import { keys } from '../api_keys';

function Refrigirator() {
  // const apiKey = 'aa844e1894b74bc2a3e672c59f887e64';
  const dispath = useDispatch();
  const [ingridientsValue, setingridientsValue] = useState({ ingridient: '' });
  const [ingridients, setIngridients] = useState({ isLoad: true, ingridients: [] });
  const [recipes, setRecipes] = useState([]);
  const ingCash = useSelector((store) => store.ingCash);
  const fridge = useSelector((store) => store.fridge);
  let handleChange = (event) => {
    setingridientsValue({ ...ingridientsValue, [event.target.name]: event.target.value });
  };
  const debounce = (fn, ms) => {
    let timeout;
    return function () {
      const fnCall = () => { fn.apply(this, arguments); };
      clearTimeout(timeout);
      timeout = setTimeout(fnCall, ms);
    };
  };
  handleChange = debounce(handleChange, 1000);
  useEffect(() => {
    const getIngridients = async () => {
      if (ingridientsValue.ingridient) {
        if (ingCash[ingridientsValue.ingridient]) {
          setIngridients({ isLoad: true, ingridients: ingCash[ingridientsValue.ingridient] });
        } else {
          setIngridients({ isLoad: false, ingridients: [] });
          const ingridientsReq = await fetch(`https://api.spoonacular.com/food/ingredients/search?query=${ingridientsValue.ingridient}&apiKey=${keys.apiKey3}`);
          const ingridientRes = await ingridientsReq.json();
          dispath(addIng(ingridientRes.results, ingridientsValue.ingridient));
          setIngridients({ isLoad: true, ingridients: ingridientRes.results });
        }
      }
    };
    getIngridients();
  }, [ingridientsValue]);
  useEffect(() => {
    const getIngNames = () => {
      const namesArr = fridge.map((ing) => ing.name);
      return namesArr.join(',');
    };
    const getRecipes = async () => {
      if (fridge.length >= 1) {
        const recipesReq = await fetch(`https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${getIngNames()}&sortDirection=desc&addRecipeInformation=true&number=10&apiKey=${keys.apiKey3}`);
        const recipesRes = await recipesReq.json();
        setRecipes(recipesRes.results);
      }
    };
    getRecipes();
  }, [fridge]);
  return (
    <div className="wrapper">
      <div className="ref-container">
        <div className="my-ref col-md-6 col-sm-6 col-6">
          <h4 className="title"> What is in my fridge?</h4>
          <div className="friedge">
            {fridge.map((ingridient) => <Ingridient ingData={ingridient} isAdd={ingridient.isAdd} key={ingridient.id} />)}
          </div>
        </div>
        <div className="ingridients col-md-6 col-sm-6 col-6">
          <h4 className="title">Here you can search and add ingridients to fridge</h4>
          <div className="col-md-6 mb-4 ing">
            <img src="/img/search.svg" width="20" height="20" alt="..." />
            <input
              name="ingridient"
              type="text"
              className="ing_input"
              placeholder="Search for ingridient"
              onChange={handleChange}
            />
          </div>
          <div className="ingridients-list">
            {
                ingridients.isLoad ? (
                  ingridients.ingridients.map((ingridient) => <Ingridient ingData={ingridient} key={ingridient.id} />)
                )
                  : <Loader />
            }
          </div>
        </div>
      </div>
      <h2 className="title">Get the recipes</h2>
      <h3 className="title">{recipes.length > 0 ? '10 recipes sorted by quantity of ingredients' : 'Here would be 10 recipes sorted by quantity of ingredients'}</h3>
      <div className="recipes col-md-12">
        <div className="recipes">
          {recipes.map((recipe) => <RecipeCard id={recipe.id} url={recipe.image} title={recipe.title} summary={recipe.summary} dishType={recipe.dishTypes.at(0)} preparationMinutes={recipe.readyInMinutes} key={recipe.id} />)}
        </div>
      </div>
    </div>
  );
}

export default Refrigirator;
