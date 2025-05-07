CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  avatar TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE leaderboard (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  wpm FLOAT NOT NULL,
  accuracy FLOAT NOT NULL,
  language VARCHAR(50),
  time INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  characters VARCHAR(100) NOT NULL
);

INSERT INTO users (name, email, password_hash, avatar)
VALUES
('MonkeyKing', 'king@typemonkey.com', 'hashed-password1', 'avatar1.png'),
('SpeedyTyper', 'speedy@typemonkey.com', 'hashed-password2', 'avatar2.png');


INSERT INTO leaderboard (user_id, wpm, accuracy, language, time, characters)
VALUES
(1, 323.76, 98, 'English', 60, '320/2/1'),
(2, 289.45, 96, 'English', 55, '290/5/2');

