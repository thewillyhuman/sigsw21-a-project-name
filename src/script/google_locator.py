"""
This python script takes a file with one place per line and appends its coordinates to it.
For it it uses the Google Maps Geocode API.
"""
import sys
import googlemaps
from tqdm import tqdm

# Create the Google Maps Client with the provided API key.
gmaps = googlemaps.Client(key = 'AIzaSyA-iVXybHF3daCFhdsCAJMGkeTCY30japw')

# Load the file to compute from the arguments
input_file = open(sys.argv[1]).read()
output_file = open("out_gijon.txt", "a")

# Split the file by the new line character. Each place should be in a new line.
input_file_places = input_file.split('\n')

# For each place in the input file write the place and its coordinates in format place, lat, lng.
for place in tqdm(input_file_places):
    place_coordinates = gmaps.geocode(place + ' españa')[0]['geometry']['location']
    place_formatted_address = gmaps.geocode(place + ' españa')[0]['formatted_address'].replace(',', ' ')
    #output_file.write(f"{place},{place_coordinates['lat']},{place_coordinates['lng']}\n")
    output_file.write(f"{place_formatted_address},{place_coordinates['lat']},{place_coordinates['lng']}\n")

# Close the output file.
output_file.close()
