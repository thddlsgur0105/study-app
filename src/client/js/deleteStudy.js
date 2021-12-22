const removeContainer = document.getElementById("removeContainer");
const removeBtns = removeContainer.querySelectorAll("button");

const handleClick = (event) => {
    const studyId = event.target.dataset.id;
    fetch("/api/study/remove", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ targetStudy: studyId })
    })
}

removeBtns.forEach(btn => btn.addEventListener("click", handleClick));