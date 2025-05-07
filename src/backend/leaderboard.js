import client from './pgClient.js';
import { success, failure } from './apiResponse.js';


// Добавить рекорд
export async function addRecord(userId, wpm, accuracy, time, characters, language) {
  try {
    // Получаем лучший результат пользователя для заданной комбинации языка и времени
    const { rows } = await client.query(
      `SELECT * FROM leaderboard
       WHERE user_id = $1 AND language = $2 AND time = $3
       ORDER BY wpm DESC LIMIT 1`,
      [userId, language, time]
    );

    const best = rows[0];

    if (best && wpm <= best.wpm) {
      return failure('Рекорд не побит — запись не обновлена', 200);
    }

    // Если старый рекорд есть — удаляем его
    if (best) {
      await client.query(`DELETE FROM leaderboard WHERE id = $1`, [best.id]);
    }

    // Вставляем новый рекорд
    const insert = await client.query(
      `INSERT INTO leaderboard (user_id, wpm, accuracy, time, characters, language)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [userId, wpm, accuracy, time, characters, language]
    );

    return success(insert.rows[0], 201);

  } catch (err) {
    console.error('addRecord error:', err);
    return failure('Ошибка добавления рекорда', 500);
  }
}
// ДОСТАТЬ РАНК!!!
export async function getUserRank(userId, language, time) {
  try {
    const result = await client.query(`
      SELECT *
      FROM (
        SELECT
          l.*,
          RANK() OVER (
            PARTITION BY l.language, l.time
            ORDER BY l.wpm DESC
          ) AS rank
        FROM leaderboard l
      ) sub
      WHERE sub.user_id = $1 AND sub.language = $2 AND sub.time = $3
      LIMIT 1
    `, [userId, language, time]);

    const row = result.rows[0];
    if (!row) return failure("Рекорд не найден", 404);

    return success({ rank: row.rank }, 200);
  } catch (err) {
    console.error("getUserRank error:", err);
    return failure("Ошибка получения ранга", 500);
  }
}



// Получить топ рекордов
export async function getLeaderboardRecords(time, language, metric = 'wpm') {
  try {
    const result = await client.query(
      `SELECT l.*, u.name, u.avatar
         FROM leaderboard l
         JOIN users u ON l.user_id = u.id
         WHERE l.time = $1 AND l.language = $2
         ORDER BY l.${metric} DESC`,
      [time, language]
    );

    return success(result.rows, 200);
  } catch (err) {
    console.error("getLeaderboardRecords error:", err);
    return failure("Ошибка загрузки таблицы лидеров", 500);
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

// // Получить рекорд по UserId
// export async function getBestRecordByUserId(userId) {
//   try {
//     const result = await client.query(
//       `SELECT * FROM leaderboard WHERE user_id = $1 ORDER BY wpm DESC LIMIT 1`,
//       [userId]
//     );
//     return success(result.rows[0], 200);
//   } catch (err) {
//     console.error('getBestRecordByUserId error:', err);
//     return failure('Ошибка получения лучшего рекорда', 500);
//   }
// }

export async function getBestUserRank(userId) {
  try {
    // 1. Получить все рекорды пользователя
    const { rows } = await client.query(
      `SELECT * FROM leaderboard WHERE user_id = $1`,
      [userId]
    );

    if (!rows.length) return failure('У пользователя нет рекордов', 404);

    // 2. Найти лучший по WPM
    const best = rows.sort((a, b) => b.wpm - a.wpm)[0];

    // 3. Узнать его ранг
    const rankedQuery = `
      SELECT * FROM (
        SELECT l.*, RANK() OVER (ORDER BY wpm DESC) AS rank
        FROM leaderboard l
        WHERE time = $1 AND language = $2
      ) ranked
      WHERE id = $3
    `;

    const result = await client.query(rankedQuery, [best.time, best.language, best.id]);

    return success(result.rows[0], 200);
  } catch (err) {
    console.error('getBestUserRank error:', err);
    return failure('Ошибка получения ранга', 500);
  }
}



// Удалить рекорд по recordId
export async function deleteRecord(id) {
  try {
    const result = await client.query(`DELETE FROM leaderboard WHERE id = $1 RETURNING *`, [id]);
    if (result.rowCount === 0) return failure("Запись не найдена", 404);
    return success(result.rows[0], 200);
  } catch (err) {
    console.error("deleteRecord error:", err);
    return failure("Ошибка при удалении записи", 500);
  }
}


