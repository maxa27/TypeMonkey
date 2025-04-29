DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

DROP TABLE IF EXISTS leaderboard CASCADE;
CREATE TABLE IF NOT EXISTS leaderboard (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  wpm FLOAT NOT NULL,
  accuracy INTEGER NOT NULL,
  time INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (name, email, password_hash)
VALUES
('MonkeyKing', 'king@typemonkey.com', 'hashed-password1'),
('SpeedyTyper', 'speedy@typemonkey.com', 'hashed-password2');


INSERT INTO leaderboard (user_id, wpm, accuracy, time)
VALUES
(1, 323.76, 98, 60),
(2, 289.45, 96, 55);
