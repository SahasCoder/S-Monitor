object = [];
status = "";
r = 0;
g = 0;
b = 0;

function preload(){
    siren = loadSound("LMWJXYS-cartoon-siren.mp3");
}

function setup(){
    canvas = createCanvas(640 , 420);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    objectDetector = ml5.objectDetector("cocossd" , modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects";
}

function modelLoaded(){
    console.log("Model loaded");
    status = true;
}

function draw(){
    image(video , 0 , 0 , 640 , 420);
    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video , gotResult);
        for(i = 0; i < object.length; i++){
            document.getElementById("status").innerHTML = "Status: objects detected";

            fill(r,g,b);
            text(object[i].label , object[i].x + 15 , object[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x , object[i].y , object[i].width , object[i].height);

            if(object[i].label == "person"){
                siren.stop();
                document.getElementById("babyStatus").innerHTML = "Baby found";
                document.getElementById("babyStatus").style.backgroundColor = "lightgreen";
                document.getElementById("babyStatus").style.color = "black";
            }
            else{
                siren.play();
                document.getElementById("babyStatus").innerHTML = "Baby not found";
                document.getElementById("babyStatus").style.backgroundColor = "red";
                document.getElementById("babyStatus").style.color = "white";
            }
        }
    }
}

function gotResult(error , results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        object = results;
    }
}