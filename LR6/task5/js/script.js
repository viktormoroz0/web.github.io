// Масив із трьох Promise
const promises = [
  new Promise((resolve) => setTimeout(() => resolve(Math.floor(Math.random() * 10) + 1), 1000)),
  new Promise((resolve) => setTimeout(() => resolve(Math.floor(Math.random() * 10) + 1), 2000)),
  new Promise((resolve) => setTimeout(() => resolve(Math.floor(Math.random() * 10) + 1), 3000))
];

document.getElementById("loader").style.display = "block"; // Показуємо лоадер

Promise.all(promises)
  .then((values) => {
    document.getElementById("loader").style.display = "none"; // Ховаємо лоадер
    const sum = values.reduce((a, b) => a + b, 0);
    document.getElementById("result").innerText = `Сума значень: ${sum}`;
  })
  .catch(() => {
    document.getElementById("loader").style.display = "none"; // Ховаємо лоадер
    document.getElementById("result").innerText = "Виникла помилка.";
  });
