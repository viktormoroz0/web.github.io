function displayDate() {
    const date = new Date(2021, 1, 20, 3, 12); // Місяці в JS рахуються з 0
    document.getElementById('dateOutput').textContent = date.toLocaleString();
}
