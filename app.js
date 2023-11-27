const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

const users_router = require('./routes/users.routes.js')
const data_router = require('./routes/data.routes.js')
const api_router = require('./routes/api.routes.js')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/users',users_router)
app.use('/data',data_router)
app.use('/api',api_router)

app.listen(process.env.PORT || 3001, () => {
  console.log("run on port 3001");
});

// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.static(path.join(__dirname, "/client/build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});