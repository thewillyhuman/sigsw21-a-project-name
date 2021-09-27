# SantiagoAPP Server

El módulo del servidor de SantiagoAPP implementa un servidor REST que responde a las funcionalidades de planificar ruta y obtener usuarios cercanos. Está implementado con Quarkus, un Framework de Java que permite crear servidores web muy ligeros. Para saber más sobre Quarkis visite el sitio https://quarkus.io/.

## Cómo ejecutar el servidor en modo desarrollo

Para ejecutar la aplicación en modo desarrollo hay que ejecutar el siguiente comando:

```shell script
./gradlew quarkusDev
```

> **_NOTA:_**  Una vez ejecutado el comando anterior también se activará una GUI donde podemos debuguear y hacer profiling de nuestro sistema. Esta interfaz está disponible en: http://localhost:8080/q/dev/.

## Cómo empaquetar y ejecutar la aplicación

La aplicación se puede empaquetar con el comando:

```shell script
./gradlew build
```

Esto produce el archivo `quarkus-run.jar` en el directorio `build/quarkus-app/`. Es importante que se de cuenta de que este no es un _über-jar_ ya que las dependencias están en el directorio `build/quarkus-app/lib/`.

Si quiere construir un _über-jar_, ejecute el siguiente comando:

```shell script
./gradlew build -Dquarkus.package.type=uber-jar
```

La aplicación se puede ejecutar cómo `java -jar build/quarkus-app/quarkus-run.jar`. Por defecto el servidor estará escuchando en el puerto `8080`.

## Cómo crear un ejecutable nativo

Se puede crear un ejecutable nativo con el siguiente comando:

```shell script
./gradlew build -Dquarkus.package.type=native
```

O, si no se tiene GrallVM instalado, se puede ejecutar la build en un contenedor de la siguiente forma:

```shell script
./gradlew build -Dquarkus.package.type=native -Dquarkus.native.container-build=true
```

Ahora podemos ejecutar el sevidor como: `./build/server-1.0-runner`

Para cualquier otra duda sobre como ejecutar el sevidor puede referirse a https://quarkus.io/guides/gradle-tooling.
