CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  avatar VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE leaderboard (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  wpm FLOAT NOT NULL,
  accuracy INTEGER NOT NULL,
  language VARCHAR(50),
  time INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  characters VARCHAR(100) NOT NULL
);

INSERT INTO users (name, email, password_hash, avatar)
VALUES
('MonkeyKing', 'king@typemonkey.com', 'hashed-password1', 'avatar1.png'),
('SpeedyTyper', 'speedy@typemonkey.com', 'hashed-password2', 'avatar2.png'),
('TypeMaster', 'master@typemonkey.com', 'hashed-password3', 'avatar3.png'),
('KeyStorm', 'storm@typemonkey.com', 'hashed-password4', 'avatar4.png'),
('AlphaTyper', 'alpha@typemonkey.com', 'hashed-password5', 'avatar5.png'),
('BlurTyper', 'blur@typemonkey.com', 'hashed-password6', 'avatar6.png'),
('GhostKeys', 'ghost@typemonkey.com', 'hashed-password7', 'avatar7.png'),
('NeoTypist', 'neo@typemonkey.com', 'hashed-password8', 'avatar8.png'),
('FastFingers', 'fast@typemonkey.com', 'hashed-password9', 'avatar9.png'),
('QwertyChamp', 'champ@typemonkey.com', 'hashed-password10', 'avatar10.png');


INSERT INTO leaderboard (user_id, wpm, accuracy, language, time, characters)
VALUES
(1, 323.76, 98, 'English', 60, '320/2/1'),
(2, 289.45, 96, 'English', 55, '290/5/2'),
(3, 310.12, 97, 'Russian', 60, '305/3/1'),
(4, 275.88, 94, 'Russian', 50, '270/7/3'),
(5, 295.00, 95, 'English', 65, '292/5/2'),
(6, 260.33, 93, 'Russian', 45, '258/6/3'),
(7, 305.77, 99, 'English', 70, '306/1/0'),
(8, 280.41, 97, 'Russian', 60, '278/3/1'),
(9, 300.00, 98, 'English', 55, '299/2/1'),
(10, 315.25, 96, 'Russian', 58, '312/4/2');

