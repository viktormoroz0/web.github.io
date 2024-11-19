// Функція для розрахунку кількості секунд до завтра
function getSecondsToTomorrow() {
    const now = new Date(); // Поточна дата та час
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1); // Завтрашній день о 00:00
    const secondsToTomorrow = Math.floor((tomorrow - now) / 1000); // Різниця в мілісекундах, переведена в секунди
    return secondsToTomorrow;
}

// Функція для відображення результату
function showSecondsToTomorrow() {
    const seconds = getSecondsToTomorrow();
    document.getElementById('result').textContent = `Секунд до завтра: ${seconds}`;
}
