/**
 * @author oasiao@cifpfbmoll.eu, smartinez@cifpfbmoll.eu
 * @version 1.0.0
 */
/**
 * detecta cuando la ventana se mueve para determinar el scroll
 */
window.onscroll = function () {
    scrollOnTop.visualizarScroll()
}
/**
 * objeto que determina cuándo ha de aparecer el scroll
 * @type {{visualizarScroll: scrollOnTop.visualizarScroll, scrollTop: scrollOnTop.scrollTop}}
 */
const scrollOnTop = {
    /**
     * visualiza el scroll en pantalla al superar el scroll un tamaño X
     */
    visualizarScroll: function () {

        const boton = document.querySelector('.scroll');

        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            boton.style.display = "block";
        } else {
            boton.style.display = "none";
        }
    },
    /**
     * botón que permite que el scroll vaya al principio mediante un botón
     */
    scrollTop: function () {
        document.querySelector('.scroll').addEventListener('click', function () {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        })
    }
}
scrollOnTop.scrollTop();

