const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');

const router = express.Router();

router.post('/registration', async (req, res) => {
  try {
    // const regularka = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g;
    const { login, email, password } = req.body;
    // if (regularka.test(password)) {
    const hash = await bcrypt.hash(password, 10);
    const checkEmail = await User.findOne({ where: { email } });
    if (checkEmail) {
      return res.json({ message: 'Email address already exists' });
    }
    const newUser = await User.create({ login, email, password: hash });
    req.session.userId = newUser.id;
    req.session.save(() => {
      if (req.session.userId) {
        res.status(200).json(newUser);
        // res.redirect('http://localhost:3000/');
      }
    });
    // } else {
    //   res.sendStatus(400);
    // }
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.json({ message: 'User not found' });
    }
    const passCheck = await bcrypt.compare(password, user.password);
    if (!passCheck) {
      return res.json({ message: 'Invalid password' });
    }
    req.session.userId = user.id;
    req.session.save(() => {
      if (passCheck) {
        res.status(200).json(user);
      }
    });
  } catch (error) {
    res.json({ message: 'Server error' });
  }
});

router.get('/logout', async (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie('auth');
    res.status(200).end();
  } catch (error) {
    res.send(`Error ------> ${error}`);
  }
});

router.get('/checkSession', async (req, res) => {
  const { userId } = req.session;
  try {
    if (userId) {
      const checkSess = await User.findOne({ where: { id: userId } });
      if (checkSess) {
        res.json(checkSess);
      }
    }
  } catch (error) {
    res.end();
  }
});

router.post('/google', async (req, res) => {
  try {
    const { name, email, imageUrl } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      await User.create({ login: name, email, imageUrl });
    }
    req.session.userId = user.id;
    req.session.save(() => {
      res.status(200).json(user);
    });
    // } else {
    //   res.sendStatus(400);
    // }
  } catch (error) {
    res.sendStatus(500);
  }
});

// router.get('/logout', (req, res) => {
//   try {
//     if (req.session.newUser || req.session.user) {
//       req.session.destroy(() => {
//         res.clearCookie('OwlCookie');
//         res.redirect('/');
//       });
//     } else {
//       res.redirect('/');
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = router;
