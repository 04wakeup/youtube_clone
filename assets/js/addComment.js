import axios from "axios";
const addCommentForm = document.getElementById("jsAddComment");

const sendComment = (comment) => {
  console.log(comment);
};
const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = ""; // reset
};
function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}
