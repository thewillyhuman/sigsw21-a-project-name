import urllib
import googlemaps
from lxml import objectify
from tqdm import tqdm

# Create the Google Maps Client with the provided API key.
gmaps = googlemaps.Client(key = 'AIzaSyA-iVXybHF3daCFhdsCAJMGkeTCY30japw')

output_file = open("out_placemarks.txt", "a")

# The URL where the KML is located
url = 'https://www.santiago.nl/wp-content/themes/hello-theme-child-master/download-file.php?url=/wp-content/uploads/2021/08/Voorzieningen-ES-EN-CaminoFrances-20210803.kml'
fileobject = urllib.request.urlopen(url)

root = objectify.parse(fileobject).getroot()

for placemark in tqdm(root.Document.Folder.Placemark):
    place_name = placemark.name
    place_description = placemark.description
    place_coordinates = str(placemark.Point.coordinates).split(',')[1] + ',' + str(placemark.Point.coordinates).split(',')[0]

    gmaps_places_result = gmaps.find_place(place_name, input_type = 'textquery', location_bias='point:' + place_coordinates)
    if(len(gmaps_places_result['candidates']) > 0):
        place_google_id = gmaps_places_result['candidates'][0]['place_id']
    else:
        place_google_id = ''

    string_line = f"{place_name}|||{place_description}|||{place_coordinates}|||{place_google_id}\n"
    output_file.write(string_line);

output_file.close()