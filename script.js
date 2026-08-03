const video = document.querySelector(".flex");
const playerButton = document.querySelector(".player__button");
const progressFilled = document.querySelector(".progress__filled");
const rewind = document.querySelector("#rewind");
const skipForward = document.querySelector("#skipButton");
const play = document.querySelector("#play");
const pause = document.querySelector("#pause");
const volume = document.querySelector("#volume");
const volumeSlider = document.querySelector(".volume-slider");
const currentTimeOfVideo = document.querySelector(".current-time");
const timeLine = document.querySelector('.timeline');
const speed= document.querySelector('#speed');
const playbackSpeed = document.querySelector('.playback__speed');
video.controls = false;
let traceTrack = null;
let totalDuration = null;

play.addEventListener("click", (event) => {
  pause.classList.remove("toggle");
  play.classList.add("toggle");
  video.play();
  if (traceTrack) {
    video.currentTime = traceTrack;
  }
});

pause.addEventListener("click", (event) => {
  pause.classList.add("toggle");
  play.classList.remove("toggle");
  video.pause();
});

rewind.addEventListener("click", (event) => {
   video.currentTime = Math.max(video.currentTime-10,0);
});

skipForward.addEventListener("click", (event) => {
 video.currentTime = Math.min(video.currentTime+25,video.duration);
});

video.addEventListener("loadedmetadata", (event) => {
  totalDuration = video.duration;
  console.log("total duration of the video ", Math.floor(totalDuration));
  console.log("currrent time ", video.currentTime);
});

video.addEventListener("ended", (event) => {
  traceTrack = null;
  video.currentTime = 0;
  pause.classList.add("toggle");
  play.classList.remove("toggle");
});

video.addEventListener("timeupdate", (event) => {
  traceTrack = video.currentTime;
  let time = Math.floor(video.currentTime);
  if (time >= 0 && time <= 9) currentTimeOfVideo.textContent = `00:0${time}`;
  else currentTimeOfVideo.textContent = `00:${time}`;
    let percent = Math.floor((video.currentTime / video.duration) * 100);
  timeLine.style.width = `${percent}%`;
});

volume.addEventListener("click", (event) => {
  volumeSlider.classList.remove("show");
});
  volumeSlider.addEventListener('change',(event)=>{
    let vol = parseFloat(event.target.value)*0.01;
    video.volume = vol;
    volumeSlider.classList.add('show');
  })

speed.addEventListener('click',(event)=>{
  playbackSpeed.classList.remove('show');
})
  playbackSpeed.addEventListener('change',(event)=>{
    video.playbackRate = parseFloat(event.target.value);
    playbackSpeed.classList.add('show');
  })