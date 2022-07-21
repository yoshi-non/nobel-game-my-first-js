

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// ーーーーーーーコメント内容ーーーーーーーーーーーーーーーーーーーーーーー

var sentences = [
"『今日夜ご飯食べた？』",
"『え？食べたの・・・』",
"『どこで食べてきたの？』",
"『るしあ作っておいたのに・・・』",
"『どこで・・・誰と食べてきたの？』",
"『一人？』",
"『別の女の匂いがするのです』",
"『別の女の匂いがするのですよ』"
];

// ーーーーーーーコメントオーディオーーーーーーーーーーーーーーーーーーーーーーー

 var audios = [
"../music/rusia-01.mp4",
"../music/rusia-02.mp4",
"../music/rusia-03.mp4",
"../music/rusia-04.mp4",
"../music/rusia-05.mp4",
"../music/rusia-06.mp4",
"../music/rusia-07.mp4",
"../music/rusia-08.mp4"
];

var audioIndex = 0;

var caudio = new function () {
    this.render = function () {
    audio.src = audios[audioIndex];
    audio.play();
    }
}

// ーーーーーーーー背景ーーーーーーーーーーーーーーーーーーーーーー

var bgImage = new function() {
  this.x = 0;
  this.y = 0;
  this.width = canvas.width;
  this.height = canvas.height;

  this.loadImage = function() {
    this.image = new Image();
    this.image.src = "../images/room.jpg";
    this.image.onload = loader;
  }

  this.render = function() {
  ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

// ーーーーーーー人物画像ーーーーーーーーーーーーーーーーーーーー

var personImage1 = new function () {
  this.y = 40;
  this.height = canvas.height;
  this.width = canvas.width * 0.6;
  this.x = (canvas.width / 2 - this.width / 2)-350;

  this.loadImage = function() {
    this.image = new Image();
    this.image.src = "../images/rusia-001.png";
    this.image.onload = loader;
  }

  this.render = function () {
  ctx.drawImage(this.image, this.x, this.y, this.width*2.4, this.height);
  }
}

var personImage2 = new function () {
  this.y = 40;
  this.height = canvas.height;
  this.width = canvas.width * 0.6;
  this.x = (canvas.width / 2 - this.width / 2)-350;

  this.loadImage = function() {
    this.image = new Image();
    this.image.src = "../images/rusia-002.png";
    this.image.onload = loader;
  }

  this.render = function () {
  ctx.drawImage(this.image, this.x, this.y, this.width*2.4, this.height);
  }
}


// ーーーーーーメッセージBOXーーーーーーーーーーーーーーーーーーー

var messageBox = new function () {
  this.x = 20;

  this.loadImage = function () {
    this.image = new Image();
    this.image.src = "../images/msgbox_name.png";
    this.image.onload = loader;
  }

  this.render = function () {

    this.aspect = this.image.width / this.image.height;

    this.width = canvas.width-40;
    this.height = canvas.height / this.aspect;

    this.marginBottom = 0;
    this.y = canvas.height - 50 - this.height - this.marginBottom;

    ctx.drawImage(this.image, this.x, this.y, this.width, this.height+40);
  }
}

// ーーーーーーーーーコメントが一定量超えたら改行ーーーーーーーーーーーーーー

var sentenceIndex = 0;

var myText = new function () {
    this.render = function () {
    var messageBoxInnerWidth = messageBox.width - 40;
    var messagePaddingTop = 290;
    var s = "";
    var sentenceArray = sentences[sentenceIndex].split("");
    var kaigyouHeight = 0;

    for (var i = 0; i < sentenceArray.length; i++) {
      s += sentenceArray[i];
      var textWidth = ctx.measureText(s).width;
      console.log(textWidth);
      console.log(s);

      if(messageBoxInnerWidth < textWidth + 70){
        ctx.fillText(s, 36, messageBox.height + kaigyouHeight + messagePaddingTop);

        kaigyouHeight += 50;
        s = "";
      }
    }

  ctx.fillStyle = "#fff";
  ctx.font = "33px serif";
  ctx.textAlign = "left";

  ctx.fillText(s, 50, messageBox.height + kaigyouHeight + messagePaddingTop);
  }
}
// ーーーーーーーーー画像を読み込む順番ーーーーーーーーーーーーーーー

var Loader = function(expectedCnt, callback) {
  var cnt = 0;
  return function() {
    cnt++;
    if(cnt == expectedCnt){
      callback();
    }
  }
}

var loader = Loader(3, function () {
  console.log("load complete");

  bgImage.render();
  personImage1.render();
  messageBox.render();

});

// ーーーーーーーーークリック機能(if文分岐)ーーーーーーーーーーーーーーーーーーー

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if(sentenceIndex > sentences.length - 1){
    bgImage.render();
    alert("出来た!");
    location.reload();
  }if (sentenceIndex > sentences.length - 5) {
    bgImage.render();
    personImage2.render();
    messageBox.render();
    myText.render();
    sentenceIndex++;
    caudio.render();
    }else{
      bgImage.render();
      personImage1.render();
      messageBox.render();
      myText.render();
      caudio.render();
      sentenceIndex++;
    }
    audioIndex++;
}

canvas.addEventListener('click', update, false);

// ーーーーーーーー以下functionーーーーーーーーーーーーーーーーーー

bgImage.loadImage();
personImage1.loadImage();
personImage2.loadImage();
messageBox.loadImage();

// ーーーーーーーーauto機能ーーーーーーーーーーーーーーーーーー

 let count = 0;
  const countUp = () =>{
    console.log(count++);
  }
  const intervalId = setInterval(() =>{
    countUp();
    if(count > 5){　
      clearInterval(intervalId);
    }}, 1000);
