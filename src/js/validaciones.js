import {login} from "./modules/loginSystem.mjs";
import {usuarios} from "./modules/usuarios.mjs";

const validaciones = {
    recargado: false,
    name : document.querySelector('.name'),
    email: document.querySelector('.email'),
    passwordLogIn: document.querySelector('.passwordLogIn'),
    password: document.querySelector('.password'),
    passwordRepetida: document.querySelector('.password2'),
    login: document.querySelector('.login'),
    signUp: document.querySelector('.signUp'),

    /*EYES FOR PASSWORD*/
    eyeOpen: document.querySelector('.eye-open'),
    eyeClosed: document.querySelector('.eye-closed'),
    eyeOpenSignUp1: document.querySelector('.eye-openSignUp1'),
    eyeClosedSignUp1: document.querySelector('.eye-closedSignUp1'),
    eyeOpenSignUp2: document.querySelector('.eye-openSignUp2'),
    eyeClosedSignUp2: document.querySelector('.eye-closedSignUp2'),
    /*DOM FOR LOGIN ERRORS*/
    errorEmail: document.querySelector('.error-email'),
    errorPassword : document.querySelector('.error-password'),

    /*DOM FOR SIGN UP ERRORS*/
    formSignUp : document.querySelector('#form-signUp'),
    errorName : document.querySelector('.error-name'),
    errorEmailSignUp: document.querySelector('.error-email-signUp'),
    errorPasswordSignUp : document.querySelector('.error-password-signUp'),
    errorPassword2 : document.querySelector('.error-password2'),

    insertarUsuario: function () {
      localStorage.setItem('usuarios', JSON.stringify([{
          email: 'adminadmin@adminer.com',
          name: 'admin',
          password: 'AdminAd123'
      }]));
    },

    validarLogIn: function (){
        this.login.addEventListener('click',function (){
            this.errorEmail.innerHTML = "";
            this.errorPassword.innerHTML = "";
            let passwordUser = true;
            let user = login.validarTodo(this.email.value,this.passwordLogIn.value);
            if (user[1]){
                document.cookie = `username=${user[0]};max-age=3600`; //la cookie durará 1h
                location.href = 'index.html';

            }
            else
            {
                usuarios.forEach(usuario => {
                    if (!login.passwordsIguales(this.passwordLogIn.value,usuario.password)){
                        passwordUser = false;
                    }

                });

                let emailUser = login.emailExiste(this.email.value);

                if (!emailUser){
                    this.errorEmail.style.display = "block";
                    this.errorEmail.innerHTML += "Esta cuenta no existe. Regístrate!";
                }


                if (!passwordUser){
                    this.errorPassword.style.display = "block";
                    this.errorPassword.innerHTML += "Contraseña incorrecta!";
                }

            }
        }.bind(this));
    },
    focusLogIn : function (){
        this.email.addEventListener('focusin',function(){
            this.errorEmail.style.display = "none";
        }.bind(this));

        this.passwordLogIn.addEventListener('focusin',function(){
            this.errorPassword.style.display = "none";
        }.bind(this));

    },
    registrar: function (){
        this.signUp.addEventListener('click',function (event){
            event.preventDefault();
            if (login.register(this.name.value,this.email.value,this.password.value,this.passwordRepetida.value)){
                usuarios.push({
                    email: this.email.value,
                    name: this.name.value,
                    password: this.password.value
                });

                //usuarios.pop();
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
                document.cookie = `username=${this.name.value};max-age=3600`;
                location.href = 'mensaje.html';
            }
            else
            {
                console.log('ERROR en el registrado');
            }
        }.bind(this));
    },
    validarRegistro: function () {

        this.name.addEventListener('focusin',function(){
            this.name.style.background = "#F2ECC6";
        }.bind(this));

        this.name.addEventListener('focusout',function(){
            if (login.validarName(this.name.value)){
                this.name.style.background = "#98fb98";
            }
            else{
                this.name.style.background = "#ffb6c1";
            }
        }.bind(this));

        this.email.addEventListener('focusin',function(){
            this.errorEmailSignUp.style.display = "none";
            this.email.style.background = "#F2ECC6";
        }.bind(this));

        this.email.addEventListener('focusout',function(){
            if(login.validarEmail(this.email.value)) {
                if (!login.emailExiste(this.email.value)) {
                    this.email.style.background = "#98fb98";
                }
                else{
                    this.errorEmailSignUp.style.display = "block";
                    this.errorEmailSignUp.innerHTML = "";
                    this.errorEmailSignUp.innerHTML += "Este correo ya esta registrado.";
                    this.email.style.background = "#ffb6c1";
                }
            }
            else{
                this.errorEmailSignUp.style.display = "block";
                this.errorEmailSignUp.innerHTML = "";
                this.errorEmailSignUp.innerHTML += "Patrón incorrecto: ha de tener @; 5-10 caracteres en subdominio" +
                    "y acabar en .net, .com o .gov";
                this.email.style.background = "#ffb6c1";
            }
        }.bind(this));

        this.password.addEventListener('focusin',function(){
            this.errorPasswordSignUp.style.display = "none";
            this.password.style.background = "#F2ECC6";
        }.bind(this));

        this.password.addEventListener('focusout',function(){
            if(login.validarPassword(this.password.value)){
                this.password.style.background = "#98fb98";
            }
            else {
                this.errorPasswordSignUp.style.display = "block";
                this.errorPasswordSignUp.innerHTML = "";
                this.errorPasswordSignUp.innerHTML += "Patrón incorrecto: primera letra en mayúscula, 6-8 caracteres y " +
                    "ha de acabar en 2 cifras";
                this.password.style.background = "#ffb6c1";
            }
        }.bind(this));

        this.passwordRepetida.addEventListener('focusin',function (){
            this.errorPassword2.style.display = "none";
            this.passwordRepetida.style.background = "#F2ECC6";
        }.bind(this));

        this.passwordRepetida.addEventListener('focusout', function(){
            if (login.passwordsIguales(this.password.value, this.passwordRepetida.value)) {
                this.passwordRepetida.style.background = "#98fb98";
            } else
            {
                this.errorPassword2.style.display = "block";
                this.errorPassword2.innerHTML = "";
                this.errorPassword2.innerHTML += "Contraseña no coincide con la anterior."
                this.passwordRepetida.style.background = "#ffb6c1";
            }
        }.bind(this));
    },
    eyesPassword : function (){
        /*LOG IN PASSWORD*/
        if (screen.width>=1050){
            this.eyeOpen.addEventListener('mousedown',function(){
                event.preventDefault();
                this.eyeOpen.style.display = "none";
                this.eyeClosed.style.display = "block";
                this.passwordLogIn.type = "text";
            }.bind(this));

            this.eyeClosed.addEventListener('mouseup',function (){
                event.preventDefault();
                this.eyeOpen.style.display = "block";
                this.eyeClosed.style.display = "none";
                this.passwordLogIn.type = "password"
            }.bind(this));
        }
        else{
            this.eyeOpen.addEventListener('click',function(){
                event.preventDefault();
                this.eyeOpen.style.display = "none";
                this.eyeClosed.style.display = "block";
                this.passwordLogIn.type = "text";
            }.bind(this));

            this.eyeClosed.addEventListener('click',function (){
                event.preventDefault();
                this.eyeOpen.style.display = "block";
                this.eyeClosed.style.display = "none";
                this.passwordLogIn.type = "password"
            }.bind(this));
        }

    },
    eyesSignUp : function(){
        if (screen.width>=1050){
            /*SIGN UP PASSWORD*/
            this.eyeOpenSignUp1.addEventListener('mousedown',function(){
                event.preventDefault();
                this.eyeOpenSignUp1.style.display = "none";
                this.eyeClosedSignUp1.style.display = "block";
                this.password.type = "text";
            }.bind(this));

            this.eyeClosedSignUp1.addEventListener('mouseup',function (){
                event.preventDefault();
                this.eyeOpenSignUp1.style.display = "block";
                this.eyeClosedSignUp1.style.display = "none";
                this.password.type = "password"
            }.bind(this));

            /*SIGN UP PASSWORD 2*/
            this.eyeOpenSignUp2.addEventListener('mousedown',function(){
                event.preventDefault();
                this.eyeOpenSignUp2.style.display = "none";
                this.eyeClosedSignUp2.style.display = "block";
                this.passwordRepetida.type = "text";
            }.bind(this));

            this.eyeClosedSignUp2.addEventListener('mouseup',function (){
                event.preventDefault();
                this.eyeOpenSignUp2.style.display = "block";
                this.eyeClosedSignUp2.style.display = "none";
                this.passwordRepetida.type = "password"
            }.bind(this));

        }
        else {
            this.eyeOpenSignUp1.addEventListener('click',function(){
                console.log("hola");
                event.preventDefault();
                this.eyeOpenSignUp1.style.display = "none";
                this.eyeClosedSignUp1.style.display = "block";
                this.password.type = "text";
            }.bind(this));

            this.eyeClosedSignUp1.addEventListener('click',function (){
                event.preventDefault();
                console.log("hola");
                this.eyeOpenSignUp1.style.display = "block";
                this.eyeClosedSignUp1.style.display = "none";
                this.password.type = "password"
            }.bind(this));

            /*SIGN UP PASSWORD 2*/
            this.eyeOpenSignUp2.addEventListener('click',function(){
                event.preventDefault();
                this.eyeOpenSignUp2.style.display = "none";
                this.eyeClosedSignUp2.style.display = "block";
                this.passwordRepetida.type = "text";
            }.bind(this));

            this.eyeClosedSignUp2.addEventListener('click',function (){
                event.preventDefault();
                this.eyeOpenSignUp2.style.display = "block";
                this.eyeClosedSignUp2.style.display = "none";
                this.passwordRepetida.type = "password"
            }.bind(this));
        }

    },
}

if (location.pathname === '/timeInn_p2/src/logIn.html'){
    validaciones.validarLogIn();
    validaciones.focusLogIn();
    validaciones.eyesPassword();
}
else if (location.pathname === '/timeInn_p2/src/signUp.html'){
    validaciones.insertarUsuario();
    if(usuarios === null) {
        location.reload();
    }
    validaciones.registrar();
    validaciones.eyesSignUp();
}

validaciones.validarRegistro();


