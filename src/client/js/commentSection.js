import 'regenerator-runtime/runtime';

const commentContainer = document.getElementById("commentContainer");
const roomId = commentContainer.dataset.id;
const input = commentContainer.querySelector("input");

const handleSubmit = async (event) => {
    event.preventDefault();
    const { status } = await fetch(`/api/rooms/${roomId}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ content: input.value }),
    })
    if (status !== 201) {
        return ;
    }
    
}

commentContainer.addEventListener("submit", handleSubmit);