const burgerButton = document.getElementById("burger");

burgerButton.addEventListener("click", function () {
    burgerButton.classList.toggle("active");
});

document.addEventListener('DOMContentLoaded', function() {
    var openModalBtn = document.getElementById('openModalBtn');
    var closeModalBtn = document.getElementById('closeModalBtn');
    var modal = document.getElementById('myModal');
  
    openModalBtn.onclick = function() {
      modal.style.display = 'block';
    };
  
    closeModalBtn.onclick = function() {
      modal.style.display = 'none';
    };
  
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  
    var form = document.getElementById('myForm');
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      console.log('Форма відправлена!');
      modal.style.display = 'none';
    });
  });
  

document.addEventListener('DOMContentLoaded', function () {
  var scrollToTopBtn = document.getElementById('scrollToTopBtn');

  window.onscroll = function () {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          scrollToTopBtn.style.display = 'block';
      } else {
          scrollToTopBtn.style.display = 'none';
      }
  };

  scrollToTopBtn.addEventListener('click', function () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
  });
});
