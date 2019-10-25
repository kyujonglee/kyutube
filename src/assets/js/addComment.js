import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const handleDeleteComment = async e => {
  const { target } = e;
  const commentId = target.getAttribute("value");
  const response = await axios({
    url: `/api/${commentId}/comment`,
    method: "DELETE"
  });
  if (response.status === 200) {
    target.parentNode.remove();
    decreaseNumber();
  }
};

const addComment = (comment, commentId) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerHTML = comment;
  li.appendChild(span);
  const span2 = document.createElement("span");
  span2.innerHTML = "❌";
  span2.classList.add(".video__comment-delete-btn");
  span2.setAttribute("value", commentId);
  span2.addEventListener("click", handleDeleteComment);
  li.appendChild(span2);
  commentList.prepend(li);
  increaseNumber();
};

const sendComment = async comment => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment
    }
  });
  if (response.status === 200) {
    const {
      data: { commentId }
    } = response;
    console.log(commentId);
    addComment(comment, commentId);
  }
};

const handleSubmit = event => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  [...document.querySelectorAll(".video__comment-delete-btn")].forEach(btn => {
    btn.addEventListener("click", handleDeleteComment);
  });
}

if (addCommentForm) {
  init();
}
