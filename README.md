# TIMEINN_P2 (PALMIMAX)

### AUTORES:
- **Onika Kim Asiao Dumbrique**
- **Santiago Esaúl Martínez Bota**

### DEADLINE: 28/11/2021


### LINK TO GITHUB
https://github.com/santimb96/timeInn_p2.git

### LINK TO WIREFRAME
https://balsamiq.cloud/sqerry8/p4qk1uw

### LINK TO VIDEO
https://drive.google.com/file/d/16VBfBL7d_udu_gfToFSireZs9S17zH90/view?usp=sharing

## INTRODUCCIÓN

Nos encontramos en el segundo proyecto de Desarrollo Web en Entorno Cliente
y Desarrollo de Interficies Web. En este se ponen encima de la mesa conocimientos
ya practicados en el primer proyecto y se añaden de nuevos, como la aplicación de arrays,
programación orientada a objetos, modularidad de la aplicación; transiciones, cartas, webs adaptativas,
llamadas a cargadores, etc.

En este proyecto se trata de recrear un emplazamiento web orientado al cine, ofreciendo las novedades,
promociones y demás. Además, también se añade una página específica para la cartelera,
en donde se imprimen objetos mediante estructura web y de estilos. Por lo tanto, se pone en práctica
la implementación de webs dinámicas, en donde se separan las estructuras del almacenamiento y
estas acceden a los ficheros mediante llamadas (_callbacks_).

## EXPERIENCIA DE USUARIO

Es importante recrear una web sencilla para el usuario, que sea amigable
para su uso diario. Para ello, hemos cogido como referencia la web de www.aficine.com,
haciendo uso de algunas de sus promociones y referencias varias pero dándole nuestro toque personal.

Por otra parte, la web se denomina Palmimax, en referencia a Ocimax, un centro de ocio situado en
Palma de Mallorca. Sin embargo, tanto paleta de colores como fuentes son totalmente distintas, así como el
contenedor padre, que tiene un background determinado que Aficine, por ejemplo, lo establece como imagen y contenedor.
En nuestro caso, usamos una paleta minimalista porque encontramos que se mantiene con esta
una elegancia y discreción que hacen de la interfaz algo atractivo de ver. Simple, pero efectivo.

Encontramos que, para la experiencia de usuario, hemos recreado bien la interfaz que comparten
múltiples plataformas web del sector.

## PALETA DE COLORES Y FONTS TEMPLATE

### Paleta de colores
![Image text](https://github.com/santimb96/timeInn_p2/blob/feature/kimDevelop/src/docs/paleta/paleta-colores.PNG)

### Fonts template
![Image text](https://github.com/santimb96/timeInn_p2/blob/feature/kimDevelop/src/docs/fuentes/font-templates.PNG)

## FRONT PAGE

En este encontramos un nav bar el cual contiene una serie de secciones (enlaces) a visitar,
las cuales solo funcionarán aquellos que redirigen al _index.html_ y al que redirige a la _cartelera.html_.

Por otra parte, hemos enlazado un vídeo de YouTube de un estreno en cartelera de 2011 que nos parecía
bastante atractivo para el front page debido a los colores que aparecen en este tráiler. Por defecto,
el vídeo está sin sonido para no molestar al usuario que entre en la página con un sonido que
no desee tal vez escuchar.

En cuanto a la sección de novedades, hemos decidido que tratará sobre las películas que se esperan
en el cine, por estrenar independientemente del año de creación de esta.
Se han hecho una serie de cartas con una temática limpia y minimalista basada en blancos y negros,
con ligeros toques de sombra al hacer una transición al eje Y hacia arriba.

Las promociones constan de 6 cartas las cuales muestran las distintas ofertas que ofrece
el cine, con mensajes sugerentes en tono humorístico.

Por otra parte, el calendario es dinámico: se posiciona en el día en el que nos encontramos y, además,
enlaza este mismo con la cartelera.

Por último, el footer consta de un _Sobre nosotros_ y demás campos usuales. En nuestro caso, en la versión móvil está comprimido
para mejorar la experiencia de usuario, de manera que si este quiere ver el contenido del footer, lo
desplegará; si no lo quiere ver, se quedará tal y como está.

## CARTELERA

En esta página se encuentra el peso de la aplicación.

Esta consta del mismo _nav bar_ que en el _index.html_ y, por lo tanto, funciona de la misma manera.

Por otra parte y antes de renderizar la cartelera, tiene un buscador que te permite filtrar las películas por
año, género y título, de manera que tú puedes escoger por qué campo filtrar y llevarlo a cabo. El resultado
es que se te imprime el objeto u objetos que coinciden con este campo sin necesidad de refrescar la página
o de emplear otra externa.

En relación a las cartas, se muestra una información escueta más que suficiente para, por ejemplo, comprar
una entrada de cine: cartel, título, año, botones con horarios (sin funcionalidad), y los botones de editar y borrar
la misma carta, ya que esta página esta en modo administrador (requisito detallado en el enunciado de la práctica).
La peculiaridad que tienen estas recae en que si presionas sobre la imagen de la carta, se muestra una
descripción de la película y solo ese objeto sin necesidad de cargar o redireccionar hacia otra página.

Por otro lado, hay dos botones fijos: el de añadir, que abre un formulario modal (popup), el cual te permite añadir
un nuevo objeto al array existente o editar un mismo objeto en el caso que en lugar de añadir se presione el botón de editar;
por otra parte, hay un botón que hace un _scroll top_ que es común em ambas páginas (index y cartelera).

Para finalizar, el footer, al igual que el header, es común en ambos ficheros y dispone de las mismas funcionalidades que
en el _index.html_.

## MODULARIDAD EN JS

Tenemos numerosos ficheros principales que desempeñan funciones varias: uno para renderizar el _index.html_(contenido);
otro para cargar la cartelera en _cartelera.html_; otro que carga la suscripción en modo modal en el index; y otro el cual
permite que los ficheros HTML carguen el scroll de manera dinámica.

Por otra parte, hemos creado una serie de módulos los cuales permiten exportar funciones y objetos para no sobrecargar toda
la información en un JS o bien para permitir el principio de modularidad, el cual nos permite detectar más rápidamente cualquier
problema. Hay ficheros de todos los colores: novedades, cartelera, promociones...

## PROBLEMAS DETECTADOS

Tenemos algún que otro problema relacionado con la carga del contenido en los HTML. Esto se debe a que la página ha de
cargar mucho contenido multimedia de golpe, que se almacena en una estructura de directorios determinada, y cuya solución pasaría
por usar un framework o bien, para mejorar la experiencia de usuario, poner una animación mediante CSS que apapareciera hasta que la carga de la
información fuera completa, algo que no nos ha dado tiempo si queríamos llegar a todo.

Por otra parte, en relación con el manejo de añadir y editar eventos, se han producido algunas incompatibilidades
debido a que ambas comparten mismos medios pero con resultados finales, algo que nos ha traído algún que otro
dolor de cabeza pero nada serio.

Por otro lado, Santi ha tenido problemas de _CORS POLICY_ en navegador _Google Chrome_, lo que no le permite
visualizar las fuentes de _Google_ y los iconos de _fontawesome_. Este ha sido un problema que no hemos podido resolver
y por el cual no encontramos explicación lógica debido a que solo ocurre con ese navegador y solo a Santi, no en ningún sitio más.

Otro de los problemas encontrados es la descolocación mínima de determinados elementos según el navegador que utilizamos, y más
habiendo mimado el CSS para que la compatibilidad con los navegadores sea la máxima posible.

## OBTENCIÓN DE RECURSOS (AD HOC)

Los recursos en cuanto a las promociones usadas en el _front page_ han sido obtenidas de la web de [Aficine](https://www.aficine.com),
usando el inspector del navegador y obteniendo la fuente de la imagen a través de las etiquetas HTML.

Los objetos de la cartelera han sido obtenidos desde [OMDb API](http://www.omdbapi.com/), que es una API pública la cual
te permite obtener los objetos de las películas de una manera bastante sencilla. La única pega recae en que el Fetch de los recursos
lo lleva implementado la propia página y no es visible cara al usuario, de manera que se han tenido que copiar manualmente
isn poder hacer, por desgracia, un `fetch('uri');`.

Para finalizar, la creación de las cookies está basada en la explicación de [W3Schools](https://www.w3schools.com/js/js_cookies.asp),
con pequeñas ediciones acomodando el código a nuestras necesidades y exigencias de la práctica.

## MEJORAS IMPLEMENTADAS
La primera mejora que encontramos es el menú, cada campo está _linkeado_ a un apartado de la página o a otro html.

Otra de las mejoras que hemos implementado es el calendario funcional: coge el mes, el año y la fecha actual. Además, el link a los eventos, en nuestro caso
a la cartelera, se encuentra en el día actual.

Entrando a la cartelera podemos ver el _filter_, con el cual podemos filtrar por título, año o género y si no encuentra ninguno, muestra
un mensaje.

Con el botón editar, hemos implementado la siguiente mejora: obtener todos los v:alores de la película en cada input del formulario y de esta manera,
solo editamos el campo que deseamos y no toda la carta.

Por otra parte, si hacemos _click_ a una imagen de la cartelera nos llevará a la descripción de esa película. Una vez que nos lleva
a esa carta, observamos que tenemos un botón para volver atrás. Si _clickamos_ la 'cartelera' del menú, nos refrescará la página
y por tanto, perderemos todas las modificaciones y adiciones que hayamos hecho. En cambio, si _clickamos_ el botón para volver atrás,
nos llevará a la cartelera con todas las modificaciones y adiciones que hayamos hecho anteriormente.

Por último, en mobile responsive el footer es un botón, de esta manera no molesta al cliente y solo verá el footer si lo _clickamos_.





# P3: FORMS

## EXPRESIONES REGULARES
Las expresiones regulares evalúan los diferentes patrones que han de cumplir determinados campos para poder así
validar la integridad de la información introducida.

En el caso del correo electrónico, responde el patrón designado por la práctica: primer carácter en mayúscula;
una serie de caracteres (número indeterminado por la práctica), en minúscula; un @ y a su continuación un subdominio que
contenga entre 5 y 10 caracteres y para finalizar ha de acabar en .com, .net o .gov de manera obligatoria.

En el caso de la contraseña, decidimos crear una contraseña segura pero un tanto diferente a lo convencional:
el primer carácter ha de ser en mayúsculas, le siguen 6-8 más caracteres y los dos últimos han de ser números, de esta 
manera obligamos a que se introduzca al menos una mayúscula, una serie de minúsculas y una serie de cifras.

Para finalizar, en el campo del nombre sugeriste que nos inventáramos un patrón y hemos hecho uno básico que limite
la longitud del nombre: puede incluir mayúsculas, minúsculas y cifras en ujn rango de 4 a 12 caracteres como máximo.

## MEJORAS AÑADIDAS
Hemos añadido las siguientes mejoras en nuestra aplicación:

Mostramos los errores en forma de bocadillo y nos los mostrará en los dos formularios, log in y sign up.
Los bocadillos aparecen al hacer submit y desaparecen cuando hacemos focusin en el input correspondiente.
En el formulario log in, mostrará los siguientes errores:
1. El e-mail no coincide con ningún email que se encuentre dentro de la "base de datos", en nuestro caso, dentro del objeto.
2. La contraseña sea incorrecta, es decir, no coincida con la contraseña de la "base de datos".

En el formulario sign up, mostrará los siguientes errores:
1. El e-mail no cumple con el patrón de la expresión regular que hemos definido.
2. La contraseña no cumple con el patrón de la expresión regular que hemos definido.
3. La contraseña reescrita no coincide con la anterior.
4. Cuando registramos un usuario, hemos hecho una pantalla de carga para que simule el acceso a una base de datos; cuando el usuario se registra, aparece una pantalla que le indica que ha iniciado
sesión satisfactoriamente (_mensaje.html_), y mediante un setTimeout() hacemos que posteriormente redirija al _index.html_ y que cargue la página con el nombre del usuario.
   
También hemos añadido el botón log out el cual borra la cookie y por último, utilizamos el localStorage para que los datos
persistan tras hacer un registro de usuario. Como te hemos comentado en clase, nos añadía dos veces y por este motivo, hacemos un
usuarios.pop() para que elimine el usuario repetido.


