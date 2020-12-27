import getBlobDuration from "get-blob-duration";

const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeBtn");
const fullScreenBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");
const forward = document.getElementById("jsForward");
const backward = document.getElementById("jsBackward");
const runningBar = document.getElementById("jsRunningTime");
const hoverTarget = document.querySelector(".videoPlayer__controls");
let isHidden = false;
let timeout;

// don't need to wait: not using async/await so..
const registerView = () => {
  const videoId = window.location.href.split("videos")[1];
  fetch(`/api/${videoId}/view`, {
    method: "POST", /// only POST is allowed to modify DB
  });
};

function handlePlayClick() {
  if (videoPlayer.paused) {
    // if (totalTime.innerHTML === "00:00:00") {
    //   // there is a delay when loading video metadata, this is alternative
    //   setTotalTime();
    // }
    setInterval(updateRunningBar, 1000); // keep checking the running time
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeRange.value = videoPlayer.volume;
    if (volumeRange.value >= 0.7) {
      volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else if (volumeRange.value >= 0.1) {
      volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
    } else {
      volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    volumeRange.value = 0;
  }
}

function exitFullScreen() {
  fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
  fullScreenBtn.addEventListener("click", goFullScreen);
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullscreen) {
    document.mozCancelFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}
// maek it fullscreen and remove eventlistener to avoid being clicked again
// Check the compatibility
function goFullScreen() {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullscreen) {
    videoContainer.mozRequestFullscreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  }
  fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
  fullScreenBtn.removeEventListener("click", goFullScreen);
  fullScreenBtn.addEventListener("click", exitFullScreen);
}

const formatDate = (seconds) => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

async function setTotalTime() {
  const blob = await fetch(videoPlayer.src).then((response) => response.blob()); // check the blob file to extract duration time using getBlobDuration
  const duration = await getBlobDuration(blob);
  const totalTimeString = formatDate(duration);
  totalTime.innerHTML = totalTimeString;
}

function setCurrentTime() {
  currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime)); // if paused, currenttime alos stopps
}

function handleEnded() {
  registerView(); // increase the count of views
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}
function handleDrag(event) {
  // Range controls (connected) real volume
  const {
    target: { value },
  } = event;
  videoPlayer.volume = value;

  if (value >= 0.7) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    videoPlayer.muted = false;
  } else if (value >= 0.1) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
    videoPlayer.muted = false;
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}
function updateRunningBar() {
  runningBar.value = (videoPlayer.currentTime / videoPlayer.duration) * 100;
}
function handleRunningBar(event) {
  // eslint-disable-next-line prettier/prettier
  videoPlayer.currentTime = Math.floor((videoPlayer.duration * event.target.value) / 100);
  console.log("---> ", videoPlayer.currentTime);
}
function goForward() {
  videoPlayer.currentTime = videoPlayer.currentTime + 5.0;
  if (videoPlayer.currentTime > videoPlayer.duration) {
    videoPlayer.currentTime = videoPlayer.duration;
  }
}
function goBackward() {
  videoPlayer.currentTime = videoPlayer.currentTime - 5.0;
  if (videoPlayer.currentTime < 0) {
    videoPlayer.currentTime = 0;
  }
}
function handleSpaceBar(event) {
  if (event.code === "Space") {
    handlePlayClick();
  }
}
// check mouse move within last 2 seconds to control the titel and video controller
function magicMouse() {
  if (timeout) {
    // this gurantee the time set to wait, time is set to zero
    clearTimeout(timeout);
  }
  timeout = setTimeout(function () {
    // every 5 seconds
    if (!isHidden) {
      document.querySelector("body").style.cursor = "none";
      hoverTarget.style.opacity = 0;
      isHidden = true;
    }
  }, 3000);
  if (isHidden) {
    document.querySelector("body").style.cursor = "auto";
    hoverTarget.style.opacity = 1;
    isHidden = false;
  }
}

function init() {
  videoPlayer.volume = 0.5;
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  fullScreenBtn.addEventListener("click", goFullScreen);
  // videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("timeupdate", setCurrentTime);
  setTimeout(setTotalTime, 1000); // this is for async loading video meta
  videoPlayer.addEventListener("ended", handleEnded);
  volumeRange.addEventListener("input", handleDrag);
  // 5 secs <>
  forward.addEventListener("click", goForward);
  backward.addEventListener("click", goBackward);
  // update progress bar
  runningBar.addEventListener("change", handleRunningBar);
  // keyboard & mouse event
  document.addEventListener("keyup", handleSpaceBar);
  document.addEventListener("mousemove", magicMouse);
}

if (videoContainer) {
  init();
}
