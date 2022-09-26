/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch } from 'react-redux';
import { addToFridge, removeFromFridge } from '../store/action';
import './ingCSS.css';

function Ingridient({ ingData, isAdd }) {
  const dispatch = useDispatch();
  return (
    <div draggable className="ingridient-item col-md-3 col-sm-5 col-12">
      <div className="ingridient-content">
        <img src={`https://spoonacular.com/cdn/ingredients_100x100/${ingData.image}`} alt="" />
        <figcaption>{ingData.name}</figcaption>
      </div>
      {isAdd ? (
        <button type="button" className="add btn btn-danger" onClick={() => dispatch(removeFromFridge(ingData.id))}>Remove</button>
      ) : (
        <button type="button" className="add btn btn-success" onClick={() => dispatch(addToFridge({ ...ingData, isAdd: true }))}>Add</button>
      )}
    </div>
  );
}

export default Ingridient;
