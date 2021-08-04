require('dotenv').config();
const express = require('express');

const { envConstants: { PORT } } = require('./constants');

const app = express();

app.listen(PORT, () => {
  console.log(`App listen ${PORT}`);
})