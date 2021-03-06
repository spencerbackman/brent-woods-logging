const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require("path");
const port = process.env.PORT || 4000;
const cors = require('cors');

require("dotenv").config();

app.use(express.static(path.join(__dirname, "client", "build")));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'));
app.use(cors());

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://spencer:${process.env.MongoPassword}@woodslogging-ke6ty.mongodb.net/test?retryWrites=true&w=majority/${process.env.MONGODB_KEY}`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/inventory', (req, res) => {
    return client.connect((err, db) => {
        if(err) { 
            res.status(500).send(err);
            throw err;
        }
        var dbo = db.db('inventory')
        dbo.collection('inventory').find({}).toArray((err, result) => {
            if(err) throw err;
            return res.status(200).send(result);
        })
    })
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})

app.listen(port, () => console.log(`Listening on port ${port}`))