// ------------- OLD NOT USED GLOBAL VARIABLES -------------- //

var selectSong = document.getElementById('js-selected-track');
// var inputUrl = document.getElementById('js-inputUrl');
var songList = document.getElementById('js-audio-playlist');
var play = document.getElementById('js-play');
var pause = document.getElementById('js-pause');
// var btnAdd = document.getElementById('js-btnAdd');

// ---------- GLOBAL VARIABLES ------------ //

var currentFile = ''; //currentSong
var song = document.getElementById('js-audio'); //html audio
var playBtn = document.getElementById('play');
var audioURL = document.getElementById('js-audio-input'); //input field for new songs to link with JSON at some point?
var songOptions = document.getElementById('js-song-options');
var songList = document.getElementById('js-song-list');

// -------------------- LIST ITEM PLAYLIST --------------------//

// Prevent default _target

songList.addEventListener('click', function(e) {

  e.preventDefault();

});

// function to play clicked song and highlight with css

function playlistItemClick(clickedElement) {
  var selected = songList.querySelector('.active'); //CREATE CSS CLASS
  if (selected) {
    selected.classList.remove('active');
  }
  clickedElement.classList.add('active');

  song.src = clickedElement.getAttribute('href'); //do in Caps? Select HREF
  song.play(); //PLAY
}

// call the playlistItem function that has been e.targeted

songList.addEventListener("click", function (e) {
    if (e.target && e.target.nodeName === "LI") {
        playlistItemClick(e.target);
    }
});

// ------------ INPUT FIELD AND OPTIONS PLAYLISTS ----------- //

      playBtn.addEventListener('click', function () {
        // Check for audio element support.
        if (song) {
          try {
            // test the state of pause/play
            if (song.paused) {
              //Skip loading if current file hasn't changed.
              if (audioURL.value !== '') {
                 if (audioURL.value !== currentFile) {
                   song.src = audioURL.value; // If something input field - load
                  currentFile = audioURL.value;
                  song.load(); // load the file - not currently loading?? add a button which causes the 'load'

                }
              } else {
                var index = songOptions.selectedIndex;
                var playThis = songOptions.options[index].value; //option(s) is plural here - default syntax
                if (playThis !== currentFile) {
                  song.src = playThis; // Linking selected option index to htmlAudio
                  currentFile = playThis; // Dont think i Need this now - Link it to 'change song button'
                  song.load(); // load the file
                }
              }

              song.play(); //For my custom play/pause buttons
            }
            else {
               song.pause();
            }
          }
          catch (e) {
            // catch statement if try attempt fails
            if (window.console && console.error('Error:' + e));
          }
        }
      }, false);

      // alternate buttons from play to pause linked to song.play()/song()pause
      song.addEventListener('pause', function () {
        playBtn.textContent = 'Play'; // change this to custom image eventually
      }, false);

      song.addEventListener('play', function () {
        playBtn.textContent = 'Pause';
      }, false); //NOT SURE ABOUT 'FALSE' MEANING? CODE WORKS WITHOUT IT??

      // Rewinds the audio file by 30 seconds.
      document.getElementById('rewind').addEventListener('click', function () {
        if (song) {        // Check for audio element support.
          try {
            song.currentTime -= 3.0; //current time is default javascript syntax
           }
          catch (e) {
            // console error offers discreet error. if a browser does not support.
            if (window.console && console.error('Error:' + e));
          }
        }
      }, false);

      //make below into variables
      document.getElementById('forward').addEventListener('click', function () {
        if (song) {        // Check for audio element support.

          try {
            song.currentTime += 3.0; //fast forward 3 seconds every 'click'
          }
          catch (e) {
            if (window.console && console.error('Error:' + e));
          }
         }
      }, false);

      // Restart the audio file to the beginning.
      document.getElementById('restart').addEventListener('click', function () {
        if (song) {        // Check for audio element support.
          try { //try, if fails goes to (e) useful for browswer problem backups
            song.currentTime = 0; //resets to start 0
          }
          catch (e) {
            if (window.console && console.error('Error:' + e));
          }
        }
      }, false);

      // On changing songs, pause video and call Play function again
      // CHANGE DOES NOT WORK FOR LI.A COMBINATION, ONLY INPUT, SELECT. TEXTAREA
      songOptions.addEventListener('change', function () {
        song.pause();
        playBtn.click();
      }, false);

//---------------- AUTO NEXT SONG -------------- //
// Not great as it does not read songs in list - Cheating
      var i=1;
      var nextSong= '';
      function setup() {
          song.addEventListener('ended', function(){
              i++;
              nextSong = 'http://music.ayup.io/mp3/'+i+'.mp3';
              song.src = nextSong;
              song.load();
              song.play();
              if(i == 5) // this is the end of the songs.
              {
                  i = 0; //beginning? Need to make this reactive to number of songs in playlist - I am just manually changing at the moment.
              }
          }, false);
      }

window.onload = setup(); //Find a better alternative as this is not efficient waiting for entire window to load
