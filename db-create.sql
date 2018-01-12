create database resep;
use resep;
create table resep(kode varchar(25)primary key,nama varchar(25)not null,
jenis varchar(10)not null check(jenis='makanan'or jenis='minuman'or jenis='camilan'or jenis='vegetable'),ket text not null,
gbr text not null);
create table bahan(resep varchar(25)not null,nama varchar(40)not null,jum float not null,satuan varchar(20)not null);
alter table bahan add foreign key(resep)references resep(kode)on update cascade on delete cascade;
create table langkah(resep varchar(25)not null,ket text not null,urut int not null);
alter table langkah add foreign key(resep)references resep(kode)on update cascade on delete cascade;
