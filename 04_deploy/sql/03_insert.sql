\connect plan
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Armoire à pharmacie', 'urgence', 'armoire_pharmacie.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741249.371691274,5906121.243072808]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'B' AND building.name = 'Cheseuax';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Armoire à pharmacie', 'urgence', 'armoire_pharmacie', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741304.2092876582,5906187.721748832]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'B' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Armoire à pharmacie', 'urgence', 'armoire_pharmacie.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741313.5918104763,5906172.090360463]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'C' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Ascenseur', 'ascenseur', 'ascenseur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741264.9713417591,5906178.674415536]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'A' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Ascenseur', 'ascenseur', 'ascenseur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741338.9620223675,5906226.6833483605]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'A' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Ascenseur', 'ascenseur', 'ascenseur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741265.0488887263,5906178.584335937]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'B' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Ascenseur', 'ascenseur', 'ascenseur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741288.3793784134,5906167.734252782]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'B' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Ascenseur', 'ascenseur', 'ascenseur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741338.9598271612,5906226.680247488]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'B' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Ascenseur', 'ascenseur', 'ascenseur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741353.7397052866,5906208.992882293]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'B' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Ascenseur', 'ascenseur', 'ascenseur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741288.3966603837,5906167.792683817]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'C' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Ascenseur', 'ascenseur', 'ascenseur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741311.7068024878,5906157.048707481]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'C' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Ascenseur', 'ascenseur', 'ascenseur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741353.6159141557,5906209.120895099]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'C' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Ascenseur', 'ascenseur', 'ascenseur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741311.7776759559,5906157.03631047]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'D' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Ascenseur', 'ascenseur', 'ascenseur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741367.8383048917,5906191.370478837]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'D' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Ascenseur', 'ascenseur', 'ascenseur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741368.0528600476,5906191.403552021]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'C' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Ascenseur', 'ascenseur', 'ascenseur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741381.3085294816,5906130.190338497]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'D' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Ascenseur', 'ascenseur', 'ascenseur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741381.3085294816,5906130.1625213325]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'E' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Ascenseur', 'ascenseur', 'ascenseur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741381.3085294816,5906130.1625213325]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'F' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Ascenseur', 'ascenseur', 'ascenseur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741381.3085294816,5906130.1625213325]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'G' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Ascenseur', 'ascenseur', 'ascenseur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741381.3085294816,5906130.1625213325]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'H' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Ascenseur', 'ascenseur', 'ascenseur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741381.3085294816,5906130.1625213325]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'J' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Ascenseur', 'ascenseur', 'ascenseur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741381.3085294816,5906130.1625213325]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'K' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Bus', 'transport', 'bus.png', null, building.id, null, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741253.7231184669,5906008.511748723]]}')
FROM building
WHERE building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Bus', 'transport', 'bus.png', null, building.id, null, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741270.9522412199,5905978.725807692]]}')
FROM building
WHERE building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'centre d'impressions', 'centre d'impressions', 'centre_impression.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741288.752053526,5906204.479529934]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'A' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Centre d'impression', 'centre d'impression', 'centre_impression.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741337.411888714,5906249.555658622]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'A' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Centre d'impressions', 'centre d'impressions', 'centre_impression.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741241.3354249516,5906121.489432215]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'B' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Centre d'impressions', 'centre d'impression', 'centre_impression.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741302.2689847505,5906192.285639541]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'B' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Centre d'impression', 'centre d'impression', 'centre_impression.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741368.3454132717,5906245.61919508]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'B' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Centre d'impressions', 'centre d'impressions', 'centre_impression.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741286.2734165072,5906128.127465462]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'C' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Centre d'impressions', 'centre d'impression', 'centre_impression.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741305.2015391923,5906165.291183698]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'C' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Centre d'impressions', 'centre d'impressions', 'centre_impression.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741384.801503544,5906229.595847639]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'C' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Centre d'impressions', 'centre d'impressions', 'centre_impression.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741298.7069776822,5906103.414948297]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'D' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Centre d'impressions', 'centre d'impressions', 'centre_impression.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741345.263157382,5906168.475848659]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'D' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Centre d'impressions', 'centre d'impressions', 'centre_impression.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741396.037062091,5906209.152085829]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'D' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Centre d'impressions', 'centre d'impression', 'centre_impression.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741365.0569108585,5906149.411820127]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'E' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Centre d'impressions', 'centre d'impressions', 'centre_impression.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741382.6083502806,5906178.907630607]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'F' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Centre d'impressions', 'centre d'impressions', 'centre_impression.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741387.7115098209,5906170.608894274]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'G' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Centre d'impressions', 'centre d'impressions', 'centre_impression.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741387.5621742348,5906174.93962627]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'H' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Centre d'impressions', 'centre d'impressions', 'centre_impression.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741388.50796628,5906181.709506173]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'J' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Centre d'impressions', 'centre d'impressions', 'centre_impression.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741384.3763483983,5906163.341229084]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'K' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Défibrilateur', 'urgence', 'défibrilateur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741351.4159291458,5906141.971416941]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'E' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741279.8195017616,5906197.538710518]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'A' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741321.0538895881,5906236.407357203]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'A' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741331.284478148,5906237.976943408]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'A' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741349.9876569561,5906253.565664007]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'A' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741209.2660958986,5906094.71078683]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'B' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741244.8251986926,5906117.613259816]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'B' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741276.5939318886,5906143.334442294]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'B' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741278.9673347836,5906145.523089275]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'B' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741291.0192316384,5906156.400168718]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'B' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741302.748404933,5906186.716117799]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'B' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741335.4957156233,5906218.6573613295]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'B' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741345.9845846159,5906220.549627608]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'B' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741380.6721642169,5906245.787035373]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'B' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741255.739591249,5906103.639424319]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'C' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741302.9783641757,5906135.109583666]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'C' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741314.4641320185,5906145.747997043]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'C' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741330.8603788426,5906179.501434515]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'C' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741339.7359179487,5906186.497415121]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'C' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741350.2422918639,5906201.10322344]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'C' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741360.2874533744,5906202.828869325]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'C' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741409.265759407,5906238.737800201]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'C' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741310.8387958137,5906113.146004729]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'D' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741337.2936647576,5906135.211018662]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'D' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741357.8190511509,5906172.914766302]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'D' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741373.3436994127,5906185.0794196]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'D' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741436.1932425038,5906234.662793102]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'D' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741354.4611615503,5906142.5835866695]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'E' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741371.2884521101,5906102.739634632]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'E' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741393.646047497,5906185.327719383]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'E' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741319.8785721502,5906074.514956364]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'E' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741325.6942034028,5906058.088451166]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'E' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741301.5606694894,5906054.777306153]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'F' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741333.2446763327,5906073.288362693]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'F' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741370.3837476603,5906110.478636787]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'F' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741383.5826002109,5906149.644950422]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'F' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741384.5175334029,5906164.99343699]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'F' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741373.2774152823,5906154.57883451]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'G' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741386.1983435183,5906162.980522771]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'G' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741373.3154834061,5906153.7683522375]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'H' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741386.222368467,5906163.051246119]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'H' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741373.3539467403,5906154.694841663]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'J' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741386.3077457101,5906163.596484654]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'J' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Extincteur', 'urgence', 'extincteur.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741374.0316597834,5906154.432128495]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'K' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Helpdesk', 'helpdesk', 'helpdesk.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741379.5270366988,5906176.767795728]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'F' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Restaurant', 'restaurant', 'restaurant.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741326.883420923,5906066.614777946]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'E' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Restaurant', 'restaurant', 'restaurant.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741322.2837345672,5906053.067756487]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'F' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Réception', 'réception', 'réception.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741345.180046979,5906141.510328693]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'F' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'WC femme', 'wc', 'wc_femme.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741267.1003421135,5906184.512225891]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'A' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'WC femme', 'wc', 'wc_femme.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741333.4794908215,5906237.490576988]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'A' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'WC femme', 'wc', 'wc_femme.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741348.380519651,5906219.5668196995]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'B' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'WC femme', 'wc', 'wc_femme.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741290.5182983612,5906173.570969776]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'B' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'WC femme', 'wc', 'wc_femme.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741313.7345303306,5906163.07319532]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'C' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'WC femme', 'wc', 'wc_femme.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741362.4886174663,5906202.33890939]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'C' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'WC femme', 'wc', 'wc_femme.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741336.5019605629,5906152.503562623]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'D' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'WC femme', 'wc', 'wc_femme.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741379.6569873694,5906157.995304505]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'E' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'WC femme', 'wc', 'wc_femme.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741388.7462197451,5906165.130590656]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'E' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'WC femme', 'wc', 'wc_femme.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741320.5392398336,5906045.419275187]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'E' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'WC femme', 'wc', 'wc_femme.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741387.0757066245,5906127.073574987]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'H' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'WC handicapé', 'wc', 'wc_handicapé.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741380.9316923313,5906156.679548021]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'E' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'WC handicapé', 'wc', 'wc_handicapé.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741314.0013116593,5906044.668765662]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'E' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'WC homme', 'wc', 'wc_homme.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741267.5724929562,5906180.129209359]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'A' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'WC homme', 'wc', 'wc_homme.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741331.4538353069,5906235.449661121]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'A' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'WC homme', 'wc', 'wc_homme.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741346.1411589137,5906217.764037725]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'B' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'WC homme', 'wc', 'wc_homme.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741290.6857287504,5906169.363784469]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'B' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'WC homme', 'wc', 'wc_homme.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741314.1687400994,5906158.773725196]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'C' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'WC homme', 'wc', 'wc_homme.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741360.3476105834,5906200.347290185]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'C' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'WC homme', 'wc', 'wc_homme.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741336.817156752,5906147.975059996]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'D' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'WC homme', 'wc', 'wc_homme.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741393.37548978,5906168.594433638]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'E' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'WC homme', 'wc', 'wc_homme.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741314.2293937592,5906040.397904315]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'E' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'WC homme', 'wc', 'wc_homme.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741387.2952500688,5906127.505795566]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'G' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'WC homme', 'wc', 'wc_homme.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741387.3228601533,5906127.505795566]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'J' AND building.name = 'Cheseaux';
INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'WC inclusif', 'wc', 'wc_inclusif.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741384.6577340249,5906161.512998354]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'E' AND building.name = 'Cheseaux';
