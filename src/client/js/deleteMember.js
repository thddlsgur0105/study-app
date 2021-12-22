import 'regenerator-runtime/runtime';

const memberList = document.getElementById("memberList");
const roomId = memberList.dataset.id;
const deleteBtns = memberList.querySelectorAll("button");

const handleClick = async (event) => {
    const deleteBtn = event.target;
    const memberId = deleteBtn.dataset.id;
    const { status } = await fetch(`/api/user/remove`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            targetRoom: roomId,
            targetMember: memberId,
        })
    })
    if (status !== 200) {
        return;
    }
    deleteBtn.style.backgroundColor="red";
}

deleteBtns.forEach(btn => btn.addEventListener("click", handleClick));