// Функція для отримання останнього дня місяця
function getLastDayOfMonth(year, month) {
    // Використовуємо дату наступного місяця, день "0", щоб отримати останній день поточного місяця
    const lastDay = new Date(year, month + 1, 0).getDate();
    return lastDay;
}

// Функція для обробки введених даних і відображення результату
function showLastDayOfMonth() {
    const year = parseInt(document.getElementById('yearInput').value);
    const month = parseInt(document.getElementById('monthInput').value);

    if (!isNaN(year) && !isNaN(month) && month >= 0 && month <= 11) {
        const lastDay = getLastDayOfMonth(year, month);
        document.getElementById('result').textContent = `Останній день: ${lastDay}`;
    } else {
        document.getElementById('result').textContent = 'Будь ласка, введіть коректні рік і місяць (0-11).';
    }
}
