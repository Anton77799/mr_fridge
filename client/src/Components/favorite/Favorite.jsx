/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable prefer-rest-params */
import React, { useState, useEffect } from 'react';

export default function Favorite({ id, className }) {
  const [favValue, setFavValue] = useState(undefined);

  useEffect(() => {
    const getRecipe = async () => {
      // феч запрос на бэк - проверка, есть ли такой id у user_id в таблице UserFavs
      // если он есть возвращаем fav = true
      // если такой связи нет возвращаем fav = false
      // console.log('id in useEffect', id);
      try {
        const response = await fetch(`http://localhost:3100/api/v1/isFav/${id}`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-type': 'application/json' },
        });
        const result = await response.json();
        const favorite = result.fav;
        setFavValue(favorite);
      } catch (error) {
        console.log('check fromt error', error);
      }
    };
    getRecipe();
  }, [id]);

  const onToggle = async (newFav) => {
    // феч запрос на бэк - меняем значение fav, т.е. создание или удаление записи в бд
    const response = await fetch(`http://localhost:3100/api/v1/changeFav/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-type': 'application/json' },
    });

    if (response.status !== 200) {
      setFavValue(newFav);
    }
  };
  return favValue != null
    ? <ViewFavorite fav={favValue} onToggle={onToggle} className={className} />
    : <span>loading</span>;
}

function ViewFavorite({ fav, onToggle, className }) {
  const [viewFav, setViewFav] = useState(fav);

  useEffect(() => {
    setViewFav(fav);
  }, [fav]);

  const clickBtnHandler = () => {
    if (localStorage.getItem('isAuth')) {
      setViewFav(!viewFav);
      onToggle(!viewFav);
    } else {
      alert('Please, sing up if you want add meal to favorite');
    }
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {viewFav
        ? (
          <svg onClick={clickBtnHandler} id="removeToFav" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={`bi bi-star-fill ${className}`} viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>
        )
        : (
          <svg onClick={clickBtnHandler} id="addToFav" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={`bi bi-star ${className}`} viewBox="0 0 16 16">
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
          </svg>
        )}
    </>

  );
}
