var webpack = require("webpack");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var config = require("./webpack.config");
const bodyParser = require("body-parser");
var express = require("express");
var app = new (express)();
var port = 2406;

// connect to db
const dbConnectHandler = require("./backend/db/dbConnect");

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const routes = require("./backend/routes/api/routes")(app);

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/frontend/index.html");
});

app.listen(port, function(error) {
    if (error) {
        console.error(error);
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
    }
})

