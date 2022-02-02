/**
 * @author oasiao@cifpfbmoll.eu, smartinez@cifpfbmoll.eu
 * @version 1.0.0
 */

/**
 * objeto suscripción, que consta de una serie de variables y funciones
 * @type {{sub: Element, cerrarSuscripcion: suscripcion.cerrarSuscripcion, checkCookie: suscripcion.checkCookie, elementosOscurecer: string[], cargaForm: suscripcion.cargaForm, setCookie: suscripcion.setCookie, render: (function(): string), enviarSuscripcion: suscripcion.enviarSuscripcion, getCookie: ((function(): (string|string))|*)}}
 */

const suscripcion = {
    /**
     * variables globales obtenidas del DOM
     */

    sub: document.querySelector('.suscripcion'),
    elementosOscurecer: ['.header', '.video', '.novedades', '.promociones', '.calendario', '.footer'],

    /**
     * render() pinta el formulario de suscripción en caso de no existir cookie
     * @returns {string}
     */

    render: function () {

        return `
            <div class="form-sub">
            <div class="cerrar-boton">
                <button class="boton-cerrar"> X</button>
            </div>
            <form name="form" id="formSuscripcion">
                Suscripción <input id="email" type="text" name="suscripcion" placeholder="E-mail">
                <button id="submit" name="submit" value="Enviar">Enviar</button>
            </form>
            </div>`;
    },
    /**
     * cargaForm() se ejecuta a los 3 segundos de cargar el index.html
     */
    cargaForm: function () {
        setTimeout(() => {
            this.checkCookie();
        }, 3000);
    },

    /**
     * cerrarSuscripcion() cierra el form
     */
    cerrarSuscripcion: function () {
        document.querySelector('.boton-cerrar').addEventListener('click', function () {
            this.sub.classList.remove('suscripcion-mostrar');
            this.elementosOscurecer.forEach(elemento => {
                document.querySelector(elemento).classList.remove('opacidad-fondo');
            });
        }.bind(this));
    },
    /**
     * enviarSuscripcion() envia la sub una vez rellenada
     */

    enviarSuscripcion: function () {
        document.getElementById('submit').addEventListener('click', function () {
            event.preventDefault();
            let cookieValue = document.getElementById('email').value;
            this.setCookie(cookieValue);
            this.elementosOscurecer.forEach(elemento => {
                document.querySelector(elemento).classList.remove('opacidad-fondo');
                this.sub.classList.remove('suscripcion-mostrar');
            });
        }.bind(this));

    },
    /**
     * setCookie() crea la cookie
     * @param cookieValue
     */
    setCookie: function (cookieValue) {
        const d = new Date();
        d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = "email" + "=" + cookieValue + ";" + expires + ";path=/";
    },

    /**
     * getCookie() devuelve la cookie creada
     * @returns {string}
     */

    getCookie: function () {
        let name = "email" + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let documentCookie = decodedCookie.split(';');
        for (let i = 0; i < documentCookie.length; i++) {
            let fieldValue = documentCookie[i];
            while (fieldValue.charAt(0) === ' ') {
                fieldValue = fieldValue.substring(1);
            }
            if (fieldValue.indexOf(name) === 0) {
                return fieldValue.substring(name.length, fieldValue.length);
            }
        }
        return "";
    },

    /**
     * checkCookie() evalua si la cookie existe
     */

    checkCookie: function () {
        let user = this.getCookie();
        if (user === "" || user === null) {
            this.sub.innerHTML = this.render();
            this.sub.classList.add('suscripcion-mostrar');
            this.elementosOscurecer.forEach(elemento => {
                document.querySelector(elemento).classList.add('opacidad-fondo');
            });
            this.enviarSuscripcion();
            this.cerrarSuscripcion();
        }

    }
}
