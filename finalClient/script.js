const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicVid = wrapper.querySelector(".img-area video"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#styled-back"),
nextBtn = wrapper.querySelector("#styled-forward"),
mainAudio = wrapper.querySelector("#main-audio"),
progressArea = wrapper.querySelector(".progress-area"),
progressBar = progressArea.querySelector(".progress-bar"),
musicList = wrapper.querySelector(".music-list"),
moreMusicBtn = wrapper.querySelector("#styled-HamburgerBtn"),
websiteBtn = wrapper.querySelector("#styled-globe"),
closemoreMusic = musicList.querySelector("#close"),
repeatBtnStyled = wrapper.querySelector("#styled-repeat"),
shuffleBtnStyled = wrapper.querySelector("#styled-shuffle"),
progressFiller = wrapper.querySelector("#progressFill");

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1); 
isMusicPaused = true;
shuffleState = false;
repeatState = false;

window.addEventListener("load", ()=>{
  loadMusic(musicIndex);
  playingSong(); 
});

function loadMusic(indexNumb){
  musicName.innerText = allMusic[indexNumb - 1].name;
  musicArtist.innerText = allMusic[indexNumb - 1].artist;
  //musicImg.src = `images/${allMusic[indexNumb - 1].img}.jpg`;
  musicVid.src = `images/${allMusic[indexNumb - 1].img}.mp4`;
  mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
}

//play music function
function playMusic(){
  wrapper.classList.add("paused");
  playPauseBtn.querySelector("i").innerText = "pause";
  playPauseBtn.querySelector("img").src = 'styleUI/Pause.png';
  mainAudio.play();
  musicVid.play();
}

//pause music function
function pauseMusic(){
  wrapper.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText = "play_arrow";
  playPauseBtn.querySelector("img").src = 'styleUI/Play.png';
  mainAudio.pause();
  musicVid.pause();
}

//prev music function
function prevMusic(){
  musicIndex--; //decrement of musicIndex by 1
  //if musicIndex is less than 1 then musicIndex will be the array length so the last music play
  musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
  playingSong(); 
}

//next music function
function nextMusic(){
  musicIndex++;
  musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
  playingSong(); 
}

// play or pause button event
playPauseBtn.addEventListener("click", ()=>{
  const isMusicPlay = wrapper.classList.contains("paused");
  
  isMusicPlay ? pauseMusic() : playMusic();
  playingSong();
});

//prev music button event
prevBtn.addEventListener("click", ()=>{
  prevMusic();
});

//next music button event
nextBtn.addEventListener("click", ()=>{
  nextMusic();
});

// update progress bar width according to music current time
mainAudio.addEventListener("timeupdate", (e)=>{
  const currentTime = e.target.currentTime; //getting playing song currentTime
  const duration = e.target.duration; //getting playing song total duration
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;
  let styledWidth = 100 - progressWidth;
  document.getElementById("progressFill").style.clipPath = "inset(0 " + `${styledWidth}%`+ " 0 0)";
  let styledHandle = ((currentTime / duration) * 82) + 7;
  document.getElementById("progressHandle").style.left = `${styledHandle}%`;

  let musicCurrentTime = wrapper.querySelector(".current-time"),
  musicDuartion = wrapper.querySelector(".max-duration");
  mainAudio.addEventListener("loadeddata", ()=>{
    // update song total duration
    let mainAdDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if(totalSec < 10){ //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    }
    musicDuartion.innerText = `${totalMin}:${totalSec}`;
  });
  // update playing song current time
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if(currentSec < 10){ //if sec is less than 10 then add 0 before it
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// update playing song currentTime on according to the progress bar width
progressArea.addEventListener("click", (e)=>{
  let progressWidth = progressArea.clientWidth; //getting width of progress bar
  let clickedOffsetX = e.offsetX; //getting offset x value
  let songDuration = mainAudio.duration; //getting song total duration
  
  mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusic(); //calling playMusic function
  playingSong();
});

//change loop, repeat icon onclick
const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtnStyled.addEventListener("click", ()=>{
  shuffleState = false;
  document.getElementById('styled-shuffle').src = "styleUI/Shuffle.png";
  let getText = repeatBtn.innerText; //getting this tag innerText
  switch(getText){
    case "repeat":
      repeatState = true;
      repeatBtn.innerText = "repeat_one";
      repeatBtn.setAttribute("title", "Song looped");
      document.getElementById('styled-repeat').src = "styleUI/RepeatHover.png";
      break;
    case "repeat_one":
      repeatState = false;
      repeatBtn.innerText = "repeat";
      repeatBtn.setAttribute("title", "Playlist looped");
      document.getElementById('styled-repeat').src = "styleUI/RepeatPlaylistHover.png";
      break;
    case "shuffle":
      if(repeatState){
        repeatBtn.innerText = "repeat_one";
        repeatBtn.setAttribute("title", "Song looped");
        document.getElementById('styled-repeat').src = "styleUI/RepeatHover.png";
      }
      else{
        repeatBtn.innerText = "repeat";
        repeatBtn.setAttribute("title", "Playlist looped");
        document.getElementById('styled-repeat').src = "styleUI/RepeatPlaylistHover.png";
      }
      break;
  }
});

//toggle shuffle, shuffle icon onclick
shuffleBtnStyled.addEventListener("click", ()=>{
  let getText = repeatBtn.innerText; //getting this tag innerText
  switch(shuffleState){
    case true:
      shuffleState = false;
      document.getElementById('styled-shuffle').src = "styleUI/Shuffle.png";
      if(repeatState){
        repeatBtn.innerText = "repeat_one";
        repeatBtn.setAttribute("title", "Song looped");
        document.getElementById('styled-repeat').src = "styleUI/RepeatHover.png";
      }
      else{
        repeatBtn.innerText = "repeat";
        repeatBtn.setAttribute("title", "Playlist looped");
        document.getElementById('styled-repeat').src = "styleUI/RepeatPlaylistHover.png";
      }
      break;
    case false:
      shuffleState = true;
      repeatBtn.innerText = "shuffle";
      repeatBtn.setAttribute("title", "Playback shuffled");
      document.getElementById('styled-shuffle').src = "styleUI/ShuffleHover.png";
      if(repeatState){
        document.getElementById('styled-repeat').src = "styleUI/Repeat.png";
      }
      else{
        document.getElementById('styled-repeat').src = "styleUI/RepeatPlaylist.png";
      }
      break;

  }
});

mainAudio.addEventListener("ended", ()=>{
  
  let getText = repeatBtn.innerText; 
  switch(getText){
    case "repeat":
      nextMusic(); //calling nextMusic function
      break;
    case "repeat_one":
      mainAudio.currentTime = 0; 
      break;
    case "shuffle":
      let randIndex = Math.floor((Math.random() * allMusic.length) + 1); 
      do{
        randIndex = Math.floor((Math.random() * allMusic.length) + 1);
      }while(musicIndex == randIndex); 
      musicIndex = randIndex;
      loadMusic(musicIndex);
      playMusic();
      playingSong();
      break;
  }
});

//show music list onclick of music icon
moreMusicBtn.addEventListener("click", ()=>{
  musicList.classList.toggle("show");
});
closemoreMusic.addEventListener("click", ()=>{
  moreMusicBtn.click();
});

const ulTag = wrapper.querySelector("ul");
// let create li tags according to array length for list
for (let i = 0; i < allMusic.length; i++) {
  //let's pass the song name, artist from the array
  let liTag = `<li li-index="${i + 1}">
                <div class="row">
                  <span>${allMusic[i].name}</span>
                  <p>${allMusic[i].artist}</p>
                </div>
                <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
                <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
              </li>`;
  ulTag.insertAdjacentHTML("beforeend", liTag); //inserting the li inside ul tag

  let liAudioDuartionTag = ulTag.querySelector(`#${allMusic[i].src}`);
  let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);
  liAudioTag.addEventListener("loadeddata", ()=>{
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if(totalSec < 10){ //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    };
    liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`; //passing total duation of song
    liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`); //adding t-duration attribute with total duration value
  });
}

//play particular song from the list onclick of li tag
function playingSong(){
  const allLiTag = ulTag.querySelectorAll("li");
  
  for (let j = 0; j < allLiTag.length; j++) {
    let audioTag = allLiTag[j].querySelector(".audio-duration");
    
    if(allLiTag[j].classList.contains("playing")){
      allLiTag[j].classList.remove("playing");
      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration;
    }

    //if the li tag index is equal to the musicIndex then add playing class in it
    if(allLiTag[j].getAttribute("li-index") == musicIndex){
      allLiTag[j].classList.add("playing");
      audioTag.innerText = "Playing";
    }

    allLiTag[j].setAttribute("onclick", "clicked(this)");
  }
}

//particular li clicked function
function clicked(element){
  let getLiIndex = element.getAttribute("li-index");
  musicIndex = getLiIndex; //updating current song index with clicked li index
  loadMusic(musicIndex);
  playMusic();
  playingSong();
}

playPauseBtn.addEventListener("mouseover", ()=>{
  if(wrapper.classList.contains("paused")){
    playPauseBtn.querySelector("img").src = 'styleUI/PauseHover.png';
  }
  if(!wrapper.classList.contains("paused")){
    playPauseBtn.querySelector("img").src = 'styleUI/PlayHover.png';
  }
});

playPauseBtn.addEventListener("mouseout", ()=>{
  if(wrapper.classList.contains("paused")){
    playPauseBtn.querySelector("img").src = 'styleUI/Pause.png';
  }
  if(!wrapper.classList.contains("paused")){
    playPauseBtn.querySelector("img").src = 'styleUI/Play.png';
  }
});

repeatBtnStyled.addEventListener("mouseover", ()=>{
  if(shuffleState){
    switch(repeatState){
      case true:
        document.getElementById('styled-repeat').src = "styleUI/RepeatHover.png";
        break;
      case false:
        document.getElementById('styled-repeat').src = "styleUI/RepeatPlaylistHover.png";
        break;
    }
  }
});

repeatBtnStyled.addEventListener("mouseout", ()=>{
  if(shuffleState){
    switch(repeatState){
      case true:
        document.getElementById('styled-repeat').src = "styleUI/Repeat.png";
        break;
      case false:
        document.getElementById('styled-repeat').src = "styleUI/RepeatPlaylist.png";
        break;
    }
  }
});

shuffleBtnStyled.addEventListener("mouseover", ()=>{
  if(!shuffleState){
      document.getElementById('styled-shuffle').src = "styleUI/ShuffleHover.png";
  }
});

shuffleBtnStyled.addEventListener("mouseout", ()=>{
  if(shuffleState){
    document.getElementById('styled-shuffle').src = "styleUI/ShuffleHover.png";
  }
  else{
    document.getElementById('styled-shuffle').src = "styleUI/Shuffle.png";
  }
});

//go to website
websiteBtn.addEventListener("click", ()=>{
  window.open("https://www.wakanomy.com/");
});