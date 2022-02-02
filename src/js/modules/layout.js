const layout = {
    menu: ["home", "novedades", "cartelera", "promociones", "zona ocio"],
    getUsername: function(name){
        let cookieArr = document.cookie.split(";");
        let username = "";
        let encontrado = false;
        cookieArr.forEach(elem => {
            let cookiePair = elem.split("=");
            if (name === cookiePair[0].trim()){
                username = decodeURIComponent(cookiePair[1]);
                encontrado = true;
            }
        })

        if (encontrado){
            return username;
        }
        else{
            return "";
        }
    },
    header: function () {
        let output = "";
        output+=`<div class="bar-menu">
            <div class="logo">
                <a href="index.html"><img src="img/logoPalmimax.png" alt="Logo"></a>`

        if (screen.width >= 1050){
            if (this.getUsername('username') !== ""){
                output +=
                    `<div class="login">
                        <div class="logged-name">Hola, ${this.getUsername('username')}</div>
                        <button class="logOut">Log Out</button>
                    </div>`
            }
            else {
                output +=
                    `<div class="login">
                        <a href="logIn.html">Log In</a>
                        <a href="signUp.html">Sign Up</a>
                    </div>`
            }
        }
        output+=`</div>
            <button id="hamburger"><i class="fas fa-bars"></i></button>
            <button id="x">X</button>
        </div>
        
        <div class="menu">
            ${this.renderMenu()}
        </div>`

        return output;
    },
    footerBar: `<div class="footer-bar"><button><i class="fas fa-ellipsis-h"></i></button></i></div>`,
    footer: `
        <div class="footer-fields">
            <div class="col-1">
                <div class="col-1-title">Sobre nosotros</div>
                <div class="col-1-content">Somos Kim y Santi, un grupo de desarrolladores mallorquines en el ámbito web. Nuestra finalidad reside en pasarlo bien
                 juntos mientras trabajamos en proyectos de clase el máximo tiempo que podamos. También nos picamos mucho por ver quién se equivoca más o quién resuelve
                 más rápido un conflicto y, por ello, somos una gran pareja de trabajo y vamos a por el 10 de DWEC siempre que se pueda. ¡Un saludo a @classicoman2!
                </div>
            </div>
            <div class="col-2">
                <input type="button" value="Términos y condiciones"/>
                <input type="button" value="Aviso legal"/>
                <input type="button" value="Política de cookies"/>
                <div class="col-2-redesSociales">
                    <i class="fab fa-facebook-square"></i>
                    <i class="fab fa-instagram-square"></i>
                    <i class="fab fa-twitter-square"></i>
                    <i class="fab fa-youtube"></i>
                </div>
            </div>
            <div class="col-3">
                <input type="button" value="Métodos de pago"/>
                <div class="col-3-metodosPago">
                    <i class="fab fa-cc-amex"></i>
                    <i class="fab fa-cc-visa"></i>
                    <i class="fab fa-cc-mastercard"></i>
                    <i class="fab fa-cc-paypal"></i>
                </div>
                <input type="button" value="Preguntas frecuentes"/>
                <input type="button" value="Contacto"/>
            </div>
        </div>`,
    renderMenu: function () {
        let output = `<ul>`;
        this.menu.forEach(section => {
            if (section === "cartelera") {
                output += `<button><a href="cartelera.html"><li>${section}</li></a></button>`
            } else if(section === "home"){
                output += `<button><a href="index.html"><li>${section}</li></a></button>`
            } else {
                output += `<button><a href="#${section}" class="buts"><li>${section}</li></a></button>`;
            }
        })
        output += `</ul>`;

        if (screen.width < 1050){
            if (this.getUsername('username') !== ""){
                    output += `<div class="log">`;
                    output += `<div class="logged-name">Hola, ${this.getUsername('username')}</div>`;
                    output += `<button class="logOut">Log Out</button>`;}
            else{
                output += `<div class="log">`;
                output += `<a href="logIn.html" class="buts"><li>log in</li></a>`;
                output += `<a href="signUp.html" class="buts"><li>sign up</li></a></div>`;
                }
            }

        return output;
    },
    render: function () {
        document.getElementsByClassName("header")[0].innerHTML += this.header();
        document.getElementsByClassName("footer")[0].innerHTML += this.footerBar;
        document.getElementsByClassName("footer")[0].innerHTML += this.footer;
        this.buttons();
    },

    /* Menu para el mobile responsive. Por este motivo, miramos si el screen del cliente es menor a 1050px */
    buttons: function () {
            document.getElementById('hamburger').addEventListener('click', function () {
                if (screen.width < 1050) {
                    document.querySelector('.menu').style.display = 'block';
                    document.getElementById('x').style.display = 'block';
                    document.getElementById('hamburger').style.display = 'none';
                }
            });

        document.getElementById('x').addEventListener('click', function () {
            if (screen.width < 1050){
                document.querySelector('.menu').style.display = 'none';
                document.getElementById('hamburger').style.display = 'block';
                document.getElementById('x').style.display = 'none';
            }
        });

        document.querySelectorAll('.buts').forEach(but => but.addEventListener('click', function () {
            if (screen.width < 1050){
                document.querySelector('.menu').style.display = 'none';
                document.getElementById('hamburger').style.display = 'block';
                document.getElementById('x').style.display = 'none';
            }
        }));

        document.querySelector('.footer-bar').addEventListener('click', function () {
            if (screen.width < 1050){
                document.querySelector('.footer-fields').style.display = 'grid';
                document.querySelector('.footer-bar').style.display = 'none';
            }

        });

        if (location.pathname === '/timeInn_p2/src/index.html'){
            if (this.getUsername() !== null || this.getUsername() !== ""){
                this.cerrarSesion();
            }
        }


    },

    cerrarSesion : function (){
        document.querySelector('.logOut').addEventListener('click', function(){
            document.cookie = `username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; email=${this.getUsername('email')}`;
            location.href="index.html";
        }.bind(this));
    }
}