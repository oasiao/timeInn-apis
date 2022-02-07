# TIMEINN (PALMIMAX)
### PC4_JS ASINCRON
#### INTRODUCCIÓ
En aquesta pràctica connectam la web amb dues apis:
- L'api crud, api que es troba al directori: /api/crud
- L'api auth, api que es troba al directori: /api/fake-api-jwt-json-server

#### REQUERIMENTS BÀSICS
Els requeriments bàsics del crud els podem veure a la pàgina web 'cartelera.html' 
i són els següents:
- Consultar tots els events <br>
  Podem veure que es printen totes les pel·lícules que es troben al crud.json.
  
- Consultar un esdeveniment per id <br>
  Al input 'filter', podem veure que podem cercar per id. 
- Crear un esdeveniment <br>
  Al clicar el botó d'add, ens permet afegir noves pel·lícules al crud.json.
- Modificar un esdeveniment <br>
  Al clicar el botó d'editar, rebem els 'old values' i ens permet modificar damunt 
  els valors antics.
- Eliminar un esdeveniment <br>
Al clicar el botó de eliminar, ens elimina la pel·lícula del crud.json.
  
A més, els events són llegits de l'api crud.

Per altra banda, tenim els requeriments bàsics de l'auth i són el següents:
- Registrar un usuari nou <br>
- Iniciar sessió d’un usuari <br>

#### AMPLIACIONS
Les millores que he implementat són els següents:
- Els emails dels usuaris no es poden repetir. Aleshores, si es registra un usuari
amb un email existent, apareixerà un error/alert per a que l'usuari canvii l'email i torni
  intentar registrar-se.
  
- Per veure les promocions i novetats, l'usuari haurà d'estar loggetjat. Per veure si esta loggetjat,
mirarem si l'usuari té creat el token.
