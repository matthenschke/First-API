//filereader setup
var fs = require('fs');
var data = fs.readFileSync('words.json');
var words = JSON.parse(data);


//express and express packages setup
var express = require('express');
var app = express();


//display files in the public directory
app.use(express.static('public'));


//server setup
var server = app.listen(8000, function(){
    console.log('App is running');
});

//routes setup

//route to add entry to API
app.get('/add/:word/:score?/', addWord);
function addWord(req, res){
    //extracting parameters
    var data = req.params;
    var word = data.word;
    var score = Number(data.score);
    var reply;

    if(!score){
         reply = {
            msg : "Score is required"
        };
    }
    else {
    //adding entry to API
    words[word] = score;
    var data = JSON.stringify(words, null, 2);
    fs.writeFile('words.json', data, finished);
    function finished(err){
        console.log('Finished writing to file');
        reply = {
            word: word,
            score: score,
            status : 'success',
            msg : "Thank you for your word."
            
        };
        res.send(reply);
    }
    }

     
}

//view specific queried entry
app.get('/search/:word/', searchWord);

function searchWord(req, res){
    var data = req.params;
    var word = data.word;
    var reply;
    if (words[word]){
        reply = {
            status : "found",
            word: word,
            score : words[word]
        };
    }
    else{
        reply = {
            status : "Not found",
            word : word       
         };
        }
        
        res.send(reply);
    }
    



//view all API entries
app.get('/all', sendAll);

function sendAll(req, res){
    res.send(words);
}

