\connect plan 
CREATE EXTENSION postgis;
create table if not exists building (id serial primary key, name varchar(255));
create table if not exists floor (id serial primary key, name varchar(255), idx_building int);
create table if not exists floor_geometry (id serial primary key, idx_floor int , type varchar(255), geom geometry);
create table if not exists room (id serial primary key, name varchar(255), idx_floor int, geometry geometry);