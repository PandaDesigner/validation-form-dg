document.getElementById('formRegister').addEventListener('submit', (event) => {
  event.preventDefault();
  const isValid = validateForm();
  if (isValid) {
    console.log('Formulario enviado con éxito');
    alert(
      'Los datos del formulario son: \n' +
        'Nombre: ' +
        document.getElementById('name').value +
        '\n' +
        'Apellido: ' +
        document.getElementById('lastName').value +
        '\n' +
        'Documento: ' +
        document.getElementById('document').value +
        '\n' +
        'Email: ' +
        document.getElementById('email').value +
        '\n' +
        'Edad: ' +
        document.getElementById('age').value +
        '\n' +
        'Actividad: ' +
        document.getElementById('activity').value +
        '\n' +
        'Nivel de estudio: ' +
        document.getElementById('nivelEstudio').value +
        '\n' +
        'Términos y condiciones: ' +
        document.getElementById('terms').checked
    );
  }
});

function validateForm() {
  let isValid = true;

  // Validar campos de texto
  isValid = validateText('name') && isValid;
  isValid = validateText('lastName') && isValid;
  isValid = validateText('document') && isValid;

  // Validar email
  isValid = validateEmail('email') && isValid;

  // Validar edad
  isValid = validateAge('age') && isValid;

  // Validar selección
  isValid = validateSelect('activity') && isValid;
  isValid = validateSelect('nivelEstudio') && isValid;

  // Validar términos y condiciones
  isValid = validateCheckbox('terms') && isValid;

  return isValid;
}

function validateText(id) {
  const element = document.getElementById(id);
  const error = document.getElementById(`error${capitalize(id)}`);
  if (!element.value.trim()) {
    showError(error, 'Este campo es obligatorio.');
    return false;
  }
  if (element.value.trim().length <= 3) {
    showError(error, 'Debe tener al menos 3 caracteres.');
    return false;
  }
  hideError(error);
  return true;
}

function validateEmail(id) {
  const element = document.getElementById(id);
  const error = document.getElementById(`error${capitalize(id)}`);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(element.value)) {
    showError(error, 'Por favor ingrese un correo electrónico válido.');
    return false;
  }
  hideError(error);
  return true;
}

function validateAge(id) {
  const element = document.getElementById(id);
  const error = document.getElementById(`error${capitalize(id)}`);
  if (!element.value || isNaN(element.value) || element.value < 18) {
    showError(error, 'Debe ser mayor de 18 años.');
    return false;
  }
  hideError(error);
  return true;
}

function validateSelect(id) {
  const element = document.getElementById(id);
  const error = document.getElementById(`error${capitalize(id)}`);
  if (element.value === '0') {
    showError(error, 'Por favor seleccione una opción.');
    return false;
  }
  hideError(error);
  return true;
}

function validateCheckbox(id) {
  const element = document.getElementById(id);
  const error = document.getElementById(`error${capitalize(id)}`);
  if (!element.checked) {
    showError(error, 'Debe aceptar los términos y condiciones.');
    return false;
  }
  hideError(error);
  return true;
}

function showError(element, message) {
  element.textContent = message;
  element.classList.add('visible');
}

function hideError(element) {
  element.textContent = '';
  element.classList.remove('visible');
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
