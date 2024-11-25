window.addEventListener("load", function() {
    setTimeout(
        function open(e) {
            document.querySelector(".popup").style.display = "block";
            overlay.classList.add("active");
        },
        1000
    )
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