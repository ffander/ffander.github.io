/* Schedule toggler */

var toggleschedule = document.querySelector('#toggleschedule');
var togglescheduletext = toggleschedule.querySelector('#tstext');
var togglescheduleicon = toggleschedule.querySelector('#tsicon');
var schedule = document.querySelector('.schedule');
var scheduleshowing = false;

toggleschedule.onclick = function () {
  if (!scheduleshowing) {
    schedule.style.maxHeight = '999px';
    togglescheduletext.innerText = "Hide";
    togglescheduleicon.classList.remove("fa-angle-down");
    togglescheduleicon.classList.add("fa-angle-up");
  } else {
    schedule.style.maxHeight = '0';
    togglescheduletext.innerText = "Show";
    togglescheduleicon.classList.remove("fa-angle-up");
    togglescheduleicon.classList.add("fa-angle-down");
  }
  scheduleshowing = !scheduleshowing;
};

/* Cards link handling */

var fta = document.querySelector('#fta');
var ltj = document.querySelector('#ltj');
var prequel = document.querySelector('#prequel');
var torben = document.querySelector('#torben');
var gibin = document.querySelector('#gibin');
var native = document.querySelector('#native');

fta.onclick = function () {
  window.open('https://rocketradiolive.com/from-the-archive/');
};

ltj.onclick = function () {
  window.open('https://rocketradiolive.com/broadcast/ulosecontrol-008');
};

prequel.onclick = function () {
  window.open('https://rocketradiolive.com/broadcast/special-096-w-prequel-rhythm-section');
};

torben.onclick = function () {
  window.open('https://www.facebook.com/RocketRadioLive/videos/865899650251164/');
};

gibin.onclick = function () {
  window.open('https://rocketradiolive.com/broadcast?category=Mellow+Out');
};

native.onclick = function () {
  window.open('https://rocketradiolive.com/broadcast/rr-x-fat-fat-fat-2018-w-native');
};

/* Player canvas */

document.addEventListener("DOMContentLoaded", function (event) {

  var player = document.player = {};
  player.playing = false;
  player.enabled = false;
  player.audio = document.querySelector('audio');

  //do work
  var playerInfo = document.querySelector('.playerinfo');
  var canvas = document.querySelector("#playerCanvas");
  var box = document.querySelector('.playerbox');
  var context = canvas.getContext("2d");

  player.enable = function () {
    playerCanvas.classList.remove('disabled');
    player.enabled = true;
    playerInfo.addEventListener('mouseenter', fadePlayerInfo);
    fadeInTitle();
  };

  function fadePlayerInfo() {
    playerInfo.classList.add('playerinfofade');
    window.setTimeout(() => {
      playerInfo.classList.add('playerinfohide');
    }, 1100);
  }

  player.disable = function () {
    playerCanvas.classList.add('disabled');
    if (player.playing) {
      player.playPause();
    }
    player.enabled = false;
    playerInfo.classList.remove('playerinfofade');
    playerInfo.classList.remove('playerinfohide');
    playerInfo.removeEventListener('mouseenter', fadePlayerInfo);
    fadeOutTitle();
  };

  player.playPause = function () {
    if (player.enabled) {
      playerInfo.classList.add('playerinfofade');
      if (!player.playing) {
        player.audio.volume = 0;
        fadein(player.audio);
        playAnimation(player.pathContainer);
      } else {
        fadeout(player.audio);
        pauseAnimation(player.pathContainer);
      }
      player.playing = !player.playing;
    }
  };

  if ('mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler('play', function () {
      player.playPause();
    });
    navigator.mediaSession.setActionHandler('pause', function () {
      player.playPause();
    });
  }

  function fadein(audio) {
    var playPromise = audio.play();
    if (playPromise != undefined) {
      playPromise.then(() => {
        audio.volume = 0;
        var fade = setInterval(() => {
          if (audio.volume + 0.1 < 1) {
            audio.volume += 0.1;
          } else {
            audio.volume = 1;
            clearInterval(fade);
          }
        }, 500);
        //test
        if ('mediaSession' in navigator) {

          navigator.mediaSession.metadata = new MediaMetadata({
            title: 'ROCKET Radio x FAT FAT FAT Festival 2018',
            artist: playingartist,
            album: 'Live from the Garden Stage',
            artwork: [{ src: '/lib/ffflogo19-2.png', sizes: '96x96', type: 'image/png' }, { src: '/lib/ffflogo19-2.png', sizes: '128x128', type: 'image/png' }, { src: '/lib/ffflogo19-2.png', sizes: '192x192', type: 'image/png' }, { src: '/lib/ffflogo19-2.png', sizes: '256x256', type: 'image/png' }, { src: '/lib/ffflogo19-2.png', sizes: '384x384', type: 'image/png' }, { src: '/lib/ffflogo19-2.png', sizes: '512x512', type: 'image/png' }]
          });
        }
        //
      }).catch(e => {
        console.log(e);
      });
    }
  }

  function fadeout(audio) {
    var fade = setInterval(() => {
      if (audio.volume - 0.1 > 0) {
        audio.volume -= 0.1;
      } else {
        audio.volume = 0;
        clearInterval(fade);
      }
    }, 100);
    var out = setTimeout(() => {
      audio.pause();
    }, 2000);
  }

  var vw = canvas.width = 230;
  var vh = canvas.height = 230;

  var orangeL1 = "M20.2,28.4c40.6-87.9,264.7,50.5,189.5,117.8c-31.5,28.1-99.2,75.6-142.5,51.8c-26.2-14.4-30.8-42.3-36-69.1 C25.4,98.8,9.3,57.9,20.2,28.4C28.1,11.2,19.1,31.3,20.2,28.4z";
  var orangeR1 = "M20.2,28.4c40.6-87.9,264.7,50.5,189.5,117.8c-31.5,28.1-99.2,75.6-142.5,51.8c-26.2-14.4-30.8-42.3-36-69.1 C25.4,98.8,9.3,57.9,20.2,28.4C28.1,11.2,19.1,31.3,20.2,28.4z";
  var orangeL2 = "M43.2,28.4c32.3-46.2,59.6-12.1,60.6,88.8c0.3,33.7,24.8,86.3-27.7,85.2C46.3,201.8,54,155,48.8,128.2 C43,98.2,32.3,57.9,43.2,28.4C51.1,11.2,42.1,31.3,43.2,28.4z";
  var orangeR2 = "M141.1,30.2c14.7-47.3,49.4-17.5,56,34.3c4.4,34.7,8,154.8-40.3,135.3c-18.8-7.6-14.6-47.6-14.7-51	c-0.3-11-2-40-2.7-73.3C139.1,56.7,140.1,33.1,141.1,30.2z";

  var redL1 = "M14.2,36.5c40.6-87.9,264.7,50.5,189.5,117.8c-31.5,28.1-99.2,75.6-142.5,51.8c-26.2-14.4-30.8-42.3-36-69.1 C19.4,106.9,3.3,66,14.2,36.5C22.1,19.4,13.1,39.4,14.2,36.5z";
  var redR1 = "M14.2,36.5c40.6-87.9,264.7,50.5,189.5,117.8c-31.5,28.1-99.2,75.6-142.5,51.8c-26.2-14.4-30.8-42.3-36-69.1 C19.4,106.9,3.3,66,14.2,36.5C22.1,19.4,13.1,39.4,14.2,36.5z";
  var redL2 = "M37.2,36.5c32.3-46.2,59.6-12.1,60.6,88.8c0.3,33.7,24.8,86.3-27.7,85.2c-29.9-0.6-22.2-47.4-27.3-74.2 C37,106.3,26.3,66,37.2,36.5C45.1,19.4,36.1,39.4,37.2,36.5z";
  var redR2 = "M135.1,38.3c14.7-47.3,49.4-17.5,56,34.3c4.4,34.7,8,154.8-40.3,135.3c-18.8-7.6-14.6-47.6-14.7-51 c-0.3-11-2-40-2.7-73.3C133.1,64.8,134.1,41.2,135.1,38.3z";

  var blackL1 = "M4.8,42.2c41.8-90.5,272.5,51.9,195.1,121.2c-32.4,29-102.1,77.8-146.7,53.3c-27-14.8-31.7-43.6-37.1-71.2 C10.2,114.6-6.4,72.6,4.8,42.2C13,24.6,3.7,45.2,4.8,42.2z";
  var blackR1 = "M4.8,42.2c41.8-90.5,272.5,51.9,195.1,121.2c-32.4,29-102.1,77.8-146.7,53.3c-27-14.8-31.7-43.6-37.1-71.2 C10.2,114.6-6.4,72.6,4.8,42.2C13,24.6,3.7,45.2,4.8,42.2z";
  var blackL2 = "M27.8,42.2c33.2-47.5,61.3-12.4,62.4,91.5c0.3,34.7,25.5,88.8-28.5,87.7C31,220.7,38.9,172.6,33.6,145 C27.7,114.1,16.6,72.6,27.8,42.2C36,24.6,26.7,45.2,27.8,42.2z";
  var blackR2 = "M128.7,44.1c15.1-48.7,50.9-18,57.6,35.3c4.5,35.7,8.2,159.4-41.5,139.3c-19.4-7.8-15-49-15.1-52.5 c-0.3-11.3-2.1-41.2-2.7-75.5C126.5,71.3,127.6,47.1,128.7,44.1z";

  // Data for the start and end paths
  var morphDataOrangeL = [orangeL1, orangeL2];
  var morphDataOrangeR = [orangeR1, orangeR2];
  var morphDataRedL = [redL1, redL2];
  var morphDataRedR = [redR1, redR2];
  var morphDataBlackL = [blackL1, blackL2];
  var morphDataBlackR = [blackR1, blackR2];

  // Run it through the MorphSVGPlugin
  MorphSVGPlugin.pathFilter(morphDataOrangeL);
  MorphSVGPlugin.pathFilter(morphDataOrangeR);
  MorphSVGPlugin.pathFilter(morphDataRedL);
  MorphSVGPlugin.pathFilter(morphDataRedR);
  MorphSVGPlugin.pathFilter(morphDataBlackL);
  MorphSVGPlugin.pathFilter(morphDataBlackR);

  // Object to animate
  var pathOrangeLi = {
    d: morphDataOrangeL[0]
  };
  var pathOrangeRi = {
    d: morphDataOrangeR[0]
  };
  var pathRedLi = {
    d: morphDataRedL[0]
  };
  var pathRedRi = {
    d: morphDataRedR[0]
  };
  var pathBlackLi = {
    d: morphDataBlackL[0]
  };
  var pathBlackRi = {
    d: morphDataBlackR[0]
  };
  var pathOrangeLe = {
    d: morphDataOrangeL[1]
  };
  var pathOrangeRe = {
    d: morphDataOrangeR[1]
  };
  var pathRedLe = {
    d: morphDataRedL[1]
  };
  var pathRedRe = {
    d: morphDataRedR[1]
  };
  var pathBlackLe = {
    d: morphDataBlackL[1]
  };
  var pathBlackRe = {
    d: morphDataBlackR[1]
  };

  player.pathContainer = [{
    pathi: pathOrangeLi,
    pathe: pathOrangeLe,
    morphdata: morphDataOrangeL
  }, {
    pathi: pathOrangeRi,
    pathe: pathOrangeRe,
    morphdata: morphDataOrangeR
  }, {
    pathi: pathRedLi,
    pathe: pathRedLe,
    morphdata: morphDataRedL
  }, {
    pathi: pathRedRi,
    pathe: pathRedRe,
    morphdata: morphDataRedR
  }, {
    pathi: pathBlackLi,
    pathe: pathBlackLe,
    morphdata: morphDataBlackL
  }, {
    pathi: pathBlackRi,
    pathe: pathBlackRe,
    morphdata: morphDataBlackR
  }];

  var playAnimation = function (cont) {
    cont.forEach(e => {
      TweenMax.to(e.pathi, 1, {
        d: e.morphdata[1],
        ease: Power4.easeInOut,
        onUpdate: render
      });
    });
  };

  var pauseAnimation = function (cont) {
    cont.forEach(e => {
      TweenMax.to(e.pathi, 1, {
        d: e.morphdata[0],
        ease: Power4.easeInOut,
        onUpdate: render
      });
    });
  };

  render();

  function render() {
    context.clearRect(0, 0, vw, vh);
    context.fillStyle = "#f2e0d7";
    context.fill(new Path2D(pathBlackLi.d));
    context.fill(new Path2D(pathBlackRi.d));
    context.strokeStyle = "#000000";
    context.lineWidth = 2;
    context.stroke(new Path2D(pathBlackLi.d));
    context.stroke(new Path2D(pathBlackRi.d));
    //context.fillStyle = "#f2e0d7";
    context.fill(new Path2D(pathRedLi.d));
    context.fill(new Path2D(pathRedRi.d));
    context.stroke(new Path2D(pathRedLi.d));
    context.stroke(new Path2D(pathRedRi.d));
    //context.fillStyle = "#f2e0d7";
    context.fill(new Path2D(pathOrangeLi.d));
    context.fill(new Path2D(pathOrangeRi.d));
    context.stroke(new Path2D(pathOrangeLi.d));
    context.stroke(new Path2D(pathOrangeRi.d));
  }

  playerCanvas.onclick = function () {
    player.playPause();
  };

  function fadeInTitle() {
    document.querySelector('.nowplaying').classList.add('streamactive');
  }

  function fadeOutTitle() {
    document.querySelector('.nowplaying').classList.remove('streamactive');
  }

  /* Firebase */
  var config = {
    apiKey: "AIzaSyBFEYV7O7-wRd4zJ8SoUjaVnX2x8CKu79E",
    authDomain: "rocket-radio.firebaseapp.com",
    databaseURL: "https://rocket-radio.firebaseio.com",
    projectId: "rocket-radio",
    storageBucket: "rocket-radio.appspot.com",
    messagingSenderId: "1024283480300"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  var playingartist = '';
  var title = firebase.database().ref('fatfatfat/title');
  title.on('value', function (snapshot) {
    updateStreamTitle(snapshot.val());
  });

  var streaming = firebase.database().ref('fatfatfat/streaming');
  streaming.on('value', function (snapshot) {
    console.log(snapshot.val());
    if (snapshot.val() === true) {
      player.enable();
    } else {
      player.disable();
    }
  });

  var checkmessage = firebase.database().ref('fatfatfat/checkmessage');
  checkmessage.on('value', function (snapshot) {
    document.querySelector('#check-message').innerText = snapshot.val();
  });

  var playermessage = firebase.database().ref('fatfatfat/playermessage');
  playermessage.on('value', function (snapshot) {
    playerInfo.innerText = snapshot.val();
  });

  var streamTitle = document.querySelector('.is-stream-title');

  function updateStreamTitle(title) {
    streamTitle.innerText = playingartist = title;
  }
});