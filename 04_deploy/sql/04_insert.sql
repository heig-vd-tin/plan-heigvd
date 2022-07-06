\connect plan

INSERT INTO resource (name, type, image_name, description, idx_building, idx_floor, idx_room, localisation)
SELECT 'Centre d''impressions', 'centre d''impressions', 'centre_impression.png', null, building.id, floor.id, null, ST_GeomFromGeoJSON('{"type":"MultiPoint","coordinates":[[741288.752053526,5906204.479529934]]}')
FROM building
INNER JOIN floor
    ON floor.idx_building = building.id
WHERE floor.name = 'A' AND building.name = 'Cheseaux';
