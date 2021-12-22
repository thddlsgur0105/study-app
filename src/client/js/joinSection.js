import 'regenerator-runtime/runtime';

const roomContainer = document.getElementById("roomContainer");
const roomId = roomContainer.dataset.id;
const joinBtn = document.getElementById("joinBtn");

const handleClick = async () => {
    const { status } = await fetch(`/api/rooms/${roomId}/join`, {
        method: "POST",
    })
    if (status !== 201) {
        return ;
    }
    joinBtn.innerText = "참여완료!";
}

if (joinBtn) {
    joinBtn.addEventListener("click", handleClick);
}