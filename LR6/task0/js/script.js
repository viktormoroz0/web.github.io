// Показуємо лоадер
document.getElementById("loader").style.display = "block";

// Створюємо Promise для демонстрації
const examplePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const isSuccess = Math.random() > 0.5; // Успіх або помилка
    if (isSuccess) {
      resolve("Успішно завершено!");
    } else {
      reject("Сталася помилка.");
    }
  }, 2000);
});

// Обробка результату Promise
examplePromise
  .then((message) => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("result").innerText = message;
  })
  .catch((error) => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("result").innerText = error;
  });
