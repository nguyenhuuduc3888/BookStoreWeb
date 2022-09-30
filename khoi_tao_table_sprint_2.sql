drop database if exists book_store_sprint_2;
create database book_store_sprint_2;
use book_store_sprint_2;

create table `role`(
id int primary key auto_increment,
role_name varchar(30)
);

create table `user`(
id int primary key auto_increment,
user_name varchar(50),
phone_number varchar(20),
email varchar(150),
address varchar(200),
pass_word varchar(100)
);

create table role_user(
id int primary key auto_increment,
role_id int,
foreign key(role_id)references `role`(id),
user_id int,
foreign key(user_id)references `user`(id)
);

create table category(
id int primary key auto_increment ,
category_name varchar (255)
);

create table book(
id int primary key auto_increment,
category_id int ,
foreign key(category_id)references category(id),
book_name varchar (255),
author varchar (50),
release_date date,
company varchar(255),
price int,
amount int,
discount int,
book_img varchar(500),
book_detail longtext,
created_at date,
update_at date,
is_deleted bit(1) default 0
);

create table detail_img(
id int primary key auto_increment,
book_id int,
foreign key(book_id)references book(id),
img varchar (255)
);

create table oders(
id int primary key auto_increment,
name varchar(50),
phone_number varchar(20),
email varchar(150),
address varchar(200),
note varchar (300),
buy_date date,
`status` varchar(50),
total_money int,
is_deleted bit(1) default 0

);

create table detail_oder(
id int primary key auto_increment,
oders_id int,
foreign key(oders_id)references oders(id),
book_id int,
foreign key(book_id)references book(id),
price_detail int,
amount_book int,
total_money_detail int,
is_deleted bit(1) default 0
);

create table contact(
id int primary key auto_increment,
contact_name varchar(50),
phone_number varchar(20),
email varchar(150),
address varchar(200),
content varchar(300),
is_deleted bit(1) default 0
);