/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';

import { useParams, Link } from 'react-router-dom';
import Loader from '../../Components/Loader';
import './OneMeal.css';
import Favorite from '../../Components/favorite/Favorite';
/* eslint-disable react/prop-types */
import { keys } from '../api_keys';

function OneMeal() {
  const params = useParams();
  const [ThisRec, setThisRec] = useState({});
  const [Ingr, setIngr] = useState([]);

  const [Nutr, setNutr] = useState([]);
  const [Sim, setSim] = useState(0);
  const [Equ, setEqu] = useState({});

  const [Load, setLoad] = useState(false);

  const [BNutr, setBNutr] = useState(false);
  const [BEqu, setBEqu] = useState(false);

  // const apiKey = 'dd392776e3a64eef8ead31612c0fa87a'; // Ключ Антона
  // const apiKey = 'eb668d0ba9a74900b0d10015bd11fd21'; // Запасной ключ
  // fetch запрос от сервера
  const { id } = params;
  const url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${keys.apiKey4}`;
  const urlSim = `https://api.spoonacular.com/recipes/${id}/similar?apiKey=${keys.apiKey4}`;
  const urlEqu = `https://api.spoonacular.com/recipes/${id}/equipmentWidget.json?apiKey=${keys.apiKey4}`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const ThisIngr = Ingr?.map((el) => (
    <td>
      <div className="this">
        {el.image !== null && el.image !== 'no.jpg' && el.image !== 'no.png'
          ? <img src={`https://spoonacular.com/cdn/ingredients_100x100/${el.image}`} className="strange" alt="" />
          : <img src="https://spoonacular.com/recipeImages/471334-312x231.jpg" className="ingImg strange" alt="" />}
      </div>
      <div className="ourname alal">
        {el.name}
        {' '}
      </div>
      {' '}
      {el.measures.metric.unitShort !== ''
        ? (
          <div className="ourname">
            {el.measures.metric.amount}
            {' '}
            {el.measures.metric.unitShort}
          </div>
        )
        : (
          <div className="ourname">
            {el.measures.metric.amount}
            {' item'}
          </div>
        )}
    </td>
  ));

  const ThisEqu = Equ.equipment?.map((el) => (
    <td>
      <div className="eqname">
        {el.name}
        {' '}
      </div>
      {el.image !== null && el.image !== 'no.png' && el.image !== 'no.jpg'
        ? <img src={`https://spoonacular.com/cdn/equipment_100x100/${el.image}`} className="strange" alt="" />
        : <img src="https://spoonacular.com/recipeImages/471334-312x231.jpg" className="ingImg strange" alt="" />}
    </td>
  ));

  const OneBreakfast = async () => {
    try {
      const response = await fetch(url, options);
      const responseSim = await fetch(urlSim, options);
      const responseEqu = await fetch(urlEqu, options);

      const recipeDef = await response.json();
      const recipeSim = await responseSim.json();
      const recipeEqu = await responseEqu.json();
      const recipe = {
        id: recipeDef.id,
        title: recipeDef.title,
        timeOfCook: recipeDef.readyInMinutes,
        servings: recipeDef.servings,
        image: recipeDef.image,
        instructions: recipeDef.instructions?.replace(/<\/?[^>]+(>|$)/g, ''),
        analyzedInstructions: recipeDef.analyzedInstructions,
      };

      const newId = recipeSim[0].id;
      setIngr(recipeDef.extendedIngredients);

      setSim(newId);
      setThisRec(recipe);
      setNutr(recipeDef.nutrition.nutrients);
      setEqu(recipeEqu);
      setLoad(true);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    OneBreakfast();
  }, []);

  useEffect(() => {
    OneBreakfast();
  }, [id]);

  return (
    Load
      ? (
        <div className="full">
          <div className="card mb-3" width="540px;">
            <div className="row g-0">
              <div className="col-md-4 align-self-center">
                {ThisRec.image
                  ? <img src={ThisRec.image} className="img-fluid rounded-start mainImg" alt="..." />
                  : <img src="https://spoonacular.com/recipeImages/471334-312x231.jpg" className="img-fluid rounded-start mainImg" alt="..." />}
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title">{ThisRec.title}</h5>
                    <div>
                      <Favorite id={id} className="svg-big" />
                    </div>
                  </div>
                  <p className="card-text align-justify">{ThisRec.instructions}</p>
                  <p className="card-text">
                    Сooking time:
                    {' '}
                    {ThisRec.timeOfCook}
                    {' '}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Servings:
                      {' '}
                      {ThisRec.servings}
                    </small>
                  </p>
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between flex-wrap">
                        {ThisIngr}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="baton d-flex justify-content-between">
            <td>
              <button type="button" onClick={() => { setBNutr(true); setBEqu(false); }} className="btn btn-info nutrition">Calories</button>
            </td>
            <td>
              <button type="button" onClick={() => { setBNutr(false); setBEqu(true); }} className="btn btn-info equipment">Equipment</button>
            </td>
            <td>
              <Link to={`/recipe/${Sim}`}>
                <button type="button" onClick={() => { setLoad(false); setBNutr(false); setBEqu(false); }} className="btn btn-info taste" textDecoration="none">Similar</button>
              </Link>
            </td>
          </div>
          <div className="extra">
            {BNutr
              ? (
                <div className="card">
                  <div className="card-body">
                    Calories:
                    {' '}
                    {Nutr[0].amount}
                    {Nutr[0].unit}
                  </div>
                  <div className="card-body">
                    Carbs:
                    {' '}
                    {Nutr[3].amount}
                    {Nutr[3].unit}
                  </div>
                  <div className="card-body">
                    Fat:
                    {' '}
                    {Nutr[1].amount}
                    {Nutr[1].unit}
                  </div>
                  <div className="card-body">
                    Protein:
                    {' '}
                    {Nutr[8].amount}
                    {Nutr[8].unit}
                  </div>
                </div>
              )
              : <div />}
            {BEqu
              ? (
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">{ThisEqu}</p>
                  </div>
                </div>
              )
              : <div />}
          </div>
        </div>
      )
      : <Loader />

  );
}

export default OneMeal;
