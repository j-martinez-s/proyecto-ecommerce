// Función registro validado
(function regValidado() {
  const button = document.getElementById("logBtn");
  const relleneCampos = document.getElementById("relleneCampos");

  button.addEventListener("click", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email.trim() === '' || password.trim() === '') {
      validacionLogin();
    } else {
      // Si no hay campos vacíos, verifica las demás condiciones
      if (userExists(email, password)) {
        const userData = findUserByEmail(email);
        logIn(userData);
        window.location.href = "index.html";
      } else {
        // Muestra la alerta si algún campo está vacío
        debeRegistrarse.style.display = "block";
        console.log("Inicio de sesión fallido");
      }
    }
  }, false);
})();

// Validar campos del formulario
function validacionLogin() {
  const inputs = document.querySelectorAll('#formLog input');
  return validacionGeneral(inputs);
}

function userExists(email, password){
  const validUser = getAllUsers().find(user =>user.email === email && user.password === password);
  return validUser !== undefined;
}