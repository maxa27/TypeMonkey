import bcrypt from 'bcrypt';
import client from './pgClient.js';
import { success, failure } from './apiResponse.js';

// Регистрация нового пользователя
export async function registerUser(name, email, password, avatar) {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const query = `
        INSERT INTO "users" (name, email, password_hash, avatar)
        VALUES ($1, $2, $3, $4)
        RETURNING id, name, email, avatar;
      `;
    const values = [name, email, passwordHash, avatar];
    const result = await client.query(query, values);

    return success(result.rows[0], 201); // 201 Created
  } catch (err) {
    console.error('registerUser error:', err);
    return failure('Ошибка регистрации пользователя', 500);
  }
}

// Логин: проверка email + password
export async function loginUser(email, password) {
  try {
    const result = await client.query(`SELECT * FROM "users" WHERE email = $1`, [email]);
    const user = result.rows[0];

    if (!user) return failure('Пользователь не найден', 404);

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return failure('Неверный пароль', 401);

    return success({
      id: user.id,
      name: user.name,
      email: user.email,
    }, 200);
  } catch (err) {
    console.error('loginUser error:', err);
    return failure('Ошибка входа', 500);
  }
}

// Получить пользователя по email
export async function getUserByEmail(email) {
  try {
    const result = await client.query(`SELECT * FROM "users" WHERE email = $1`, [email]);
    const user = result.rows[0];

    if (!user) return failure('Пользователь не найден', 404);

    return success(user, 200);
  } catch (err) {
    console.error('getUserByEmail error:', err);
    return failure('Ошибка получения пользователя', 500);
  }
}

// Получить пользователя по id
export async function getUserById(id) {
  try {
    const result = await client.query(`SELECT * FROM "users" WHERE id = $1`, [id]);
    const user = result.rows[0];

    if (!user) return failure('Пользователь не найден', 404);

    return success(user, 200);
  } catch (err) {
    console.error('getUserById error:', err);
    return failure('Ошибка получения пользователя', 500);
  }
}

// Обновить имя
export async function updateUserName(userId, newName) {
  try {
    await client.query(
      `UPDATE users SET name = $1, updated_at = NOW() WHERE id = $2`,
      [newName, userId]
    );
    return success(null, 200);
  } catch (err) {
    return failure("Ошибка обновления имени", 500);
  }
}

// Обновить аватар
export async function updateUserAvatar(userId, avatarBase64) {
  try {
    await client.query(
      `UPDATE users SET avatar = $1, updated_at = NOW() WHERE id = $2`,
      [avatarBase64, userId]
    );
    return success(null, 200);
  } catch (err) {
    console.error('updateUserAvatar error:', err);
    return failure('Ошибка обновления аватара', 500);
  }
}



