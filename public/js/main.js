(() => {
  // <stdin>
  (function() {
    "use strict";
    var successMessage = ":) \u0412\u0430\u0448\u0430 \u0437\u0430\u044F\u0432\u043A\u0430 \u043F\u0440\u0438\u043D\u044F\u0442\u0430,\n \u0441\u0435\u0439\u0447\u0430\u0441 \u043D\u0430\u0448 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442 \u0412\u0430\u043C \u043F\u0435\u0440\u0435\u0437\u0432\u043E\u043D\u0438\u0442.";
    var errorMessage = ":( \u0412\u043E\u0437\u043D\u0438\u043A\u043B\u0430 \u043D\u0435\u043F\u0440\u0435\u0434\u0432\u0438\u0434\u0435\u043D\u043D\u0430\u044F \u0441\u0438\u0442\u0443\u0430\u0446\u0438\u044F.\n \u0412\u0430\u0448\u0430 \u0437\u0430\u044F\u0432\u043A\u0430 \u043D\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430,\n \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437.";
    const maskOptions = {
      mask: "+{7} (000) 000-00-00"
    };
    var inputs = document.querySelectorAll('[name="Phone"]');
    Array.prototype.slice.call(inputs).forEach(function(inputPhone) {
      IMask(inputPhone, maskOptions);
    });
    var forms = document.querySelectorAll(".contact-form");
    Array.prototype.slice.call(forms).forEach(function(form) {
      form.addEventListener("submit", function(event) {
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity()) {
          const city = form.dataset.city;
          let phone = form.querySelector('[name="Phone"]').value.replace(/\D/g, "").substr(-10, 10);
          let message;
          const inputMessage = form.querySelector('[name="Message"]');
          if (inputMessage !== null) {
            message = inputMessage.value;
          }
          fetchMessage(city, phone, message).then((response) => {
            if (response.status == 200) {
              alert(successMessage);
              form.classList.remove("was-validated");
              form.reset();
            } else {
              alert(errorMessage);
            }
          });
        } else {
          form.classList.add("was-validated");
        }
      }, false);
    });
    async function fetchMessage(city, phone, message) {
      let data;
      if (message == null) {
        data = { city, phone };
      } else {
        data = { city, phone, text: message };
      }
      const params = new URLSearchParams(data).toString();
      const url = `https://functions.yandexcloud.net/d4ehgtkcf9e302257mjc?${params}`;
      return await fetch(url);
    }
  })();
})();
