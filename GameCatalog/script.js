function oyunSec(gameName) {
    window.location.href = gameName + "/index.html";
}


document.querySelectorAll(".oyunlar a").forEach((a) => {
    a.addEventListener("click", oyunSec);
});