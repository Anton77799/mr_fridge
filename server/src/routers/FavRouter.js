const express = require('express');
const { UserFav } = require('../../db/models');

const {
  checkFav, toggleFav,
} = require('../controllers/FavController');

const router = express.Router();

router.post('/getUserFav', async (req, res) => {
  try {
    const { userId } = req.body;
    const rawFav = await UserFav.findAll({ where: { user_id: userId }, raw: true });
    const favIds = rawFav.map((fav) => fav.recipe_id);
    res.status(200).send(favIds);
  } catch (error) {
    console.log(error);
  }
});

router.route('/isFav/:id')
  .get(checkFav);

router.route('/changeFav/:id')
  .get(toggleFav);

module.exports = router;
