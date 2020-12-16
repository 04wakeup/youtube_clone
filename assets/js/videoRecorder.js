/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");
let streamObject;
let videoRecorder;

const handleVideoData = (event) => {
  // recording is done, start store it
  const { data: videoFile } = event;
  // Create a link and download with click
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded.webm";
  document.body.appendChild(link);
  link.click(); // facking click
};

const startRecording = () => {
  videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handleVideoData); // it triggers when recording ends only
  //   setTimeout(() => videoRecorder.stop(), 5000);
  recordBtn.addEventListener("click", stopRecording); // another click is stopping
};

// Turn of the camera
const stopStreamedVideo = (videoElem) => {
  const stream = videoElem.srcObject;
  const tracks = stream.getTracks();

  tracks.forEach(function (track) {
    track.stop();
  });

  videoElem.srcObject = null;
};

const stopRecording = () => {
  videoRecorder.stop();
  recordBtn.removeEventListener("click", stopRecording);
  stopStreamedVideo(videoPreview);
  recordBtn.addEventListener("click", getVideo); // enable Starting Recording
  recordBtn.innerHTML = "Start Recording";
};

const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 },
    });
    videoPreview.srcObject = stream; // 1. get the stream data
    videoPreview.muted = true; // 2. muted
    videoPreview.play(); // 3. play
    recordBtn.innerHTML = "Stop Recording";
    streamObject = stream;
    startRecording(); // 4. call a func to record
  } catch (error) {
    recordBtn.innerHTML = "Can't record";
  } finally {
    recordBtn.removeEventListener("click", getVideo);
  }
};

function init() {
  recordBtn.addEventListener("click", getVideo); // recordBtn.onclick = getVideo / null
}

if (recorderContainer) {
  init();
}
