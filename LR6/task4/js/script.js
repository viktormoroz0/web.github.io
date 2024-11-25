function compareNumbers(num1, num2) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (num1 > num2) {
        resolve("Перше число більше");
      } else if (num1 < num2) {
        resolve("Друге число більше");
      } else {
        reject("Числа рівні");
      }
    }, 1000);
  });
}

document.getElementById("loader").style.display = "block";

// Генеруємо рандомні числа
const num1 = Math.floor(Math.random() * 100) + 1; // Випадкове число 1
const num2 = Math.floor(Math.random() * 100) + 1; // Випадкове число 2

// Лог у консоль для розробника
console.log(`Генеруються числа: num1 = ${num1}, num2 = ${num2}`);

compareNumbers(num1, num2)
  .then((message) => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("result").innerText = message;
  })
  .catch((error) => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("result").innerText = error;
  });
