const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use(bodyParser.json());

app.post('/api/check-response', (req, res) => {
  const { response } = req.body;
  if (response.toLowerCase() === 'sim') {
    res.json({ message: 'success' });
  } else {
    res.status(400).json({ message: 'error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
