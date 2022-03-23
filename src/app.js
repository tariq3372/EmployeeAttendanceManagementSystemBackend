// Requiring 
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const { PORT, MONGO_URL } = process.env

app = express();

// APP.USE
app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// APP.SET
app.set('port', process.env.PORT || 4000);

// Establishing DB connection
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// Creating http server which will listen on port 3000
const http = require('http').createServer(app);
http.listen(PORT, () => {
    console.log(`server is listening on port ${PORT} `)
});

// Requiring Routes
require('./routes/mainRoutes')(app);