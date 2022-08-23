
# Bank Transaction

Bank Transaction surgió como un challenge a desarrollar por parte del equipo ID For Ideas, en donde suelen darte desafíos para practicar y aumentar así tu experiencia.
Cabe resaltar que hay algunas cosas que omití como la que el usuario pueda tener más de una tarjeta, fue lo primero que hice, ya que cree un modelo para que almacene un par de nombres de tarjeta automáticamente 
ni bien iniciará el servidor y su conexión sea exitosa, pero la cosa quedó ahí, tal vez se lo agregue más adelante, para generar el número de tarjeta lo que hice fue
hacerlo con números aleatorios, por un recorrido de 16 veces, ya que ese el límite de números permitidos en una tarjeta, 
luego le fuí anidando los guiones por cada 4 dígitos. 
Me hicieron falta agregarle más cosas, como un regex para validar bien la información y algunas funciones para hacer que se vea bien en caso de que el usuario se equivoque.
 
### Esquemas:
- **InfoUserSchema**: *user_id, name, lastname, street, country, city, location, cardholder, num_card, balance, register* 
- **TransactionSchema**: *user_id, another_user_id, num_card, mount, register* 
- **UserSchema**: *username, pin, register* 

### Instalación:
- **npm install**

### Ejecución en el puerto 4000:
- **npm start** 

### Paquetes usados:
- **bcryptjs** 
- **body-parser** 
- **express** 
- **jsonwebtoken** 
- **jwt-simple** 
- **moment** 
- **mongoose** 
 
### Enunciado del Desafío:
Descripción del proyecto:
En el home banking vamos a poder ingresar con seguridad por usuario y visualizar 
nuestro saldo. También vamos a poder realizar transacciones a otras tarjetas.
Objetivo:
Con tarjetas predefinidas para usuarios ya creados, vamos a poder transferir plata de 
cuenta a cuenta con la seguridad y validaciones suficientes para que no haya pérdidas 
de dinero en transacciones.
Requisitos:
-Los usuarios ya están creados, no hay registro, sólo login con numero de tarjeta y pin.
-El usuario puede visualizar su saldo actual, un listado de últimas transacciones del mes, 
y podrá realizar nuevas transacciones.
-El usuario podrá tener más de una tarjeta,
-Para realizar una transacción se pedirá número de tarjeta del otro usuario y monto.
-Al cerrar la ventana, se cierra la sesión.
-Al pasar 15 segundos sin actividad se cierra la sesión.
