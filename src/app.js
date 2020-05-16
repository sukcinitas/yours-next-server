const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(require('./routes'));

app.listen(process.env.PORT || 8081, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on port 8081, sweetheart!');
});
