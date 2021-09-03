const closeBtn = document.getElementById("closeBtn");
const openBtn = document.getElementById("openBtn");
const sideBar = document.getElementById("sideBar");

const handleClose = () => {
    sideBar.classList.replace("opened", "closed");
}

const handleOpen = () => {
    sideBar.classList.replace("closed", "opened");
}

closeBtn.addEventListener("click", handleClose);
openBtn.addEventListener("click", handleOpen);
