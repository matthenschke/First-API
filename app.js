//filereader setup
var fs = require('fs');
var data = fs.readFileSync('additional.json');
var afinnData = fs.readFileSync('afinn111.json');
var additional = JSON.parse(data);
var afinnWords = JSON.parse(afinnData);




//express and express packages setup
var express = require('express');
var app = express();
var bodyParser = require('body-parser');


//display files in the public directory
app.use(express.static('public'));

//use body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

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
    additional[word] = score;
    var data = JSON.stringify(additional, null, 2);
    fs.writeFile('additional.json', data, finished);
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
//route to handle post request
app.post('/analyze', analyzeThis);
function analyzeThis(req, res){
    var text = req.body.text;
    var words = text.split(/\W/);
    var totalScore = 0;
    var scoreWords = []
    for (var i = 0; i < words.length; i++){
        var word = words[i].toLowerCase();
        var wordScore = 0;
        var found = false;
        if (additional.hasOwnProperty(word)){
            wordScore = Number(additional[word]);
            found = true;
            
        }
        else if (afinnWords.hasOwnProperty(word)){
            wordScore = Number(afinnWords[word]);
            found = true;
        }
        if (found){
            scoreWords.push({word : word, score: wordScore});    
        }
            totalScore += wordScore;
              
    }
    var comp = totalScore / words.length;
    var reply = {
        score : totalScore,
        comparative: comp,
        words: scoreWords
    };
    res.send(reply);
    
}

//view specific queried entry
app.get('/search/:word/', searchWord);

function searchWord(req, res){
    var data = req.params;
    var word = data.word;
    var reply;
    if (additional[word]){
        reply = {
            status : "found",
            word: word,
            score : additional[word]
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
    var data = {
        additional : additional,
        afinn : afinnWords
    };
    res.send(data);
}

