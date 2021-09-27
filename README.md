# Bienvenido a SantiagoAPP

SantiagoApp es una aplicación web que te permite planificar tus rutas para realizar el camino de Santiago. Actualmente se encuentra implementado como prototipo, es decir las funcionalidades de las que dispone están reducidas.


## Estructura del repositorio

El repositorio se encuentra dividido en tres apartados:
- `/docs`: Aquí encontramos la documentación que se adjunta al proyecto.
- `/hack`: Esta carpeta contiene los scripts y configuraciones de despligue.
- `/release`: Esta carpeta contiene los archivos de despligue estables.
- `/src`: Aquí encontramos el código fuente estructurado según el componente. Por ejemplo
    - `/src/server`: Código fuente del servidor.
    - `/src/script`: Código fuente de los scripts de python empleados.
    - `/src/client`: Código fuente del cliente web.


## Como desplegar

Para desplegar hemos utilizado la tecnología Docker, de forma que sea lo más simple posible llevar la implementación a producción sin preocuparnos de las dependencias que pueda tener cada módulo.

```shell
docker pull thewillyhuman/santiagoapp-server;
docker pull mistermboy/santiagoapp-client;

docker run -d -p 8080:8080 thewillyhuman/santiagoapp-server;
docker run -d -p 80:3000 mistermboy/santiagoapp-client;
```

Una vez ejecutados los comandos anteriores podemos probar el servidor con el siguiente comando:

```shell
curl -w "\n" --header "Content-Type: application/json" --data '{ "road_name": "camino_andaluz", "transport_method":"pie", "number_of_days":5}' --request POST http://santiagoapp.wcr.es:8080/routes
```


## Documentación de cada módulo

Para obtener la documentación más detallada sobre cada uno de los módulos que componen el sistema hemos incluido un fichero `README.md` dentro de cada módulo que contiene esta información.
