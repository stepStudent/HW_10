// ==========================================================================
// Домашнє завдання IT Step: Модернізована система реєстрації та калькулятора
// Тема: Робота з Bootstrap 5, змінними let/const, арифметичними операторами,
//       категоріями квитків, знижками, промокодом та умовами if/else у JavaScript.
// ==========================================================================

// 1. Оголошення сталих значень (констант)
const STANDARD_PRICE = 400;       // Вартість квитка Standard — 400 грн
const VIP_PRICE = 800;            // Вартість квитка VIP — 800 грн
const VALID_PROMO = 'EVENT50';    // Промокод на знижку
const PROMO_DISCOUNT_VAL = 50;    // Знижка за промокодом — 50 грн

// 2. Отримання посилань на елементи форми
const bookingForm = document.getElementById('bookingForm');
const userNameInput = document.getElementById('userName');
const userEmailInput = document.getElementById('userEmail');
const ticketsCountInput = document.getElementById('ticketsCount');
const promoCodeInput = document.getElementById('promoCode');
const btnApplyPromo = document.getElementById('btnApplyPromo');
const promoFeedback = document.getElementById('promoFeedback');
const statusAlert = document.getElementById('statusAlert');
const btnCalculate = document.getElementById('btnCalculate');

// Елементи детального чека замовлення
const receiptCategory = document.getElementById('receiptCategory');
const receiptUnitCost = document.getElementById('receiptUnitCost');
const receiptTicketsCount = document.getElementById('receiptTicketsCount');
const receiptInitialCost = document.getElementById('receiptInitialCost');
const receiptDiscount = document.getElementById('receiptDiscount');
const receiptPromo = document.getElementById('receiptPromo');
const receiptFinalTotal = document.getElementById('receiptFinalTotal');
const calcStatusBadge = document.getElementById('calcStatusBadge');

// Отримання радіо-кнопок категорій
const categoryRadios = document.querySelectorAll('input[name="ticketCategory"]');

// ==========================================================================
// 3. Функція розрахунку вартості квитків (Завдання 2 + Завдання 3)
// ==========================================================================
function calculateOrder() {
  // 1. Визначаємо вибрану категорію квитка та її ціну
  let selectedCategory = 'standard';
  const checkedRadio = document.querySelector('input[name="ticketCategory"]:checked');
  if (checkedRadio) {
    selectedCategory = checkedRadio.value;
  }

  // Оголошуємо змінну ціни одного квитка згідно з категорією
  let unitPrice = (selectedCategory === 'vip') ? VIP_PRICE : STANDARD_PRICE;
  let categoryName = (selectedCategory === 'vip') ? 'VIP' : 'Standard';

  // 2. Отримуємо кількість квитків
  let ticketsCount = Number(ticketsCountInput.value);

  // Валідація кількості: якщо введено менше 1 або не число
  if (isNaN(ticketsCount) || ticketsCount <= 0) {
    receiptTicketsCount.textContent = '0';
    receiptInitialCost.textContent = '0';
    receiptDiscount.textContent = '0% (0 грн)';
    receiptDiscount.className = 'fw-bold text-secondary';
    receiptPromo.textContent = '0 грн';
    receiptFinalTotal.textContent = '0';
    return {
      isValid: false,
      unitPrice,
      ticketsCount: 0,
      initialCost: 0,
      discountPercent: 0,
      discountAmount: 0,
      promoDiscount: 0,
      finalAmount: 0,
      categoryName
    };
  }

  // 3. Арифметичний розрахунок початкової вартості
  const initialCost = ticketsCount * unitPrice;

  // 4. Умови надання знижки за кількість квитків (if / else if / else)
  let discountPercent = 0;

  if (ticketsCount >= 3 && ticketsCount <= 4) {
    discountPercent = 10; // Від 3 до 4 квитків — знижка 10%
  } else if (ticketsCount >= 5) {
    discountPercent = 20; // 5 або більше квитків — знижка 20%
  } else {
    discountPercent = 0;  // Менше 3 квитків — знижки немає
  }

  // Розрахунок розміру відсоткової знижки
  let discountAmount = (initialCost * discountPercent) / 100;
  let costAfterDiscount = initialCost - discountAmount;

  // 5. Перевірка та застосування промокоду EVENT50 (після відсоткової знижки)
  let promoDiscount = 0;
  let enteredPromo = promoCodeInput.value.trim().toUpperCase();

  if (enteredPromo === VALID_PROMO) {
    promoDiscount = PROMO_DISCOUNT_VAL;
    promoFeedback.className = 'form-text small text-success fw-semibold';
    promoFeedback.innerHTML = '<i class="bi bi-check-circle-fill me-1"></i> Промокод EVENT50 успішно застосовано (−50 грн)!';
  } else if (enteredPromo !== '') {
    promoFeedback.className = 'form-text small text-danger';
    promoFeedback.innerHTML = '<i class="bi bi-x-circle-fill me-1"></i> Невірний промокод.';
  } else {
    promoFeedback.className = 'form-text small text-secondary';
    promoFeedback.innerHTML = 'Підказка: введіть <strong class="text-info">EVENT50</strong> для отримання додаткової знижки 50 грн.';
  }

  // 6. Розрахунок підсумкової суми (не може бути меншою за нуль)
  let finalAmount = costAfterDiscount - promoDiscount;
  if (finalAmount < 0) {
    finalAmount = 0;
  }

  // 7. Оновлення відображення у чеку замовлення
  receiptCategory.textContent = categoryName;
  receiptUnitCost.textContent = unitPrice;
  receiptTicketsCount.textContent = ticketsCount;
  receiptInitialCost.textContent = initialCost;

  // Відображення знижки
  if (discountPercent > 0) {
    receiptDiscount.textContent = `${discountPercent}% (−${discountAmount} грн)`;
    receiptDiscount.className = 'fw-bold text-success';
  } else {
    receiptDiscount.textContent = '0% (без знижки)';
    receiptDiscount.className = 'fw-bold text-secondary';
  }

  // Відображення промокоду
  if (promoDiscount > 0) {
    receiptPromo.textContent = `EVENT50 (−${promoDiscount} грн)`;
    receiptPromo.className = 'fw-bold text-info';
  } else {
    receiptPromo.textContent = 'Не застосовано (0 грн)';
    receiptPromo.className = 'fw-bold text-secondary';
  }

  receiptFinalTotal.textContent = finalAmount;
  calcStatusBadge.textContent = 'Оновлено';

  return {
    isValid: true,
    unitPrice,
    ticketsCount,
    initialCost,
    discountPercent,
    discountAmount,
    promoDiscount,
    finalAmount,
    categoryName
  };
}

// ==========================================================================
// 4. Слухачі подій для динамічного оновлення калькулятора
// ==========================================================================

// Оновлення при зміні кількості квитків
ticketsCountInput.addEventListener('input', calculateOrder);

// Оновлення при зміні промокоду
promoCodeInput.addEventListener('input', calculateOrder);
btnApplyPromo.addEventListener('click', calculateOrder);

// Оновлення при зміні категорії (Standard / VIP)
categoryRadios.forEach(radio => {
  radio.addEventListener('change', function () {
    // Оновлюємо клас виділення карток
    document.querySelectorAll('.category-card').forEach(card => card.classList.remove('selected'));
    this.closest('.category-card').classList.add('selected');
    calculateOrder();
  });
});

// Клік по окремій кнопці «Розрахувати»
btnCalculate.addEventListener('click', function () {
  const calc = calculateOrder();
  if (!calc.isValid) {
    statusAlert.className = 'alert alert-danger d-block border-danger shadow-sm mb-4';
    statusAlert.innerHTML = `
      <div class="d-flex align-items-center gap-2">
        <i class="bi bi-exclamation-triangle-fill text-danger fs-5"></i>
        <div>Будь ласка, введіть коректну кількість квитків (більше нуля).</div>
      </div>
    `;
    ticketsCountInput.focus();
    return;
  }
  
  // Приховуємо повідомлення про помилку та підсвічуємо чек
  statusAlert.className = 'alert d-none';
  calcStatusBadge.className = 'badge bg-warning text-dark fw-bold';
  calcStatusBadge.textContent = 'Успішно розраховано!';
  document.getElementById('orderReceipt').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// ==========================================================================
// 5. Обробка форми та реєстрація (Завдання 1)
// ==========================================================================
bookingForm.addEventListener('submit', function (event) {
  event.preventDefault();

  let userName = userNameInput.value.trim();
  let userEmail = userEmailInput.value.trim();
  let ticketsCount = Number(ticketsCountInput.value);

  // Регулярний вираз для базової перевірки email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let errorMessage = '';

  // ------------------------------------------------------------------------
  // Перевірка умов if / else if / else
  // ------------------------------------------------------------------------
  if (userName === '') {
    errorMessage = 'Будь ласка, введіть ваше ім\'я та прізвище.';
    userNameInput.focus();
  } else if (userEmail === '') {
    errorMessage = 'Будь ласка, введіть вашу електронну пошту (email).';
    userEmailInput.focus();
  } else if (!emailRegex.test(userEmail)) {
    errorMessage = 'Введіть коректний формат email (наприклад: name@example.com).';
    userEmailInput.focus();
  } else if (isNaN(ticketsCount) || ticketsCount <= 0) {
    errorMessage = 'Кількість учасників повинна бути більшою за нуль (мінімум 1 квиток).';
    ticketsCountInput.focus();
  } else {
    // ----------------------------------------------------------------------
    // УСПІШНА ПЕРЕВІРКА ТА РЕЄСТРАЦІЯ
    // ----------------------------------------------------------------------
    const calc = calculateOrder();

    statusAlert.className = 'alert alert-success d-block border-success shadow-sm mb-4';
    statusAlert.innerHTML = `
      <div class="d-flex align-items-start gap-3">
        <i class="bi bi-check-circle-fill fs-2 text-success flex-shrink-0"></i>
        <div class="w-100">
          <h4 class="alert-heading fw-bold mb-1">Реєстрація успішна!</h4>
          <p class="mb-2">
            Дякуємо, <strong>${userName}</strong>! Ваше бронювання на концерт рок-гурту «Thunderstorm» успішно оформлено.
          </p>
          <div class="p-3 bg-black bg-opacity-25 rounded-3 border border-success border-opacity-25 small">
            <div class="fw-bold mb-1 text-uppercase text-light">Деталі вашого замовлення:</div>
            <ul class="mb-2 ps-3 text-light">
              <li>Категорія квитків: <strong>${calc.categoryName}</strong> (${calc.unitPrice} грн/шт.)</li>
              <li>Кількість учасників: <strong>${calc.ticketsCount} шт.</strong></li>
              <li>Початкова вартість: <strong>${calc.initialCost} грн</strong></li>
              <li>Знижка за кількість: <strong>${calc.discountPercent}% (−${calc.discountAmount} грн)</strong></li>
              <li>Промокод: <strong>${calc.promoDiscount > 0 ? `EVENT50 (−${calc.promoDiscount} грн)` : 'Не застосовано'}</strong></li>
              <li>Підсумкова сума до сплати: <strong class="text-warning fs-6">${calc.finalAmount} грн</strong></li>
            </ul>
            <div class="text-light-50">
              <i class="bi bi-send-check text-success me-1"></i> Підтвердження та електронні квитки надіслано на: <strong>${userEmail}</strong>
            </div>
          </div>
        </div>
      </div>
    `;

    // Прокручуємо до сповіщення про успіх
    statusAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    return;
  }

  // ------------------------------------------------------------------------
  // НЕУСПІШНА ПЕРЕВІРКА: показуємо повідомлення про помилку
  // ------------------------------------------------------------------------
  statusAlert.className = 'alert alert-danger d-block border-danger shadow-sm mb-4';
  statusAlert.innerHTML = `
    <div class="d-flex align-items-center gap-2">
      <i class="bi bi-exclamation-triangle-fill text-danger fs-5 flex-shrink-0"></i>
      <div><strong>Помилка реєстрації:</strong> ${errorMessage}</div>
    </div>
  `;
  statusAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// ==========================================================================
// 6. Швидкі тестові сценарії з опису завдання (2, 3, 5, 3 VIP + EVENT50)
// ==========================================================================
const testButtons = document.querySelectorAll('.test-scenario-btn');
testButtons.forEach(btn => {
  btn.addEventListener('click', function () {
    const category = this.getAttribute('data-cat');
    const count = this.getAttribute('data-count');
    const promo = this.getAttribute('data-promo');

    // Перемикаємо категорію
    if (category === 'vip') {
      document.getElementById('categoryVIP').checked = true;
    } else {
      document.getElementById('categoryStandard').checked = true;
    }

    // Встановлюємо клас selected
    document.querySelectorAll('.category-card').forEach(card => card.classList.remove('selected'));
    const checkedInput = document.querySelector('input[name="ticketCategory"]:checked');
    if (checkedInput) {
      checkedInput.closest('.category-card').classList.add('selected');
    }

    // Заповнюємо значення
    ticketsCountInput.value = count;
    promoCodeInput.value = promo;

    // Запускаємо перерахунок
    calculateOrder();
  });
});

// Початкова ініціалізація розрахунку при завантаженні
const initialChecked = document.querySelector('input[name="ticketCategory"]:checked');
if (initialChecked) {
  initialChecked.closest('.category-card').classList.add('selected');
}
calculateOrder();
