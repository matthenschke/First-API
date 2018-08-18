var socket;
function setup() {
        var cnv = createCanvas(500, 500);
        var x = (windowWidth - width) / 2;
        var y = (windowHeight - height) / 2;
        cnv.position(x, y);
        background(255, 0, 200);
        
        socket = io.connect('http://localhost:8000');
        socket.on('mouse', newDrawing);
      }

//function that mirrors drawing in other connections to socket
function newDrawing(data){
    noStroke();
    fill(255,0,100); 
    ellipse(data.x, data.y, 60, 60);

}
function mouseDragged(){
    console.log('Sending ' + mouseX + ','+ mouseY);

    var data = {
        x: mouseX,
        y: mouseY
    };
    socket.emit('mouse', data);
    
    
    noStroke();
    fill(150); 
    ellipse(mouseX, mouseY, 60, 60);
}
function draw(){
    
}