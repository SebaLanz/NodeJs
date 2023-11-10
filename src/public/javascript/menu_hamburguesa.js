document.addEventListener('DOMContentLoaded', function () {
    var checkbox = document.getElementById('check');
    var ul = document.querySelector('nav ul');
  
    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        ul.style.left = '0';
      } else {
        ul.style.left = '-100%';
      }
    });
  
    // Cierra el menú si se hace clic en un enlace del menú
    var menuLinks = document.querySelectorAll('nav ul li a');
    menuLinks.forEach(function (link) {
      link.addEventListener('click', function (event) {
        // Verifica si el enlace está dentro del menú antes de cerrar el menú
        var isMenuLink = link.closest('nav ul') !== null;
        if (isMenuLink) {
          checkbox.checked = false;
          ul.style.left = '-100%';
        }
      });
    });
  });
  