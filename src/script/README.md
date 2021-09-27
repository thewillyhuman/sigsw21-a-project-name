# Scripts de SantiagoAPP

En esta carperta se encuentran los distintos scripts empleados para realizar la transformación de datos geográficos. Las transformaciones realizadas en concreto son dos:
 
 - `google_locator.py`: Este script recibe una lista de lugares con poca precisión y los atribuye con más información de Google con el fin de añadirles más precisión. En concreto se coge una lista de lugares por los que pasa un camino de cualquier web que la contenga. A continuación este script procesa cada lugar y lo intenta geolocalizar con precisión.

- `kml_processor.py`: Este script coge un KML de puntos de interés de un camino dado y para cada punto de interés lo geo-localiza en Google Maps y le añade el id del lugar para que el servidor pueda descargarse su información.
