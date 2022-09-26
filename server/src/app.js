/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();

const path = require('path');
const morgan = require('morgan');
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');

const { sequelize } = require('../db/models');

const authRoutes = require('./routes/authRoutes');
const FavRouter = require('./routers/FavRouter');
const sameMealRoute = require('./routes/saveMealRoute');

const app = express();

app.use(morgan('dev'));
// Чтобы наши статические файлы были видны браузеру, мы должны их подключить
app.use(express.static(path.join(__dirname, '../public/')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Выносим порт в .env и на всякий случай подставляем дефолтный через ||
const { PORT, SESSION_SECRET } = process.env;

const corsOptions = {
  credentials: true,
  origin: 'http://localhost:3000', // адрес сервера React
};
app.use(cors(corsOptions));

const sessionConfig = {
  name: 'auth',
  store: new FileStore(),
  secret: SESSION_SECRET ?? 'your key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 10,
    httpOnly: true,
  },
};

app.use(session(sessionConfig));

app.use('/api/v1', authRoutes);
app.use('/api/v1', sameMealRoute);
app.use('/api/v1', FavRouter);

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Соединение с базой установлено!');
  } catch (err) {
    console.log(err, 'Error!');
  }
  console.log(`Сервер поднят на ${PORT} порту!`);
});
