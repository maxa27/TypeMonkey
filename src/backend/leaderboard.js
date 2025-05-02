import client from './pgClient.js';
import { success, failure } from './apiResponse.js';


// Добавить рекорд
export async function addRecord(userId, wpm, accuracy, time) {
  try {

    const existing = await client.query(
      `SELECT * FROM leaderboard WHERE user_id = $1 ORDER BY wpm DESC LIMIT 1`,
      [userId]
    );

    if (existing.rows.length > 0) {
      const prev = existing.rows[0];

      if (wpm > prev.wpm) {
        await client.query(`DELETE FROM leaderboard WHERE id = $1`, [prev.id]);

        const result = await client.query(
          `INSERT INTO leaderboard (user_id, wpm, accuracy, time)
           VALUES ($1, $2, $3, $4) RETURNING *`,
          [userId, wpm, accuracy, time]
        );

        return success(result.rows[0], 201); // 201 Created
      } else {
        return failure('Рекорд не побит — запись не обновлена', 200);
      }

    } else {
      const result = await client.query(
        `INSERT INTO leaderboard (user_id, wpm, accuracy, time)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [userId, wpm, accuracy, time]
      );

      return success(result.rows[0], 201);
    }

  } catch (err) {
    console.error('addRecord error:', err);
    return failure('Ошибка добавления рекорда', 500);
  }
}

  
  // Получить топ рекордов
  export async function getTopRecords(limit = 10) {
    try {
      const result = await client.query(
        `SELECT * FROM leader_board ORDER BY wpm DESC LIMIT $1`,
        [limit]
      );
      return success(result.rows, 200);
    } catch (err) {
      console.error('getTopRecords error:', err);
      return failure('Ошибка получения рекордов', 500);
    }
  }
  
  // Получить рекорд по Id
  export async function getRecordById(recordId) {
      try {
        const result = await client.query(
          `SELECT * FROM leader_board WHERE id = $1`,
          [recordId]
        );
        const record = result.rows[0];
    
        if (!record) return failure('Рекорд не найден', 404);
    
        return success(record, 200);
      } catch (err) {
        console.error('getRecordById error:', err);
        return failure('Ошибка получения рекорда', 500);
      }
    }
  
  // Получить рекорд по UserId
  export async function getRecordsByUserId(userId) {
      try {
        const result = await client.query(
          `SELECT * FROM leader_board WHERE user_id = $1 ORDER BY wpm DESC`,
          [userId]
        );
        return success(result.rows, 200);
      } catch (err) {
        console.error('getRecordsByUserId error:', err);
        return failure('Ошибка получения рекордов пользователя', 500);
      }
    }

    // Удалить рекорд по recordId
    export async function deleteRecord(recordId) {
      try {
        await client.query('DELETE FROM leader_board WHERE id = $1', [recordId]);
        return success(null, 200);
      } catch (err) {
        console.error('deleteRecord error:', err);
        return failure('Ошибка удаления', 500);
      }
    }
    
    