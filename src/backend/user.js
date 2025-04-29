import bcrypt from 'bcrypt';
import client from './pgClient.js';
import { success, failure } from './apiResponse.js';

// Регистрация нового пользователя
export async function registerUser(name, email, password) {
    try {
      const passwordHash = await bcrypt.hash(password, 10);
      const query = `
        INSERT INTO "users" (name, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING id, name, email;
      `;
      const values = [name, email, passwordHash];
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
  
