var a=1,b=1;
var previous,next;
window.onload = function () {
    var button = document.getElementById("previewButton");
    button.onclick = previewHandler;

    previous=document.getElementById("previous");
    previous.onclick=previousCanvas;

    next=document.getElementById("next");
    next.onclick=nextCanvas;

    makeImage();
};

var x_position = new Array();
var y_position = new Array();
var r_w = new Array();//width or radius
var cir_sqr = new Array();
var txtClr = new Array();
var bckClr = new Array();
var tweetText = new Array();

function previewHandler() {
    a=1,b=1;

    var canvas = document.getElementById("tshirtcanvas");
    var context = canvas.getContext("2d");
    fillBackgroundColor(canvas, context);
    drawBird(canvas, context);

    var selectObj = document.getElementById("shape");
    var index = selectObj.selectedIndex;
    var shape = selectObj[index].value;

    cir_sqr.push(shape);

    if (shape == "squares") {
        for (var i = 0; i < 20; i++) {
            drawSquare(canvas, context);
        }
    }
    else if (shape == "circles") {
        for (var i = 0; i < 20; i++) {
            drawCircles(canvas, context);
        }
    }
    drawText(canvas, context);
}
function drawSquare(canvas, context) {
    var w = Math.floor(Math.random() * 40);
    var x = Math.floor(Math.random() * canvas.width);
    var y = Math.floor(Math.random() * canvas.height);
    // if(i==0){
    //     context.clearRect(0,0,600,200);
    // }
    x_position.push(x);
    y_position.push(y);
    r_w.push(w);

    context.fillStyle = "lightblue";
    context.fillRect(x, y, w, w);
}
function drawCircles(canvas, context) {
    var r = Math.floor(Math.random() * 20);
    var x = Math.floor(Math.random() * canvas.width);
    var y = Math.floor(Math.random() * canvas.height);

    x_position.push(x);
    y_position.push(y);
    r_w.push(r);

    context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI, false);
    context.fillStyle = "lightblue";
    context.fill();
}
function fillBackgroundColor(canvas, context) {
    var selectObj = document.getElementById("backgroundColor");
    var index = selectObj.selectedIndex;
    var bgColor = selectObj[index].value;

    bckClr.push(bgColor);

    context.fillStyle = bgColor;
    context.fillRect(0, 0, 600, 200);
}
function updateTweets(tweets) {
    var tweetSelection = document.getElementById("tweets");
    for (var i = 0; i < tweets.length; i++) {
        var tweet = tweets[i];
        var option = document.createElement("option");
        option.text = tweet.text;
        option.value = tweet.text;
        tweetSelection.options.add(option);
    }
    tweetSelection.SelectedIndex = 0;
}
function drawText(canvas, context) {
    var selectObj = document.getElementById("foregroundColor");
    var index = selectObj.selectedIndex;
    var fgColor = selectObj[index].value;

    txtClr.push(fgColor);

    context.fillStyle = fgColor;
    context.font = "bold 1em sans-serif";
    context.textAlign = "left";
    context.fillText("I saw this tweet", 20, 40);

    var tweetObj = document.getElementById("tweets");
    var indx = tweetObj.selectedIndex;
    var tweet = tweetObj[indx].value;

    tweetText.push(tweet);

    context.font = "italic 1.2em serif";
    context.textAlign = "left";
    // context.fillText(tweet,30,100);
    if (tweet.length > 60) {
        var tweetLines = splitIntoLines(tweet);
        for (var i = 0; i < tweetLines.length; i++) {
            context.fillText(tweetLines[i], 30, 70 + (i * 25));
        }
    }
    else {
        context.fillText(tweet, 30, 100);
    }

    context.font = "bold 1em sans-serif";
    context.textAlign = "right";
    context.fillText("and all I got was this lousy t-shirt!", canvas.width - 20, canvas.height - 40);
}
function drawBird(canvas, context) {
    var twitterBird = new Image();
    twitterBird.src = "images/twitterBird.png";
    twitterBird.onload = () => {
        context.drawImage(twitterBird, 20, 120, 70, 70);
    };
}
function splitIntoLines(str) {
    var strs = new Array();
    var space = str.indexOf(' ', 60);
    strs[0] = str.substring(0, space);
    strs[1] = str.substring(space + 1);
    if (strs[1].length > 60) {
        space = strs[1].indexOf(' ', 60);
        strs[2] = strs[1].substring(space + 1);
        strs[1] = strs[1].substring(0, space);
    }
    return strs;
}
function makeImage() {
    var canvas = document.getElementById("tshirtcanvas");
    canvas.onclick = function () {
        window.location = canvas.toDataURL("image/png");
    };
}

function previousCanvas()
{
    a+=20,b++;
    var previousCount=bckClr.length-b;
    if(previousCount<0){
        return 1;
    }
    next.style.backgroundColor="initial";
    previous.style,backgroundColor="white";
    drawAllThings(previousCount);
    if(previousCount==0){
        previous.style.backgroundColor="rgb(173, 170, 170)";
    }
}

function nextCanvas()
{
    a-=20,b--;
    var nextCount=bckClr.length-b;
    if(nextCount==bckClr.length){
        return 1;
    }
    previous.style.backgroundColor="initial";
    next.style.backgroundColor="white";
    drawAllThings(nextCount);
    if(nextCount==bckClr.length-1){
        next.style.backgroundColor="rgb(173, 170, 170)";
    }
}

//draw all things of previous or next canvas
function drawAllThings(count)
{
    var canvas=document.getElementById("tshirtcanvas");
    var context=canvas.getContext("2d");

    drawBird(canvas,context);
    context.fillStyle = bckClr[count];
    context.fillRect(0, 0, 600, 200);

    if(cir_sqr[count]=="circles"){
        for(var i=x_position.length-a,j=0;j<20;j++,i--){
            context.beginPath();
            context.arc(x_position[i], y_position[i],r_w[i], 0, 2 * Math.PI, false);
            context.fillStyle = "lightblue";
            context.fill();
        }
    }
    else if(cir_sqr[count]=="squares"){
        for(var i=x_position.length-a,j=0;j<20;j++,i--){ 
            context.fillStyle = "lightblue";
            context.fillRect(x_position[i], y_position[i], r_w[i], r_w[i]);
        }
    }
    context.fillStyle = txtClr[count];
    context.font = "bold 1em sans-serif";
    context.textAlign = "left";
    context.fillText("I saw this tweet", 20, 40);
    
    context.font = "italic 1.2em serif";
    context.textAlign = "left";
    var tweet=tweetText[count];
    if (tweet.length > 60) {
        var tweetLines = splitIntoLines(tweet);
        for (var i = 0; i < tweetLines.length; i++) {
            context.fillText(tweetLines[i], 30, 70 + (i * 25));
        }
    }
    else {
        context.fillText(tweet, 30, 100);
    }

    context.font = "bold 1em sans-serif";
    context.textAlign = "right";
    context.fillText("and all I got was this lousy t-shirt!", canvas.width - 20, canvas.height - 40);

}