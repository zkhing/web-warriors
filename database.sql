CREATE TABLE users(
 username VARCHAR(50) PRIMARY KEY,
 first_name VARCHAR(50) NOT NULL,
 surname VARCHAR(50) NOT NULL,
 email VARCHAR(100) NOT NULL
 );

CREATE TABLE availabilities (
 availabilityID SERIAL PRIMARY KEY,
 username VARCHAR(50) REFERENCES users(username),
 date DATE NOT NULL,
 from_time TIME NOT NULl,
 to_time TIME NOT NULL
 );
 INSERT INTO users (username, first_name, surname, email)
  VALUES
 ('@Barry', 'Mamadou Dian', 'Barry', 'diams29@gmail.com'),
 ('@Sahar', 'Sahar', 'Karim', 'saharkarim@example.com'),
 ('@Davood', 'Davood', 'Moradi', 'janedoe@example.com'),
 ('@Zaw', 'Zaw', 'Khing', 'zaw@example.com'),
 ('Mik22', 'Miguel', 'gomes', 'gomes@example.com'),
 ('Khess83', 'khesiwe', 'Dube', 'khess83@example.com');

 INSERT INTO availabilities (availabilityID,username, date, from_time, to_time)
 VALUES 
 ('@Davood', '05-03-2023', '14:00','16:00'),
 ('@Sahar', '06-03-2023', '18:00', '19:00'),
 ('@Barry', '17-03-2023', '19:00', '19:30'),
 ('@Zaw', '17-03-2023', '19:00', '20:00'),
 ('Mik22', '20-03-2023', '22:00', '24:00'),
 ('Khess83', '20-03-2023', '22:00', '22:30');