/* eslint-disable max-len */
let comments = [];

const $commentsModal = document.querySelector(".comments-modal");
const $commentForm = document.querySelector(".comment-form");
const $commentInput = document.querySelector(".comment-input");

document.querySelector(".click-comments").addEventListener("click", () => {
  document.querySelector(".page").classList.toggle("open-modal");
});

const render = () => {
  $commentsModal.innerHTML = comments
    .map(
      comment => `
    <li id=${comment.id}>
      <div class="comment-info">
        <div class="user-image"></div>
        <div class="user-sns-info"></div>
        <span>${comment.user}</span>
        <div class="user-info"></div>
        <span class="date">2021.04.15 04:46</span>
        <div class="comment-menu"></div>
        <div class="comment-delete"></div>
      </div>
      <p class="comment">
        ${comment.comment}
      </p>
    </li>
  `
    )
    .join("");
};

const fetchComment = () => {
  comments = [
    {
      id: 1,
      user: "Nayounho",
      comment:
        "저 또한 아이폰 12Pro Max를 사용하면서 영상,사진 등 전문적인 작업을 제외하곤 모든 것을 해결하고 있는데 요즘 스마트폰은 RAW촬영 또한 지원하는데요. "
    },
    {
      id: 2,
      user: "David",
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, exercitationem perspiciatis vero eum harum commodi "
    }
  ];

  comments = [...comments].sort((comment1, comment2) => comment2.id - comment1.id);
  render();
};

const addComment = comment => {
  comments = [
    {
      id: comments.length ? Math.max(...comments.map(todo => todo.id)) + 1 : 1,
      user: "Eric",
      comment
    },
    ...comments
  ];
  render();
};

$commentForm.addEventListener("submit", e => {
  e.preventDefault();
  const commentInput = $commentInput.value;
  addComment(commentInput);
  $commentInput.value = "";
});

$commentsModal.addEventListener("click", e => {
  // console.log(e.target.matches("comments-modal > li > .comment-info > .comment-delete"));
  // if (!e.target.matches("comments-modal > li > div.comment-delete")) return;
  const targetId = e.target.parentNode.parentNode.id;
  comments = comments.filter(comment => comment.id !== +targetId);
  render();
});

document.addEventListener("DOMContentLoaded", fetchComment);
