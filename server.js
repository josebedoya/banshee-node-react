const express = require('express');
const cors = require('cors');

const sequelize = require('./util/database');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3010;

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Models
const User = require('./models/user');
const Client = require('./models/client');
const Visit = require('./models/visit');
const Comment = require('./models/comment');
const Agent = require('./models/agent');
const Country = require('./models/country');
const State = require('./models/state');
const City = require('./models/city');

// Define Routes
app.use('/api/auth/', require('./routes/api/auth'));
app.use('/api/users/', require('./routes/api/users'));
app.use('/api/clients/', require('./routes/api/clients'));
app.use('/api/agents/', require('./routes/api/agents'));
app.use('/api/visits/', require('./routes/api/visits'));
app.use('/api/countries/', require('./routes/api/countries'));
app.use('/api/states/', require('./routes/api/states'));
app.use('/api/cities/', require('./routes/api/cities'));
app.use('/api/comments/', require('./routes/api/comments'));

// Create db relationships
Visit.belongsTo(Client, { constraints: false });
Visit.belongsTo(Agent, { constraints: false });
Comment.belongsTo(Visit, { constraints: false });
State.belongsTo(Country, { constraints: false });
City.belongsTo(Country, { constraints: false });
City.belongsTo(State, { constraints: false });
Client.belongsTo(Country, { constraints: false });
Client.belongsTo(State, { constraints: false });
Client.belongsTo(City, { constraints: false });
//
Visit.belongsTo(User, { constraints: false });
Comment.belongsTo(User, { constraints: false });
Client.belongsTo(User, { constraints: false });

sequelize
  .sync()
  .then(result => {
    //console.log(result);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.log(err);
  });
