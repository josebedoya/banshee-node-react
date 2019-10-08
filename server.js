const express = require('express');

const sequelize = require('./util/database');

const app = express();
const PORT = process.env.PORT || 3010;

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/clients/', require('./routes/api/clients'));
app.use('/api/agents/', require('./routes/api/agents'));
app.use('/api/visits/', require('./routes/api/visits'));
app.use('/api/countries/', require('./routes/api/countries'));
app.use('/api/states/', require('./routes/api/states'));
app.use('/api/cities/', require('./routes/api/cities'));
app.use('/api/comments/', require('./routes/api/comments'));

sequelize
  .sync()
  .then(result => {
    console.log(result);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.log(err);
  });
