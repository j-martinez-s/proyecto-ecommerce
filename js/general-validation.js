  // Funcion general de validacion de formularios

  function validacionGeneral(inputs) {
    let validado = true;
    inputs.forEach((input) => {
      if (input.checkValidity()) {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
      }
      else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
      }
      validado = validado && input.checkValidity();
    });
    return validado;
  }