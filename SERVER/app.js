
const express = require("express");
const cors = require("cors");
const authRouter = require("./src/routes/authRouter");
const episodeRouter = require("./src/routes/episodeRouter");
const characterRouter = require("./src/routes/characterRouter");
const methodOverride = require('method-override');

const app = new express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded( {extended : true} ));
app.use(methodOverride('_method'))
app.use('/auth',authRouter);
app.use('/episodes',episodeRouter);
app.use('/characters',characterRouter);

const port = 8000;
app.listen(port,() => console.log(`Listening on ${port}`));