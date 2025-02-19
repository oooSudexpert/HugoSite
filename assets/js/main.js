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
export { default as Collapse } from './src/collapse.js'
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


(() => {
    'use strict'
  
    const btnTitle = 'Copy to clipboard'
    const btnEdit = 'Edit on StackBlitz'
  
    const btnHtml = [
      '<div class="bd-code-snippet">',
      '  <div class="bd-clipboard">',
      '    <button type="button" class="btn-clipboard">',
      '      <svg class="bi" role="img" aria-label="Copy"><use xlink:href="#clipboard"/></svg>',
      '    </button>',
      '  </div>',
      '</div>'
    ].join('')
  
    document.addEventListener('click', (e) => {
      alert(`Координаты: (${e.clientX},${e.clientY})`)
    });

    // Wrap programmatically code blocks and add copy btn.
    document.querySelectorAll('.highlight')
      .forEach(element => {
        // Ignore examples made by shortcode
        if (!element.closest('.bd-example-snippet')) {
          element.insertAdjacentHTML('beforebegin', btnHtml)
          element.previousElementSibling.append(element)
        }
      })
  
    /**
     *
     * @param {string} message
     */
    function sendMessage(message) {

    }
  
  })()
  