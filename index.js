const $clickComments = document.querySelector(".click-comments");
const $commentsContainer = document.querySelector(".comments-container");

$clickComments.addEventListener("click", () => {
  console.log(23);
  $commentsContainer.classList.toggle("modal-open");
});
