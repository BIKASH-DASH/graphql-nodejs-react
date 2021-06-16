const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose')

const app = express();

mongoose.connect('mongodb+srv://bikash:2MVmm*.m6GmeZKK@cluster0.adpaz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
mongoose.connection.once('open',()=>{
    console.log('connection to the database');
})

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});