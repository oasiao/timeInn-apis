/**
 * @author oasiao@cifpfbmoll.eu, smartinez@cifpfbmoll.eu
 * @version 1.0.0
 */
//import {cartelera} from './modules/cartelera.js';
import {imageAsButton} from './modules/movieDescription.js';

const renderCartelera = {
    /**
     * variables que obtienen elementos del DOM
     */
    cartelera: document.querySelector('.cartelera'),
    elementosOscurecer: ['.header', '.cartelera', '.footer'],
    modal: document.querySelector('.modal-contenedor'),
    scroll: document.querySelector('.scroll'),
    add: document.querySelector('#add'),
    edit: document.querySelector('#submit'),
    /**
     * renderiza la cartelera a prueba de errores
     */

    renderCartelera: function () {

        const movies = async () => {
            const url = "http://localhost:3003/movies";
            let response = await fetch(url);
            return await response.json();
        }


        let tituloRep = "";

        this.cartelera.innerHTML += `<h2 class="carteleraTitulo">CARTELERA</h2>`;

        movies().then(peliculas => {
            let contador = 1;
            peliculas.forEach(pelicula => {
                this.cartelera.innerHTML += this.renderPeliculas(pelicula,contador);
                contador++;
            });
            this.listenerBotones();
        });

    },
    /**
     * listener de los botones mediante un addEventListener()
     */
    listenerBotones: function () {

        const botones = document.querySelectorAll('.edicion');
        const peliculas = document.querySelectorAll('.pelicula');

        botones.forEach(boton => {
            boton.addEventListener('click', function () {

                peliculas.forEach(pelicula => {
                    if (boton.getAttribute('id') === pelicula.getAttribute('id')) {
                        if (boton.getAttribute('name') === 'borrar') {
                            this.borrarCarta(pelicula);
                        } else {
                            document.getElementById('form').reset();
                            this.mostrarFormEdicion(pelicula.getAttribute('name'));
                        }
                    }
                })
            }.bind(this))
        });

        imageAsButton();
        this.back();
    },
    /**
     * borra la película de la lista
     * @param carta
     */
    borrarCarta: function (carta) {
        const deleteMovie = async () => {
            const url = `http://localhost:3003/movies/${carta.getAttribute('id')}`;
            const settings = {
                method: 'DELETE'
            };
            let response = await fetch(url, settings);
            location.reload();
        }
        deleteMovie().catch(e => {
            console.error(e)
        });

    },
    /**
     * muestra el formulario de edición
     * @param pelicula
     */
    mostrarFormEdicion: function (pelicula) {

        const movies = async () => {
            const url = "http://localhost:3003/movies";
            let response = await fetch(url);
            return await response.json();
        }


        this.elementosOscurecer.forEach(elemento => {
            document.querySelector(elemento).classList.add('opacidad-fondo');
        });

        this.edit.style.display = "block";
        this.add.style.display = "none";
        this.modal.style.display = "block";
        this.scroll.style.display = "none";
        let inputForms = document.querySelectorAll('.inputForm');

        movies().then(movies => {
            let id = "";
            movies.forEach(carta => {
                if (carta.Title === pelicula) {
                    id = carta.id;
                    inputForms.forEach(input => {
                        for (let key in carta) {
                            if (input.getAttribute('name') === key) {
                                input.value = carta[key];
                            }
                        }
                    });
                }
            });
            this.editarCarta(id);
        });


    },
    /**
     * cierra la ventana del formulario
     */
    cerrarVentana: function () {
        document.querySelector('.boton-cerrar').addEventListener('click', function () {
            this.elementosOscurecer.forEach(elemento => {
                document.querySelector(elemento).classList.remove('opacidad-fondo');
            });
            this.modal.style.display = "none";
            this.scroll.style.display = "block";
        }.bind(this));
    },
    /**
     * edita la carta hacía la cartelera
     * @param pelicula
     */
    editarCarta: function (pelicula) {
        document.getElementById('submit').addEventListener('click', function () {
            console.log(pelicula);

            const formId = document.getElementById('form');
            const form = new FormData(formId);
            let formObject = {};

            if (this.camposValidados()) {
                form.forEach((value, key) => {
                    formObject[key] = value;
                });

                formObject['Poster'] = `img/subir/${formObject.Poster.name}`

                const editMovie = async (formObject) => {
                    const url = `http://localhost:3003/movies/${pelicula}`;
                    const requestOptions = {
                        method: 'PUT',
                        body: JSON.stringify(formObject),
                        headers: {
                            'Content-Type': 'application/json'
                        },

                    };

                    let response = await fetch(url, requestOptions);
                    location.reload();
                }

                editMovie(formObject).catch(e => {
                    console.error(e)
                });
            }

            this.elementosOscurecer.forEach(elemento => {
                document.querySelector(elemento).classList.remove('opacidad-fondo');
            });

            this.modal.style.display = "none";
            this.scroll.style.display = "block";

            /*this.renderNuevaCartelera(form.get('Title'), form.get('Genre'), form.get('Year'),
                form.get('Runtime'), form.get('Poster'), form.get('Plot'), form.get('Director'), form.get('Released'),
                form.get('Writer'), form.get('Actors'), form.get('Awards'), form.get('imdbRating'), pelicula);*/

        }.bind(this));

    },
    /**
     * renderiza la nueva cartelera
     * @param Title
     * @param Genre
     * @param Year
     * @param Runtime
     * @param Poster
     * @param Plot
     * @param Director
     * @param Released
     * @param Writer
     * @param Actors
     * @param Awards
     * @param imdbRating
     * @param pelicula
     */
    renderNuevaCartelera: function (Title, Genre, Year, Runtime, Poster, Plot, Director, Released, Writer, Actors, Awards, imdbRating, pelicula) {

        cartelera.forEach(carta => {
            if (carta.Title === pelicula) {
                carta.Title = Title;
                carta.Genre = Genre;
                carta.Year = Year;
                carta.Runtime = Runtime;
                if (Poster.name.includes('.jpg') || Poster.name.includes('.png') || Poster.name.includes('.jpeg')) {
                    carta.Poster = `img/subir/${Poster.name}`;
                }
                carta.Plot = Plot;
                carta.Director = Director;

                if (Released !== "") {
                    carta.Released = Released;
                }
                carta.Writer = Writer;
                carta.Actors = Actors;
                carta.Awards = Awards;
                carta.imdbRating = imdbRating;
                this.cartelera.innerHTML = "";
                this.renderCartelera();
                this.listenerBotones();
                this.back();
                this.filter();
                document.getElementById('form').reset();
            }
        });

    },
    /**
     * muestra el formulario de añadir película
     */
    mostrarFormAnadir: function () {
        document.querySelector('.add-button').addEventListener('click', function () {
            document.getElementById('form').reset();
            this.elementosOscurecer.forEach(elemento => {
                document.querySelector(elemento).classList.add('opacidad-fondo');
            });
            this.modal.style.display = "block";
            this.edit.style.display = "none";
            this.add.style.display = "block";
            this.scroll.style.display = "none";
            this.anadirElemento();
        }.bind(this));
    },
    /**
     * añade un elemento a la cartelera
     */
    anadirElemento: function () {
        document.getElementById('add').addEventListener('click', function () {
            const formId = document.getElementById('form');
            const form = new FormData(formId);
            let formObject = {};

            if (this.camposValidados()) {

                form.forEach((value, key) => {
                    formObject[key] = value;
                });

                formObject['Poster'] = `img/subir/${formObject.Poster.name}`

                const addMovie = async (formObject) => {
                    const url = "http://localhost:3003/movies";
                    const settings = {
                        method: 'POST',
                        body: JSON.stringify(formObject),
                        headers: {
                            'Content-Type': 'application/json'
                        },

                    };
                    let response = await fetch(url, settings);
                    console.log(await response.json());
                    location.reload();
                }

                addMovie(formObject).catch(e => {
                    console.error(e)
                });

                this.elementosOscurecer.forEach(elemento => {
                    document.querySelector(elemento).classList.remove('opacidad-fondo');
                });

                this.edit.style.display = "block";
                this.add.style.display = "none";
                this.modal.style.display = "none";
                this.scroll.style.display = "block";

                this.cartelera.innerHTML = "";

                this.renderCartelera();
                this.listenerBotones();
                this.filter();
            }


        }.bind(this))
    },
    /**
     * filtra películas por género, año o título
     */
    filter: function () {
        const movies = async () => {
            const url = "http://localhost:3003/movies";
            let response = await fetch(url);
            return await response.json();
        }

        document.getElementById("filterButton").addEventListener('click', function () {
            let contador = 0;
            let filter = document.getElementById('filterInput').value;
            filter = filter.toLowerCase();
            let select = document.getElementById('filter');
            let option = select.options[select.selectedIndex].value;
            this.cartelera.innerHTML = `<h1>CARTELERA</h1>`;
            movies().then(peliculas =>
                peliculas.forEach(pelicula => {
                if (option === 'ID') {
                    if (pelicula.id == filter) {
                        this.cartelera.innerHTML = this.renderPeliculas(pelicula);
                        contador++;
                        console.log(contador);
                    }
                } else if (option === 'Title') {
                    let titulo = pelicula.Title.toLowerCase();
                    if (titulo.includes(filter)) {
                        this.cartelera.innerHTML += this.renderPeliculas(pelicula);
                        contador++;
                    }
                } else if (option === 'Genre') {
                    let genero = pelicula.Genre.toLowerCase();
                    if (genero.includes(filter)) {
                        this.cartelera.innerHTML += this.renderPeliculas(pelicula);
                        contador++;
                    }
                } else {
                    console.log("ERROR");
                }
            })).then(()=>{
                if (contador === 0) {
                    document.querySelector('.cartelera').innerHTML = `No hay resultados para tu búsqueda.`;
                }
            });

            document.getElementById('cleanFilter').style.display = "block";




            this.cleanFilter();
            this.listenerBotones();
            this.filter();

        }.bind(this));

    },
    /**
     * limpia el filtro
     */
    cleanFilter: function () {
        document.getElementById('cleanFilter').addEventListener('click', function () {
            document.getElementById('cleanFilter').style.display = "none";
            document.getElementById('filterInput').value = "";
            this.cartelera.innerHTML = "";
            this.filter();
            this.renderCartelera();
            this.listenerBotones();

        }.bind(this));
    },
    renderPeliculas: function (pelicula) {
        return `<div id="${pelicula.id}" class="pelicula" name="${pelicula.Title}" >
                                            <div id="${pelicula.id}" class="img-container" name="${pelicula.Title}" ><img src="${pelicula.Poster}" alt="${pelicula.Title}"></div>
                                            
                                            <div class="text-content">
                                                <h2 class="titulo-pelicula">${pelicula.Title}</h2>
                                                <h3 class="subtitulo-pelicula">${pelicula.Genre} / 
                                                ${pelicula.Year} / ${pelicula.Runtime}</h3>
                                            
                                            <br><div class="horarios">DIGITAL
                                                    <button>15:50</button>
                                                    <button>20:25</button>                                                
                                            </div>
                                            <div class="ediciones">
                                            <button id="${pelicula.id}" class="edicion" name="editar"><i class="far fa-edit"></i></button>
                                            <button id="${pelicula.id}" class="edicion" name="borrar"><i class="far fa-trash-alt"></i></button>
                                            </div>
                                            </div>
                                         </div>`;

    },
    /**
     * valida los campos del formulario
     * @returns {boolean}
     */
    camposValidados: function () {
        let inputForms = document.querySelectorAll('.inputForm');
        let validated = true;
        inputForms.forEach(input => {
            if (input.value === "" || input.value === null) {
                validated = false;
                input.classList.add('campoVacio');
            } else {
                input.classList.remove('campoVacio');
            }
        });

        return validated;
    },
    /**
     * función para cerrar el filtro
     */
    back: function () {
        document.getElementById('back').addEventListener('click', function () {
            document.querySelector('.filter').style.display = "flex";
            document.querySelector('.add-button').style.display = "block";
            document.querySelector('.divBack').style.display = "none";
            document.querySelector('.pelicula-content').innerHTML = "";
            this.cartelera.innerHTML = "";
            this.renderCartelera();
            imageAsButton();
            this.listenerBotones();
            this.filter();
        }.bind(this));
    }
}

renderCartelera.renderCartelera();
renderCartelera.listenerBotones();
renderCartelera.cerrarVentana();
renderCartelera.mostrarFormAnadir();
renderCartelera.filter();