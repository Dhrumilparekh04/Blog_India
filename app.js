//Frameworks
const express = require('express');

//middle ware used to which log url requests methods and timestamps in terminal
const morgan = require('morgan');

//we will mongoose to connect to MONGODB database 
const mongoose = require('mongoose');

//blogRoutes
const blogRoutes = require('./routes/blogRoutes')


//express app
const app = express(); 

//mongodb atlas user
const dbURI = 'mongodb+srv://dp04:demo123@cluster0.ffdce1w.mongodb.net/LearnNode?retryWrites=true&w=majority';

//METHOD PROVIDED BY MONGOOSE TO CONNECT TOO DATABASE 
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {

        //LISTENS FOR REQUEST AS SOON AS DATABASE IS CONNECTED TO SERVER!!! 
        app.listen(3000);
        console.log('Connected to the database and server is running on port 3000');
    })
    .catch((err) => {
        console.log(err);
    });


app.set('view engine', 'ejs');

 

// INBUILT MIDDLEWARE USED TO ACCESS STATIC FILE SUCH AS 
// IMAGES,CSS StyleSheet, ETC ETC
app.use(express.static('public'));

//FORM DATA FROM CREATE BLOG COMES AS POST REQUEST
app.use(express.urlencoded({ extended: true }));

//MIDDLEWARE USED TO LOG VALUE INTO TERMINAL BELOW SUCH AS URL METHOD,TIMESTAMP,....
app.use(morgan('tiny'));

//Basic routes
app.get('/', (req,res) => {
   res.redirect('/blogs');
});



app.get('/about', (req,res) => { 
    res.render('about', {title: 'About'})
});


//blog routes
app.use('/blogs',blogRoutes);


app.use((req,res) => {
    res.status(404).render('error', {title: '404'})
});


