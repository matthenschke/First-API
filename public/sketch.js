
function setup() {
        createCanvas(400,400); //there will not be a canvas in the index.html
        drawData();
        console.log('running');
        //getting access to button in index.html
}
function drawData(){
    //load API
    loadJSON('all', gotData); // first parameter is the entire JSON API
}
function gotData(data){
    background(51);
    console.log(data);
    
    //Iterate through API
    var keys = Object.keys(data);
    keys.forEach(function(word){
        var score = data[word];
        var x = random(width);
        var y = random(height);
        fill(255);
        textSize(16);
        text(word,x,y);
    });



}


function draw(){
    
}