# Tercera entrega del proyecto final - Fredy Papa
### (E-commerce Backend)

##### Nota:
Puede usar https://dillinger.io/ para ver este contenido con los formatos de MD

## GitHub
https://github.com/FredyPapa/Tercera-entrega-proyecto-Fredy

## Dependencias
El proyecto usa las siguientes ```dependencias```:
- cors
- dotenv
- express
- firebase-admin
- joi
- mongoose
- bcryptjs
- connect-mongo
- express-session
- nodemailer
- jsonwebtoken
- winston
 
Y ```dependencias de desarrollo```:
- nodemon

## Instalación del proyecto

Ejecutar el código ```npm install``` para reconstruir los módulos de Node.
Crear el archivo ```.env``` con el siguiente contenido
~~~
PORT=8080
MONGO_ATLAS=***********************
PASS_MAILER = *********************
SECRETORPRIVATEKEY=
~~~

## Arquitectura del proyecto
El proyecto fue desarrollado considerando la arquitectura ```SOA``` entre los archivos y carpetas principales tenemos:
- package.json: Ubicado en la raíz del poryecto, posee las configuraciones del proyecto y se añadieron los scripts start y dev.
- index.js : Ubicado en la raíz del poryecto, es el archivo inicial del proyecto, donde se instancia el servidor express y a partir del cual se hace el llamado a las rutas
- routes: Desde aquí se hace el llamado a los componentes del proyecto y la validación de las rutas válidas.
- components: Posee una estructura basada en controladores y servicios para ejecutar la lógica de la aplicación.
- files: En la carptea files se guardan los archivos TXT generados para la persistencia de los registros tanto de productos como carrito.
- config: Contiene la configuración de la conexión a la base de datos.
- schemas: Contiene el esquema de los catálogos usados
- utils: Son las utilidades que usa el proyecto, como por ejemplo firebase, jwt, winston.

## Ubicación de la variable (flag) Administrador
Según el enunciado sólo se hace referencia a rutas disponibles para el Administrador en ```/api/productos``` por ese motivo se añadió el flag en una variable en:
~~~
components/controller/productoArchivoController.js
components/controller/productoFirebaseController.js
components/controller/productoMongoDBController .js
~~~
En las líneas 2 y 3 se podrá observar lo siguiente:
~~~
//Flag de administrador
const administrador = true;
~~~
En esa ubicación se podrá actualizar el flag a ```false```

## Prueba de funcionalidad
Los endpoints pueden ser validados con ```Postman``` 
Para acceder a las rutas de Producto y Carrito deberá estar logueado previamente, lo cual se validará con un JWT enviado en el header, para las pruebas con ```Postman``` debe agregar en el header
| KEY | VALOR |
| ------ | ------ |
| x-token | (valor de JWT) |

## Proceso de Pruebas de funcionalidad
Para las pruebas debe ingresar en ```Postman``` los siguientes valores

### /api/usuario/
```Registrar usuario```
| Verbo HTTP | URL |
| ------ | ------ |
| POST | http://localhost:8080/api/usuario/ |

A considerar en el Body (como raw de tipo JSON):
~~~
{
    "email": "fpapa10@gmail.com",
    "password": "12345678",
    "nombre": "Fredy9",
    "direccion": "Dirección",
    "edad": "37",
    "telefono": "993372748",
    "foto": "https://image.shutterstock.com/image-vector/vector-illustration-set-rulers-flat-260nw-1052690225.jpg"
}
~~~

### /api/usuario/login
```Loguear usuario```
| Verbo HTTP | URL |
| ------ | ------ |
| POST | http://localhost:8080/api/usuario/login/ |

A considerar en el Body (como raw de tipo JSON):
~~~
{
    "email": "fpapa@gmail.com",
    "password": "123456"
}
~~~

### /api/usuario/logout
```Desloguear usuario```
| Verbo HTTP | URL |
| ------ | ------ |
| GET | http://localhost:8080/api/usuario/logout |

### /api/productosArchivo  (Archivo)
```Listar todos los productos```
| Verbo HTTP | URL |
| ------ | ------ |
| GET | http://localhost:8080/api/productosArchivo/ |

```Listar producto por id```
| Verbo HTTP | URL |
| ------ | ------ |
| GET | http://localhost:8080/api/productosArchivo/1 |

```Agregar producto``` (sólo permitido para el usuario Administrador)
| Verbo HTTP | URL |
| ------ | ------ |
| POST | http://localhost:8080/api/productosArchivo/ |

A considerar en el Body (como raw de tipo JSON):
~~~
{
    "nombre": "Lápiz",
    "descripcion": "Útiles de oficina para escribir o dibujar",
    "codigo": "OFI003",
    "foto": "https://image.shutterstock.com/image-vector/vector-illustration-set-rulers-flat-260nw-1052690225.jpg",
    "precio": 75,
    "stock": 150
}
~~~

```Actualizar producto``` (sólo permitido para el usuario Administrador)
| Verbo HTTP | URL |
| ------ | ------ |
| PUT | http://localhost:8080/api/productosArchivo/4 |

A considerar en el Body (como raw de tipo JSON):
~~~
{
    "nombre": "Escuadra 2",
    "descripcion": "Útiles de oficina 2",
    "codigo": "OFI001",
    "foto": "https://image.shutterstock.com/image-vector/vector-illustration-set-rulers-flat-260nw-1052690225.jpg",
    "precio": 1500,
    "stock": 1000
}
~~~

```Eliminar producto por id``` (sólo permitido para el usuario Administrador)
| Verbo HTTP | URL |
| ------ | ------ |
| DELETE | http://localhost:8080/api/productosArchivo/4 |

### /api/productosMongoDB  (MongoDB)
```Listar todos los productos```
| Verbo HTTP | URL |
| ------ | ------ |
| GET | http://localhost:8080/api/productosMongoDB/ |

```Listar producto por id```
| Verbo HTTP | URL |
| ------ | ------ |
| GET | http://localhost:8080/api/productosMongoDB/61de78adef4f51be21bc2959 |

```Agregar producto``` (sólo permitido para el usuario Administrador)
| Verbo HTTP | URL |
| ------ | ------ |
| POST | http://localhost:8080/api/productosMongoDB/ |

A considerar en el Body (como raw de tipo JSON):
~~~
{
    "nombre": "Lápiz 3",
    "descripcion": "Útiles de oficina para escribir o dibujar",
    "codigo": "OFI003",
    "foto": "https://image.shutterstock.com/image-vector/vector-illustration-set-rulers-flat-260nw-1052690225.jpg",
    "precio": 75,
    "stock": 150
}
~~~

```Actualizar producto``` (sólo permitido para el usuario Administrador)
| Verbo HTTP | URL |
| ------ | ------ |
| PUT | http://localhost:8080/api/productosMongoDB/61de7531c0abac58f96456ea |

A considerar en el Body (como raw de tipo JSON):
~~~
{
    "nombre": "Escuadra 223",
    "descripcion": "Útiles de oficina 223",
    "codigo": "OFI001",
    "foto": "https://image.shutterstock.com/image-vector/vector-illustration-set-rulers-flat-260nw-1052690225.jpg",
    "precio": 1500,
    "stock": 1000
}
~~~

```Eliminar producto por id``` (sólo permitido para el usuario Administrador)
| Verbo HTTP | URL |
| ------ | ------ |
| DELETE | http://localhost:8080/api/productosMongoDB/61de78adef4f51be21bc2959 |

### /api/productosFirebase  (Firebase)
```Listar todos los productos```
| Verbo HTTP | URL |
| ------ | ------ |
| GET | http://localhost:8080/api/productosFirebase/ |

```Listar producto por id```
| Verbo HTTP | URL |
| ------ | ------ |
| GET | http://localhost:8080/api/productosFirebase/QMsX7eQvQO3FJo7Mq79U |

```Agregar producto``` (sólo permitido para el usuario Administrador)
| Verbo HTTP | URL |
| ------ | ------ |
| POST | http://localhost:8080/api/productosFirebase/ |

A considerar en el Body (como raw de tipo JSON):
~~~
{
    "nombre": "Lápiz 5",
    "descripcion": "Útiles de oficina para escribir o dibujar",
    "codigo": "OFI003",
    "foto": "https://image.shutterstock.com/image-vector/vector-illustration-set-rulers-flat-260nw-1052690225.jpg",
    "precio": 75,
    "stock": 150
}
~~~

```Actualizar producto``` (sólo permitido para el usuario Administrador)
| Verbo HTTP | URL |
| ------ | ------ |
| PUT | http://localhost:8080/api/productosFirebase/Gm6hqCXVVheN0VnehewS |

A considerar en el Body (como raw de tipo JSON):
~~~
{
    "nombre": "Escuadra 223",
    "descripcion": "Útiles de oficina 223",
    "codigo": "OFI001",
    "foto": "https://image.shutterstock.com/image-vector/vector-illustration-set-rulers-flat-260nw-1052690225.jpg",
    "precio": 1500,
    "stock": 1000
}
~~~

```Eliminar producto por id``` (sólo permitido para el usuario Administrador)
| Verbo HTTP | URL |
| ------ | ------ |
| DELETE | http://localhost:8080/api/productosFirebase/ivLKFb2KBiOP2idFZtis |

### /api/carritoArchivo (Archivo)
```Crear carrito```
| Verbo HTTP | URL |
| ------ | ------ |
| POST | http://localhost:8080/api/carritoArchivo/ |

A considerar en el Body (como raw de tipo JSON):
~~~
{
    "productos": 
                [{
                    "id": 1,
                    "timestamp": "2021-12-15T20:38:02.735Z",
                    "nombre": "Escuadra",
                    "descripcion": "Útiles de oficina",
                    "codigo": "OFI001",
                    "foto": "https://image.shutterstock.com/image-vector/vector-illustration-set-rulers-flat-260nw-1052690225.jpg",
                    "precio": 25,
                    "stock": 120
                },{
                    "id": 2,
                    "timestamp": "2021-12-15T20:38:02.735Z",
                    "nombre": "Borrador",
                    "descripcion": "Útiles de oficina para borrar",
                    "codigo": "OFI002",
                    "foto": "https://image.shutterstock.com/image-vector/vector-illustration-set-rulers-flat-260nw-1052690225.jpg",
                    "precio": 50,
                    "stock": 100
                },{
                    "id": 3,
                    "timestamp": "2021-12-15T20:38:02.735Z",
                    "nombre": "Lápiz",
                    "descripcion": "Útiles de oficina para escribir o dibujar",
                    "codigo": "OFI003",
                    "foto": "https://image.shutterstock.com/image-vector/vector-illustration-set-rulers-flat-260nw-1052690225.jpg",
                    "precio": 175,
                    "stock": 350
                }]
}
~~~

```Eliminar carrito por id``` 
| Verbo HTTP | URL |
| ------ | ------ |
| DELETE | http://localhost:8080/api/carritoArchivo/4 |

```Listar productos de un carrito por id``` 
| Verbo HTTP | URL |
| ------ | ------ |
| GET | http://localhost:8080/api/carritoArchivo/3/productos |

```Añadir producto al carrito por id```
| Verbo HTTP | URL |
| ------ | ------ |
| POST | http://localhost:8080/api/carritoArchivo/1/productos |

A considerar en el Body (como raw de tipo JSON):
~~~
{
    "id":   4,
    "timestamp":"2021-12-15T20:38:02.735Z",
    "nombre": "Lapicero",
    "descripcion": "Útiles de oficina para escribir",
    "codigo": "OFI004",
    "foto": "https://image.shutterstock.com/image-vector/vector-illustration-set-rulers-flat-260nw-1052690225.jpg",
    "precio": 15,
    "stock": 25
}
~~~

```Eliminar un producto del carrito según el id del carrito y el id del  producto```
| Verbo HTTP | URL |
| ------ | ------ |
| DELETE | http://localhost:8080/api/carritoArchivo/1/productos/4 |

### /api/carritoMongoDB (MongoDB)
```Crear carrito```
| Verbo HTTP | URL |
| ------ | ------ |
| POST | http://localhost:8080/api/carritoMongoDB/ |

A considerar en el Body (como raw de tipo JSON):
~~~
{
    "productos": 
                [{
                    "id": "61de7531c0abac58f96456ea",
                    "timestamp": "2021-12-15T20:38:02.735Z",
                    "nombre": "Escuadra",
                    "descripcion": "Útiles de oficina",
                    "codigo": "OFI001",
                    "foto": "https://image.shutterstock.com/image-vector/vector-illustration-set-rulers-flat-260nw-1052690225.jpg",
                    "precio": 25,
                    "stock": 120
                },{
                    "id": "61df4cbf1c6f58bbf0d62eeb",
                    "timestamp": "2021-12-15T20:38:02.735Z",
                    "nombre": "Borrador",
                    "descripcion": "Útiles de oficina para borrar",
                    "codigo": "OFI002",
                    "foto": "https://image.shutterstock.com/image-vector/vector-illustration-set-rulers-flat-260nw-1052690225.jpg",
                    "precio": 50,
                    "stock": 100
                }]
}
~~~

```Eliminar carrito por id``` 
| Verbo HTTP | URL |
| ------ | ------ |
| DELETE | http://localhost:8080/api/carritoMongoDB/61df87a78eb3ce1013db36d1 |

```Listar productos de un carrito por id``` 
| Verbo HTTP | URL |
| ------ | ------ |
| GET | http://localhost:8080/api/carritoMongoDB/61df84b41ead7d1885792005/productos |

```Añadir producto al carrito por id```
| Verbo HTTP | URL |
| ------ | ------ |
| POST | http://localhost:8080/api/carritoMongoDB/61df836e25e0ae4d04690696/productos |

A considerar en el Body (como raw de tipo JSON):
~~~
{
    "id": "61de7531c0abac58f96456ea",
    "timestamp":"2021-12-15T20:38:02.735Z",
    "nombre": "Lapicero",
    "descripcion": "Útiles de oficina para escribir 2",
    "codigo": "OFI004",
    "foto": "https://image.shutterstock.com/image-vector/vector-illustration-set-rulers-flat-260nw-1052690225.jpg",
    "precio": 15,
    "stock": 25
}
~~~

```Eliminar un producto del carrito según el id del carrito y el id del  producto```
| Verbo HTTP | URL |
| ------ | ------ |
| DELETE | http://localhost:8080/api/carritoMongoDB/61df836e25e0ae4d04690696/productos/61de7531c0abac58f96456ea |

```Generar Pedido de un carrito por id```
| Verbo HTTP | URL |
| ------ | ------ |
| GET | http://localhost:8080/api/carritoMongoDB/6232ab17d5450c40e1a3ba6c/pedido |


### /api/carritoFirebase (Firebase)
```Crear carrito```
| Verbo HTTP | URL |
| ------ | ------ |
| POST | http://localhost:8080/api/carritoFirebase/ |

A considerar en el Body (como raw de tipo JSON):
~~~
{
    "productos": 
                [{
                    "id": "61de7531c0abac58f96456ea",
                    "timestamp": "2021-12-15T20:38:02.735Z",
                    "nombre": "Escuadra",
                    "descripcion": "Útiles de oficina",
                    "codigo": "OFI001",
                    "foto": "https://image.shutterstock.com/image-vector/vector-illustration-set-rulers-flat-260nw-1052690225.jpg",
                    "precio": 25,
                    "stock": 120
                },{
                    "id": "61df4cbf1c6f58bbf0d62eeb",
                    "timestamp": "2021-12-15T20:38:02.735Z",
                    "nombre": "Borrador",
                    "descripcion": "Útiles de oficina para borrar",
                    "codigo": "OFI002",
                    "foto": "https://image.shutterstock.com/image-vector/vector-illustration-set-rulers-flat-260nw-1052690225.jpg",
                    "precio": 50,
                    "stock": 100
                }]
}
~~~

```Eliminar carrito por id``` 
| Verbo HTTP | URL |
| ------ | ------ |
| DELETE | http://localhost:8080/api/carritoFirebase/jmfha5NCoKusx7PpWWey |

```Listar productos de un carrito por id``` 
| Verbo HTTP | URL |
| ------ | ------ |
| GET | http://localhost:8080/api/carritoFirebase/CFn8DbaEevAfRGnVlEsR/productos |

```Añadir producto al carrito por id```
| Verbo HTTP | URL |
| ------ | ------ |
| POST | http://localhost:8080/api/carritoFirebase/CFn8DbaEevAfRGnVlEsR/productos |

A considerar en el Body (como raw de tipo JSON):
~~~
{
    "id":   "QMsX7eQvQO3FJo7Mq79U",
    "timestamp":"2021-12-15T20:38:02.735Z",
    "nombre": "Lapicero",
    "descripcion": "Útiles de oficina para escribir 2",
    "codigo": "OFI004",
    "foto": "https://image.shutterstock.com/image-vector/vector-illustration-set-rulers-flat-260nw-1052690225.jpg",
    "precio": 15,
    "stock": 25
}
~~~

```Eliminar un producto del carrito según el id del carrito y el id del  producto```
| Verbo HTTP | URL |
| ------ | ------ |
| DELETE | http://localhost:8080/api/carritoFirebase/CFn8DbaEevAfRGnVlEsR/productos/QMsX7eQvQO3FJo7Mq79U |
