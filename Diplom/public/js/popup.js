window.addEventListener("load", function() {
    if (!localStorage.getItem("popupShown")) {
        setTimeout(function open() {
            document.querySelector(".popup").style.display = "block";
            overlay.classList.add("active");

            localStorage.setItem("popupShown", "true");
        }, 1000);
    }
});

document.querySelector('#close').addEventListener
("click", function(){
    document.querySelector('.popup').style.display = "none";
    overlay.classList.remove("active");
});

overlay.addEventListener("click", function() {
    document.querySelector('.popup').style.display = "none";
    overlay.classList.remove("active");
});