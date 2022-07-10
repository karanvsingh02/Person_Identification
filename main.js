img = "";
status= "";
objects=[];
song = "";
song_status = "";

function preload(){
    song = loadSound('Alarm_sound.mp3');
}

function setup(){
    canvas = createCanvas(400, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400, 400);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    song_status = document.getElementById("status").innerHTML = "Status - Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(video, gotResult);
    //console.log("detecting video");
}

function draw(){
    image(video, 0, 0, 480, 400);

    //song_status = song.isPlaying();

    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++){
            //document.getElementById("status").innerHTML = "Status - Person Detected ";
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        
        if(objects[i].label == "person"){
            document.getElementById("status").innerHTML = "Status - Person is in the room";
            song.stop();
        }
        else{
            document.getElementById("status").innerHTML = "Status - Person is not in the room";
            song.play();
        }

        }

        }
    }

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

/*function play()
{
	song.play();
	song.setVolume(1);
	song.rate(1);
}*/