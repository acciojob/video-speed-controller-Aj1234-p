const inputs = document.querySelectorAll('.controls input');

    function handleUpdate() {
      const suffix = this.dataset.sizing || '';
      document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
    }

    inputs.forEach(input => input.addEventListener('change', handleUpdate));
    inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));

// function handleUpdate() {
//   const suffix = this.dataset.sizing || '';
//   document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
// }

// inputs.forEach(input => input.addEventListener('change', handleUpdate));
// inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));


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

video.controls = false;
let traceTrack = null;
let totalDuration = null;

console.log("currrent time ", video.currentTime);
play.addEventListener("click", (event) => {
  pause.classList.remove("toggle");
  play.classList.add("toggle");
  console.log("play button");
  video.play();
  if (traceTrack) {
    video.currentTime = traceTrack;
    console.log("After pausing the video ", video.currentTime);
  }
  // timeline update
});

pause.addEventListener("click", (event) => {
  pause.classList.add("toggle");
  play.classList.remove("toggle");
  console.log("stop button");
  video.pause();
});

rewind.addEventListener("click", (event) => {
  console.log("inside rewind click ");
  if (traceTrack - 10 >= 0) traceTrack -= 10;
  else traceTrack = 0;
  video.currentTime = traceTrack;
});

skipForward.addEventListener("click", (event) => {
  console.log("inside keep forward click ");
  if (traceTrack + 25 <= video.duration) traceTrack += 25;
  else traceTrack = video.duration;
  video.currentTime = traceTrack;
});

video.addEventListener("loadedmetadata", (event) => {
  totalDuration = video.duration;
  console.log("total duration of the video ", Math.floor(totalDuration));
  console.log("currrent time ", video.currentTime);
});

video.addEventListener("ended", (event) => {
  console.log(
    "Video stopped either because it has finished playing or no further data is available.",
  );
  traceTrack = null;
  video.currentTime = 0;
  pause.classList.add("toggle");
  play.classList.remove("toggle");
});

// time update
video.addEventListener("timeupdate", (event) => {
  console.log("current video time ", video.currentTime);
  traceTrack = video.currentTime;
  let time = Math.floor(video.currentTime);
  if (time >= 0 && time <= 9) currentTimeOfVideo.textContent = `00:0${time}`;
  else currentTimeOfVideo.textContent = `00:${time}`;
  
  let percent = (video.currentTime / video.duration) * 100;
  timeLine.style.width = `${percent}%`;
  console.log("Percentage of video ", percent);
});

volume.addEventListener("click", (event) => {
  volumeSlider.classList.remove("show");
  console.log("video volume ",video.volume);
});



