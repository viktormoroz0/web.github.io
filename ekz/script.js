const links = document.querySelectorAll('#links a');
const activeLinkText = document.getElementById('activeLinkText');

links.forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    
    // Знімаємо клас "active" з усіх посилань
    links.forEach(l => l.classList.remove('active'));
    
    // Додаємо клас "active" до натиснутого посилання
    this.classList.add('active');
    
    // Виводимо текст активного посилання
    activeLinkText.textContent = `Активне посилання: ${this.textContent}`;
  });
});
