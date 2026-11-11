// ========================================================
// Домашнє завдання: Реєстрація на рок-концерт «Thunderstorm»
// Тема: Робота зі змінними, арифметичними операторами та if/else
// ========================================================

// 1. Оголошення сталих значень (констант) та змінних
const TICKET_PRICE = 650; // Вартість одного квитка у гривнях

// Отримання посилань на елементи DOM форми та інтерфейсу
const registrationForm = document.getElementById('registrationForm');
const userNameInput = document.getElementById('userName');
const userEmailInput = document.getElementById('userEmail');
const participantsInput = document.getElementById('participantsCount');

const calculationDetails = document.getElementById('calculationDetails');
const totalPriceDisplay = document.getElementById('totalPriceDisplay');
const messageAlert = document.getElementById('messageAlert');

// ========================================================
// 2. Функція динамічного перерахунку суми (Арифметичні оператори)
// ========================================================
function updatePriceCalculation() {
  // Отримуємо значення з поля та перетворюємо його на число за допомогою Number()
  let participantsCount = Number(participantsInput.value);

  // Перевірка: якщо введено менше 1 або некоректне число
  if (participantsCount < 1 || isNaN(participantsCount)) {
    calculationDetails.textContent = 'Введіть коректну кількість квитків';
    totalPriceDisplay.textContent = '0';
    return;
  }

  // Арифметична дія: множення кількості квитків на ціну за один квиток
  let totalPrice = participantsCount * TICKET_PRICE;

  // Оновлення текстового вмісту на сторінці
  calculationDetails.textContent = `${participantsCount} × ${TICKET_PRICE} грн`;
  totalPriceDisplay.textContent = totalPrice;
}

// Слухач події введення кількості квитків для миттєвого перерахунку суми
participantsInput.addEventListener('input', updatePriceCalculation);

// ========================================================
// 3. Обробка відправки форми та перевірка умов (if / else)
// ========================================================
registrationForm.addEventListener('submit', function (event) {
  // Запобігаємо перезавантаженню сторінки браузером
  event.preventDefault();

  // Отримуємо значення, введені користувачем, і видаляємо зайві пробіли методом trim()
  let userName = userNameInput.value.trim();
  let userEmail = userEmailInput.value.trim();
  let participantsCount = Number(participantsInput.value);

  // Регулярний вираз для базової перевірки формату email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Змінні для збереження тексту та типу повідомлення
  let errorMessage = '';

  // --------------------------------------------------------
  // Умови перевірки валідності заповнення полів (if / else if / else)
  // --------------------------------------------------------

  // Перевірка 1: чи заповнене поле "Ім'я"
  if (userName === '') {
    errorMessage = 'Помилка: будь ласка, введіть ваше ім\'я та прізвище.';
    userNameInput.focus();
  } 
  // Перевірка 2: чи заповнене поле "Email" та чи правильний його формат
  else if (userEmail === '') {
    errorMessage = 'Помилка: будь ласка, вкажіть вашу електронну адресу (Email).';
    userEmailInput.focus();
  } 
  else if (!emailPattern.test(userEmail)) {
    errorMessage = 'Помилка: введіть коректний формат електронної пошти (наприклад, name@example.com).';
    userEmailInput.focus();
  } 
  // Перевірка 3: чи кількість учасників більша за нуль
  else if (isNaN(participantsCount) || participantsCount <= 0) {
    errorMessage = 'Помилка: кількість учасників повинна бути більшою за нуль (мінімум 1 квиток).';
    participantsInput.focus();
  } 
  else {
    // ------------------------------------------------------
    // УСПІШНА ПЕРЕВІРКА ВСІХ УМОВ
    // ------------------------------------------------------

    // Арифметичний розрахунок фінальної вартості
    let finalCost = participantsCount * TICKET_PRICE;

    // Формування успішного повідомлення згідно з вимогами завдання
    messageAlert.className = 'alert alert-success d-block border-success shadow-sm';
    messageAlert.innerHTML = `
      <div class="d-flex align-items-start gap-2">
        <i class="bi bi-check-circle-fill fs-4 text-success flex-shrink-0"></i>
        <div>
          <h5 class="alert-heading fw-bold mb-1">Реєстрація успішна!</h5>
          <p class="mb-1">
            Дякуємо, <strong>${userName}</strong>! Ваше бронювання на рок-концерт підтверджено.
          </p>
          <hr class="my-2">
          <ul class="mb-0 small ps-3">
            <li>Кількість квитків: <strong>${participantsCount} шт.</strong></li>
            <li>Загальна вартість: <strong>${finalCost} грн</strong> (${participantsCount} × ${TICKET_PRICE} грн)</li>
            <li>Електронні квитки та чек надіслано на email: <strong>${userEmail}</strong></li>
          </ul>
        </div>
      </div>
    `;

    // Очищаємо форму після успішної реєстрації
    registrationForm.reset();

    // Повертаємо початкове значення для розрахунку вартості
    updatePriceCalculation();

    // Прокручуємо до повідомлення
    messageAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    return;
  }

  // --------------------------------------------------------
  // НЕУСПІШНА ПЕРЕВІРКА (ПОКАЗ ПОВІДОМЛЕННЯ ПРО ПОМИЛКУ)
  // --------------------------------------------------------
  messageAlert.className = 'alert alert-danger d-block border-danger shadow-sm';
  messageAlert.innerHTML = `
    <div class="d-flex align-items-center gap-2">
      <i class="bi bi-exclamation-triangle-fill fs-5 text-danger flex-shrink-0"></i>
      <div>${errorMessage}</div>
    </div>
  `;

  // Прокручуємо до повідомлення про помилку
  messageAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// Первинна ініціалізація розрахунку при завантаженні сторінки
updatePriceCalculation();

