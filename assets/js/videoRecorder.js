/* eslint-disable no-unused-vars */
const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
      video: { width: 1280, height: 720 },
    });
    videoPreview.srcObject = stream; // 1. get the stream data
    videoPreview.muted = true; // 2. muted
    videoPreview.play(); // 3. play
  } catch (error) {
    console.log(error);
    recordBtn.innerHTML = "Can't record";
    recordBtn.removeEventListener("click", startRecording);
  }
};

function init() {
  recordBtn.addEventListener("click", startRecording);
}

if (recorderContainer) {
  init();
}
