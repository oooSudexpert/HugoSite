import IMask from '../js/imask/esm';
const maskOptions = {
  mask: '+{7} (000) 000-00-00'
};

document.addEventListener('DOMContentLoaded', () => {

  const phoneInputs = document.querySelectorAll('[name="Phone"]') as NodeListOf<HTMLInputElement>;
  phoneInputs.forEach((input) => {
    var mask = IMask(input, maskOptions); // https://imask.js.org/
    input.addEventListener('focus', () => mask.updateValue());
  });

  // Делегирование событий для всех форм
  document.body.addEventListener('submit', (event: Event) => {
      event.preventDefault(); // Предотвращаем стандартное поведение формы

      const form = event.target as HTMLFormElement; // Получаем текущую форму
      const phoneInput = form.querySelector('[name="Phone"]') as HTMLInputElement; // Поле телефона
      const phoneError = form.querySelector('.phone-error') as HTMLSpanElement; // Ошибка телефона
      const messageInput = form.querySelector('[name="Message"]') as HTMLTextAreaElement; // Поле сообщения
      const messageError = form.querySelector('.message-error') as HTMLSpanElement; // Ошибка сообщения

      let isValid = true;
      let cityValue = form.dataset.city;
      let phoneValue = '';
      let messageValue = '';

      if (phoneInput != null && phoneError != null) {
        phoneError.textContent = '';
        phoneValue = phoneInput.value.trim();
        phoneValue = phoneValue.replace(/\D/g, '').slice(-10);
        if (!phoneValue) {
          phoneError.textContent = 'Введите Ваш номер телефона.';
          isValid = false;
        } else if (!/^\d{10}$/.test(phoneValue)) {
          phoneError.textContent = 'Введите номер телефона полностью.';
          isValid = false;
        }
      }

      if (messageInput != null && messageError != null) {
        messageError.textContent = '';
        messageValue = messageInput.value.trim();
        if (!messageValue) {
            messageError.textContent = 'Введите Ваш вопрос.';
            isValid = false;
        } else if (messageValue.length > 500) {
            messageError.textContent = 'Длина текста не должна превышать 500 символов.';
            isValid = false;
        }
      }
      // Если форма валидна, отправляем данные
      if (isValid) {
        try {
          sendData(cityValue, phoneValue, messageValue);
        } catch {
          alert('Ошибка отправки данных. Попробуйте повторить позднее.');
        }
        form.classList.remove('was-validated');
        form.reset();
      } else {
        form.classList.add('was-validated');
      }
  });

  // Функция отправки данных через GET-запрос
  async function sendData(city: string, phone: string, message: string): Promise<void> {
      try {
          // Создаем URL с параметрами
          const url = new URL('https://functions.yandexcloud.net/d4ehgtkcf9e302257mjc');
          url.searchParams.append('city', city);
          url.searchParams.append('phone', phone);
          url.searchParams.append('message', message);
          console.log(message);
          // Отправляем GET-запрос
          const response = await fetch(url.toString(), {
              method: 'GET',
          });

          if (!response.ok) {
              throw new Error(`Ошибка HTTP! Статус: ${response.status}`);
          } else {
            alert('Наш специалист перезвонит Вам в течении 1 минуты.');
          }
      } catch (error) {
          console.error('Ошибка при отправке данных:', error);
          alert('Произошла ошибка при отправке данных.');
      }
  }
});
