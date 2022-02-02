/**
 * @author oasiao@cifpfbmoll.eu, smartinez@cifpfbmoll.eu
 * @version 1.0.0
 */
import {promociones} from "./modules/promociones.js";
import {novedades} from "./modules/novedades.js";
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

        const ordenado = novedades.sort(function (a, b) {
            if (b.Year > a.Year) {
                return 1;
            }
            if (b.Year < a.Year) {
                return -1;
            }
            return 0;
        });

        ordenado.forEach(novedad => {
            this.novedades.innerHTML += `<div class="novedad">
                                            <img src="${novedad.Poster}" alt="${novedad.Title}">
                                            <h2>${novedad.Title}</h2>
                                            <p>${novedad.Year}</p>
                                        </div>`;
        });
    },
    /**
     * renderiza las promociones
     */
    renderPromociones: function () {
        promociones.forEach(promocion => {
            this.promociones.innerHTML += `<div class="promocion">
                                            <img src="${promocion.Poster}" alt="${promocion.Titulo}">
                                            <h2>${promocion.Titulo}</h2>
                                        </div>`;
        })
    },
    /**
     * renderiza el calendario del módulo
     */
    renderCalendario: function () {
        this.calendario.innerHTML += calendario.calendario();
    },

}
app.renderNovedades();
app.renderPromociones();
app.renderCalendario();