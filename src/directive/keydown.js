const keydown = {
    beforeMount: (el, binding) => {
        el._keydownCallback = event => {
            console.log('keydown', event.key)
            if (event.key === binding.arg) {
              binding.value()
            }
          }
        document.addEventListener('keydown', el._keydownCallback);
    },
    unmounted(el) {
        document.removeEventListener('keydown', el._keydownCallback);
        delete el._keydownCallback;
    }
}
export default keydown;