

CREATE DATABASE iGroup DEFAULT CHARACTER SET utf8;
GO;

USE iGroup;

GO;

--LOGIN

CREATE TABLE login(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  phone CHAR(11) UNIQUE KEY ,
  passwd CHAR(18),
  status TINYINT,
  pin  CHAR(4),
  time INT(10)
);

-- USERINFO
/*

*/
CREATE TABLE userinfo(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  loginId INTEGER NOT NULL UNIQUE KEY ,
  nick VARCHAR(20),
  location INTEGER ,
  gender TINYINT CHECK(gender IN (2,1,0)),
  birthday CHAR(8),
  height INT(3),
  income INT(1),
  hobbies VARCHAR (100),
  status INT(1)

);

CREATE TABLE team(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  owner INTEGER,
  status TINYINT,
  time INT(10),
  name VARCHAR(30),
  gender TINYINT CHECK(gender IN (2,1,0)),
  members INT(4)
);

CREATE TABLE userteam(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  loginid INTEGER,
  teamid INTEGER,
  time INT(10),
  status TINYINT
);

CREATE TABLE talk(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  content TEXT,
  time INT(10),
  status TINYINT,
  sender INTEGER,
  conversationid INTEGER

);

CREATE TABLE conversation(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  teamid INTEGER,
  teamid2 INTEGER,
  time INT(10),
  status TINYINT
);


CREATE TABLE teamconversation(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  teamid INTEGER,
  conversationid INTEGER,
  time INT(10),
  status TINYINT
);

CREATE TABLE teamteam(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  teamid INTEGER,
  teamid2 INTEGER,
  time INT(10),
  status TINYINT
);