document.addEventListener('DOMContentLoaded', function () {
    fetch('https://raw.githubusercontent.com/viktormoroz0/diplom/main/services.json')
        .then(response => response.json())
        .then(data => generateServiceCards(data))
        .catch(error => console.error('Помилка при завантаженні даних:', error));

    function generateServiceCards(services) {
        const container = document.getElementById('service-cards-container');
        services.forEach(service => {
            const card = document.createElement('div');
            card.classList.add('service-card');

            const cardContent = `
                <div>
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                    <ul>
                        ${service.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                    <span class="price">${service.price}</span>
                </div>
                <button class="btn" data-service-name="${service.title}">Замовити послугу</button>
            `;

            card.innerHTML = cardContent;
            container.appendChild(card);
        });

        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function () {
                localStorage.setItem('serviceName', this.getAttribute('data-service-name'));
                window.location.href = "order.html";
            });
        });
    }

    const serviceName = localStorage.getItem('serviceName');
    if (serviceName) {
        document.getElementById('service-name').textContent = serviceName;
    }

    document.getElementById('place-order-btn').addEventListener('click', placeOrder);

    function placeOrder() {
        let name = document.getElementById("name").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let email = document.getElementById("email").value.trim();
        let report = document.getElementById("report").checked ? "Так" : "Ні";
        let format = document.querySelector('input[name="format"]:checked')?.value || "Онлайн";

        if (!name || !phone || !email) {
            alert("Будь ласка, заповніть всі поля!");
            return;
        }

        const orderData = { serviceName, name, phone, email, format, report };

        fetch('http://localhost:3000/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                document.getElementById("order-form").reset();
                window.location.href = "/";
            })
            .catch(error => console.error('Помилка відправлення:', error));
    }
});

// ВІДГУКИ
fetch('https://raw.githubusercontent.com/viktormoroz0/diplom/main/reviews.json')
    .then(response => response.json())
    .then(data => {
        const storedJsonReviews = localStorage.getItem('json-reviews');
        if (!storedJsonReviews) {
            localStorage.setItem('json-reviews', JSON.stringify(data));
        }
    })
    .catch(error => console.error('Помилка при завантаженні відгуків:', error));
function generateTestimonials(reviews) {
    const container = document.getElementById('testimonials-container');
    reviews.forEach(review => {
        const testimonial = document.createElement('div');
        testimonial.classList.add('testimonial');
        testimonial.innerHTML = `
                        <p>"${review.text}"</p>
                        <span class="author">- ${review.author}</span>
                    `;
        container.appendChild(testimonial);
    });
}
function displayReviews() {
    const container = document.getElementById('testimonials-container');
    container.innerHTML = '';
    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const jsonReviews = JSON.parse(localStorage.getItem('json-reviews')) || [];
    const allReviews = [...jsonReviews, ...storedReviews];
    generateTestimonials(allReviews);
}
document.getElementById('submit-review-btn').addEventListener('click', function (e) {
    e.preventDefault();
    const author = document.getElementById('review-author').value;
    const text = document.getElementById('review-text').value;
    if (author && text) {
        const newReview = { author, text };
        let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.push(newReview);
        localStorage.setItem('reviews', JSON.stringify(reviews));
        document.getElementById('review-author').value = '';
        document.getElementById('review-text').value = '';
        displayReviews();
    }
});
window.onload = displayReviews;