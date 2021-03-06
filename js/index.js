let comments = [];
let login = false;
let writeComment = null;

const date = new Date().toISOString();
const bannedWord = ["씨발", "개새끼", "존나", "좆"];

const $commentsModal = document.querySelector(".comments-modal");
const $commentForm = document.querySelector(".comment-form");
const $commentInput = document.querySelector(".comment-input");
const $loginContainer = document.querySelector(".login-container");
const $snsButton = document.querySelector(".sns-button");
const $loginInputContainer = document.querySelector(".login-input-container");

document.querySelector(".click-comments").parentNode.addEventListener("click", () => {
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
        <span class="date">${date}</span>
        <div class="comment-fetch"></div>
        <div class="comment-delete"></div>
      </div>
      <p class="comment">
        ${comment.comment}
      </p>
      <button>댓글</button>
      <button class="good">좋아 <span class="good-count">${comment.good}</span></button>
      <button class="bad">싫어 <span class="bad-count">${comment.bad}</span></button>
      <button>공유</button>
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
      comment: "저 또한 아이폰 12Pro Max를 사용하면서 영상,사진 등 전문적인 작업을 제외하곤 모든 것을 해결하고 있는데 요즘 스마트폰은 RAW촬영 또한 지원하는데요. ",
      good: 3,
      bad: 1
    },
    {
      id: 2,
      user: "David",
      comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, exercitationem perspiciatis vero eum harum commodi ",
      good: 5,
      bad: 6
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
      comment,
      good: 0,
      bad: 0
    },
    ...comments
  ];
  render();
};
const updateComment = (updateComment, id) => {
  comments = comments.map(comment =>
    comment.id === +id
      ? {
          id: +comment.id,
          user: comment.user,
          comment: updateComment,
          good: comment.good,
          bad: comment.bad
        }
      : comment
  );

  render();
};

$commentForm.addEventListener("click", () => {
  if (!login) return $loginContainer.classList.add("active");
  $loginInputContainer.classList.add("active");
});

$loginInputContainer.addEventListener("submit", e => {
  e.preventDefault();
  if (!$commentInput.value) return;
  for (let i = 0; i < bannedWord.length; i++) {
    if ($commentInput.value.includes(bannedWord[i])) return;
  }
  const commentInput = $commentInput.value;
  if (writeComment === null) {
    addComment(commentInput);
  } else {
    updateComment(commentInput, writeComment);
    writeComment = null;
  }
  $loginInputContainer.classList.remove("active");
  $commentInput.value = "";
  $commentInput.setAttribute("disabled", true);
  setTimeout(() => {
    $commentInput.removeAttribute("disabled");
  }, 1000 * 5);
});

$commentsModal.addEventListener("click", ({ target }) => {
  if (!target.matches(".comment-delete")) return;
  const targetId = target.parentNode.parentNode.id;
  comments = comments.filter(comment => comment.id !== +targetId);
  render();
});

$snsButton.addEventListener("click", () => {
  login = true;
  $loginContainer.classList.remove("active");
});

$commentsModal.addEventListener("click", e => {
  if (!e.target.matches(".good")) return;
  comments = comments.map(comment => (+e.target.parentNode.id === comment.id ? { ...comment, good: comment.good + 1 } : comment));
  render();
});

$commentsModal.addEventListener("click", e => {
  if (!e.target.matches(".bad")) return;
  comments = comments.map(comment => (+e.target.parentNode.id === comment.id ? { ...comment, bad: comment.bad + 1 } : comment));
  render();
});

$commentsModal.addEventListener("click", e => {
  if (!e.target.matches(".comment-fetch")) {
    return;
  }
  if (!login) {
    $loginContainer.classList.add("active");
  }
  if (login) {
    $loginInputContainer.classList.add("active");
  }
  // $loginInputContainer.classList.add("active");
  writeComment = e.target.parentNode.parentNode.id;
  $commentInput.value = comments.find(comment => +e.target.parentNode.parentNode.id === comment.id).comment;
  render();
});

document.addEventListener("DOMContentLoaded", fetchComment);
