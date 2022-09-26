const express = require('express');
const { Meals } = require('../../db/models');

const router = express.Router();

router.post('/mealSave/get', async (req, res) => {
  try {
    const { userId } = req.body;
    const userMeal = await Meals.findOne({ where: { userId }, raw: true });
    const meal = JSON.parse(userMeal.meal);
    res.status(200).send(meal);
  } catch (error) {
    console.log(error);
  }
});

router.post('/mealSave', async (req, res) => {
  try {
    const { userId, meals } = req.body;
    const meal = JSON.stringify(meals);
    const userMeal = await Meals.findOne({ where: { userId } });
    if (userMeal) {
      await userMeal.update({ userId, meal });
    } else {
      await Meals.create({ userId, meal });
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
