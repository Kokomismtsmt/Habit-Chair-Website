const checkbox = document.getElementById('toggle_checkbox');
const root = document.documentElement;

checkbox.addEventListener('change', function() {
  if (this.checked) {
    root.classList.add('color-change');
  } else {
    root.classList.remove('color-change');
  }
});