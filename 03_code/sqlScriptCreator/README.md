# Server API

## Description
This is a program that read an arborescence of geojson files and create three sql file.
This programm is specific to this project. Don't use it for other projects.

## The arborescence
The arborescence have to look like this :

```
/root
    /[buildingName1]
        /[floorName1]
            [roomName1].geojson
            [roomName2].geojson
        /[floorName2]
            [roomName3].geojson
        [linesData].geojson
    /[buildingName2]
    /resources
        [resourceName1].geojson
        [resourceName2].geojson
    buildingData.json
    roomInfo.csv
```
The name between [] brackets can be any string but is used in the database.

ex: 
```
/root
    /Cheseaux
        /A
            A22.geojson
            A45.geojson
        /E
            E01.geojson
        liens.geojson
    /St-Roch
    /resources
        printer.geojson
        .geojson
    buildingData.json
    roomInfo.csv
```

The buildingData.json contains the data to fill the building table :
```
{
    "groundFloor" : "E",
    "center" : [741335.0, 5906150],
    "rotation" : 0.674,
    "zoom" : 18,
    "minZoom" : 16,
    "maxZoom" : 23
}
```

The roomInfo.csv contains the data of each room for the database
It contains the following columns :
- name, area, secondName, type, nbSeats

## Run

To run the programm use the command 
`npm run start [inputPath] [outputPath] [dbName]`

`inputPath` is the path to the arborescence
`outputPath` is the path where the sql scripts will be created
`dbName` is the database name