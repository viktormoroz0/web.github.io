const navbar = document.querySelector('.nav-scroll');

const navSlide = () => {
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 0) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
};

const toggleBurger = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');

    burger.classList.toggle('active');
    nav.classList.toggle('nav-active');
};


const sections = document.querySelectorAll('section');
const indicatorText = document.getElementById('indicator-text');


function updateIndicator() {
  let currentSectionLabel = sections[0].querySelector('h2').textContent;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 100 && rect.bottom >= 100) {
      const sectionLabel = section.querySelector('.highlight');
      if (sectionLabel) {
        currentSectionLabel = sectionLabel.textContent;
      }
    }
  });

  indicatorText.textContent = currentSectionLabel;
}
if (indicatorText) {
  window.addEventListener('scroll', updateIndicator);
}

navSlide();

// Форма заявки на роботу
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('contact-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const surname = document.getElementById('surname').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        if (name && surname && email && phone) {
            const formData = {
                name: name,
                surname: surname,
                email: email,
                phone: phone
            };

            fetch('/sendContactForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.text())
                .then(data => {
                    alert('Заявку успішно відправлено!');
                    document.getElementById('contact-form').reset();
                })
                .catch(error => {
                    alert('Сталася помилка при відправці заявки!');
                    console.error('Помилка:', error);
                });
        } else {
            alert('Будь ласка, заповніть всі поля!');
        }
    });
});

//Модальне вікно консультації

function openModal() {
    document.getElementById('consultModal').style.display = 'flex';
}
function closeModal() {
    document.getElementById('consultModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('consultModal');
    if (event.target === modal) {
        closeModal();
    }
};

// Форма модального вікна (консультація)
document.getElementById('consultation-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    if (name && email && message) {
        const formData = {
            name: name,
            email: email,
            message: message
        };
        fetch('/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.text())
            .then(data => {
                alert('Ваше повідомлення успішно відправлено!');
                document.getElementById('consultation-form').reset();
                closeModal();
            })
            .catch(error => {
                alert('Сталася помилка при відправці повідомлення!');
                console.error('Помилка:', error);
            });
    } else {
        alert('Будь ласка, заповніть всі поля!');
    }
});

// Свайпер
document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1250: {
                slidesPerView: 3,
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            item.classList.toggle('active');
        });
    });
});
