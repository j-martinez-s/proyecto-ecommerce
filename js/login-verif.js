//verificación del login

document.addEventListener("DOMContentLoaded", function () {
    const user = getLoggedInUser();
    if (!user && !loginPage()) {
      alert('Debe iniciar sesión para acceder al sitio.');
      window.location.href = "login.html";
    }
  });