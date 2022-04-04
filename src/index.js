const express = require('express');
const bodyParser = require('body-parser');
const route = require('./route/route.js');
const  mongoose  = require('mongoose');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(
    "mongodb+srv://group36Database:mDNNlOLVCh1xWC8E@cluster0.ligis.mongodb.net/group36Database?retryWrites=true&w=majority",
    {
        useNewUrlParser: true
    })
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))


app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});