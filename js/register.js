//Función registro validado

(function regValidado() {
  const button = document.getElementById("regBtn");
 

  button.addEventListener("click", function (event) {
    event.preventDefault();
    const username = document.getElementById("newUsername").value;
    if (validacionReg()) { 
      setSession(username);
    }
  }, false)
})()

//Validar campos del form
function validacionReg() {
  let validado = true;
  const inputs = document.querySelectorAll('#formReg input');
  validado = validacionGeneral(inputs);
  if( !validado ){
    document.querySelector('#formReg').classList.add('was-validated');
    return; 
  }
  
  const password1 = document.querySelector('#newPassword');
  const password2 = document.querySelector('#newPassword2');
        
  if( password1.value !== password2.value){
    password2.setCustomValidity("not-equals");
    validado = false;
  }else{
    password2.setCustomValidity("");
  }

  document.querySelector('#formReg').classList.add('was-validated');
  return validado;
}


function setSession(){
  const username = document.getElementById("newUsername").value;
  const email = document.getElementById("newEmail").value;
  const password = document.getElementById("newPassword").value;
  var users = JSON.parse(localStorage.getItem('users')) || [];
 
  const lastUserId = users.length > 0 ? users[users.length - 1].id : 0;

  const uniqueId = lastUserId + 1;

  const isUserReg = users.find(user=>user.email === email)
  if(isUserReg){
    return alert('Ya existe un usuario con este email');
  }

  users.push({id:uniqueId, 
    username: username, 
    email: email, 
    password: password, 
    productosCompras: [],
    image: "https://upload-os-bbs.hoyolab.com/upload/2021/06/06/88263151/71d283e275d50b1c062ab1209abfbb88_6495069170749187107.jpg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_80"
  });
  
  localStorage.setItem('users', JSON.stringify(users))
  window.location.href = 'login.html';

}


