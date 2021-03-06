### Hi there, I'm Yan - [Personal Website](https://yanmtl.website)

## Once a senior business development, now a young developer!
- š Everyday is a huge learning experience
- š± Iām currently learning everything
- šļø Fun fact: I love cooking, photography and traveling

# About the project
This project uses open-source data https://donnees.montreal.ca/ville-de-montreal/murales to download GeoJSON data, produce a local database and display the data in Leaflet map.
Due to Chrome's limitation on geolocation, it is recommended to use Firefox to follow the project.
![Screen Shot 2021-04-28 at 10 40 13 PM](https://user-images.githubusercontent.com/68293086/116497628-d732c200-a875-11eb-9d0a-04e46bd29647.png)

# Built With
- jQuery
- Bootstrap

# Getting Started
1. In your local phpMyAdmin, create a table 'geo_data'
```
CREATE TABLE `geo_data` (
  `id` int(6) UNSIGNED NOT NULL,
  `idGeo` int(10) NOT NULL,
  `artiste` varchar(250) DEFAULT NULL,
  `organisme` varchar(250) DEFAULT NULL,
  `adresse` varchar(250) DEFAULT NULL,
  `annee` int(4) DEFAULT NULL,
  `arrondissement` varchar(250) DEFAULT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `image_url` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```
# Usage
- :camera: Every two minutes, the left gallery is partially refreshed to display four random elements.

<img width="683" alt="Screen Shot 2021-05-03 at 3 09 10 PM" src="https://user-images.githubusercontent.com/68293086/116921702-59c6d300-ac22-11eb-8e49-78b0f2fe980c.png">

- :city_sunset: When we click on the map, the information box corresponding to that location will pop up.

<img width="341" alt="Screen Shot 2021-05-03 at 3 09 34 PM" src="https://user-images.githubusercontent.com/68293086/116921795-7d8a1900-ac22-11eb-8e52-957872ac2458.png">
- :beer: When we try to search, it will drop down the autocomplete list, select one of them, click search, and a gallery of that location will pop up.

<img width="680" alt="Screen Shot 2021-05-03 at 3 09 55 PM" src="https://user-images.githubusercontent.com/68293086/116921835-8f6bbc00-ac22-11eb-93b0-6e486013b0d6.png">
