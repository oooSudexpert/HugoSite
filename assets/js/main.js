/**
 * --------------------------------------------------------------------------
 * Bootstrap
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

////// требуется '@popperjs/core'  !!!!!!!!!!!!!!!!!!!!!!!!!

//export { default as Alert } from './src/alert.js'
//export { default as Button } from './src/button.js'
//export { default as Carousel } from './src/carousel.js'
//export { default as Collapse } from './src/collapse.js'
//////export { default as Dropdown } from './src/dropdown.js'
//export { default as Modal } from './src/modal.js'
//export { default as Offcanvas } from './src/offcanvas.js'
//////export { default as Popover } from './src/popover.js'
//export { default as ScrollSpy } from './src/scrollspy.js'
//export { default as Tab } from './src/tab.js'
//export { default as Toast } from './src/toast.js'
//////export { default as Tooltip } from './src/tooltip.js'



/**
 * --------------------------------------------------------------------------
 * Main site js
 * --------------------------------------------------------------------------
 */

(function () {
  'use strict'

  var successMessage = ':) Ваша заявка принята,\n сейчас наш специалист Вам перезвонит.';
  var errorMessage = ':( Возникла непредвиденная ситуация.\n Ваша заявка не отправлена,\n попробуйте ещё раз.';

  const maskOptions = {
    mask: '+{7} (000) 000-00-00'
  };

  var inputs = document.querySelectorAll('[name="Phone"]');
  Array.prototype.slice.call(inputs)
  .forEach(function (inputPhone) {
    IMask(inputPhone, maskOptions); // https://imask.js.org/
  });

  var forms = document.querySelectorAll('.contact-form');

  Array.prototype.slice.call(forms)
    .forEach(function (form) {

      form.addEventListener('submit', async function (event) {
        event.preventDefault()
        event.stopPropagation()
        if (form.checkValidity()) {
          const city = form.dataset.city;
          let phone = form.querySelector('[name="Phone"]').value.replace(/\D/g, '').substr(-10, 10);
          let message;
          const inputMessage = form.querySelector('[name="Message"]');
          if (inputMessage !== null) {
            message = inputMessage.value;
          }
          await fetchMessage(city, phone, message).then((response) => {
            if (response.status == 200) {
              alert(successMessage);
              form.classList.remove('was-validated');
              form.reset();
            } else {
              alert(errorMessage);
            }
          });
        } else {
          form.classList.add('was-validated');          
        }           
      }, false)

    })

  async function fetchMessage(city, phone, message) {     

    let data;
    if (message == null) {
      data = { city: city, phone: phone };
    } else {
      data = { city: city, phone: phone, text: message };      
    }    
    const params = new URLSearchParams(data).toString();
    const url = `https://functions.yandexcloud.net/d4ehgtkcf9e302257mjc?${params}`;
  
    return await fetch(url);
  }  

})();
  