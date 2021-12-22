import 'regenerator-runtime/runtime';

const roomContainer = document.getElementById("roomContainer");
const roomId = roomContainer.dataset.id;
const commentForm = document.getElementById("commentForm");
const input = commentForm.querySelector("input");
const commentSection = document.getElementById("commentSection");
const noComment = commentSection.querySelector("#noComment");

const createComment = (text, author) => {
    if (noComment) {
        noComment.style.display = "none";
    }
    const div = document.createElement("div");
    div.className = "comment";
    const span = document.createElement("span");
    span.className = "comment__content";
    span.innerText = text;
    const span2 = document.createElement("span");
    span2.className = "comment__author";
    span2.innerText = author;
    div.appendChild(span);
    div.appendChild(span2);
    commentSection.prepend(div);
}

const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`/api/rooms/${roomId}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ content: input.value }),
    })
    if (response.status !== 201) {
        // 새로운 comment document 생성되지 않음
        return ;
    }
    const { author } = await response.json()
    createComment(input.value, author);
    input.value = "";
}

commentForm.addEventListener("submit", handleSubmit);