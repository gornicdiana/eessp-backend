var express = require('express');
const cors = require('cors');
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var port = process.env.PORT || 5010;

app.use(bodyParser.json());
app.use(cors({origin: '*'}));
app.use(bodyParser.urlencoded({extended: false}));

const mongoURI = 'mongodb+srv://eessp:eessp@eessp.xgobfl2.mongodb.net/?retryWrites=true&w=majority';


mongoose.connect(mongoURI, {useNewUrlParser: true}).then(() => console.log("MongoDB connected")).catch(err => console.log(err));

var Pacients = require('./routes/Pacients');
var Doctors = require('./routes/Doctors');
var Raports = require('./routes/Raports');

app.use('/pacients', Pacients);
app.use('/doctors', Doctors);
app.use('/raports', Raports);

app.listen(port, () => {
    console.log("Server is running on port: " + port);
})
