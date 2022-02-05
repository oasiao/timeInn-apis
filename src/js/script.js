/**
 * @author oasiao@cifpfbmoll.eu, smartinez@cifpfbmoll.eu
 * @version 1.0.0
 */
//import {promociones} from "./modules/promociones.js";
//import {novedades} from "./modules/novedades.js";
import {calendario} from "./modules/calendario.js";



const app = {
    /**
     * obtiene los valores del DOM para operar con ellos
     */
    novedades: document.querySelector('.cartas-novedades'),
    promociones: document.querySelector('.cartas-promociones'),
    calendario: document.querySelector('.calendario'),
    /**
     * renderiza las novedades del módulo novedades.js
     */
    renderNovedades: function () {

        const novedades = async () => {
            const url = "http://localhost:3003/novedades";
            let response = await fetch(url);
            return await response.json();
        }

        novedades().then(novedades => {
            novedades.sort(function (a, b) {
                if (b.Year > a.Year) {
                    return 1;
                }
                if (b.Year < a.Year) {
                    return -1;
                }
                return 0;
            }).forEach(novedad => {
                this.novedades.innerHTML += `<div class="novedad">
                                            <img src="${novedad.Poster}" alt="${novedad.Title}">
                                            <h2>${novedad.Title}</h2>
                                            <p>${novedad.Year}</p>
                                        </div>`});
        });

    },
    /**
     * renderiza las promociones
     */
    renderPromociones: function () {
        const promociones = async () => {
            const url = "http://localhost:3003/promociones";
            let response = await fetch(url);
            return await response.json();
        }

        promociones().then(promociones => {
            promociones.forEach(promocion => {
                this.promociones.innerHTML += `<div class="promocion">
                                            <img src="${promocion.Poster}" alt="${promocion.Titulo}">
                                            <h2>${promocion.Titulo}</h2>
                                        </div>`;
            })
        })
    },
    /**
     * renderiza el calendario del módulo
     */
    renderCalendario: function () {
        this.calendario.innerHTML += calendario.calendario();
    },
    getCookie:function (){
        let name = "token=";
        let ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    checkCookie: function (){
        let token = this.getCookie();
        if (token !== "") {
            this.renderNovedades();
            this.renderPromociones();
        }
        else{
            document.getElementById('novedades').innerHTML = '';
            document.getElementById('promociones').innerHTML =
                `
                <div class="w3-panel w3-pale-yellow w3-border"> 
                <p><a href="signUp.html">REGÍSTRATE</a> O 
                <a href="logIn.html">LOGGEATE</a> PARA VER LOS EVENTOS Y PROMOCIONES
                </p></div>
            `;

        }
    }

}

app.checkCookie();

/*
app.renderNovedades();
app.renderPromociones();*/
app.renderCalendario();
