import * as SQLite from 'expo-sqlite';
import * as Crypto from 'expo-crypto';

let db;
export const getDB = () => {
  if (!db) db = SQLite.openDatabase('tp2.db');
  return db;
};

export const hashPassword = async (password) => {
  return await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password);
};

export const initDb = async () => {
  const database = getDB();
  return new Promise((resolve, reject) => {
    database.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT, descripcion TEXT, cantidad INTEGER
        );`
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT,
          username TEXT UNIQUE,
          password TEXT,
          role TEXT
        );`,
        [],
        () => {},
        (_,err) => { console.error('err create users', err); return true; }
      );

      tx.executeSql(
        'SELECT * FROM users WHERE username = ?;',
        ['admin'],
        async (_, { rows }) => {
          if (rows.length === 0) {
            const defaultPass = 'admin123';
            const hashed = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, defaultPass);
            tx.executeSql(
              'INSERT INTO users (nombre, username, password, role) VALUES (?, ?, ?, ?);',
              ['Administrador', 'admin', hashed, 'admin']
            );
            console.log('Admin seed creado (username: admin, pass: admin123)');
          }
        }
      );

    }, (txErr) => {
      console.error('Transaction error initDb', txErr);
      reject(txErr);
    }, () => {
      resolve();
    });
  });
};

export const createUser = async ({ nombre, username, password, role = 'user' }) => {
  const hashed = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password);
  const database = getDB();
  return new Promise((resolve, reject) => {
    database.transaction(tx => {
      tx.executeSql(
        'INSERT INTO users (nombre, username, password, role) VALUES (?, ?, ?, ?);',
        [nombre, username, hashed, role],
        (_, result) => resolve(result),
        (_, err) => { reject(err); return false; }
      );
    });
  });
};

export const updateUser = async ({ id, nombre, username, password, role }) => {
  const database = getDB();
  if (password) {
    const hashed = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password);
    return new Promise((resolve, reject) => {
      database.transaction(tx => {
        tx.executeSql(
          'UPDATE users SET nombre=?, username=?, password=?, role=? WHERE id=?;',
          [nombre, username, hashed, role, id],
          (_, res) => resolve(res),
          (_, err) => { reject(err); return false; }
        );
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      database.transaction(tx => {
        tx.executeSql(
          'UPDATE users SET nombre=?, username=?, role=? WHERE id=?;',
          [nombre, username, role, id],
          (_, res) => resolve(res),
          (_, err) => { reject(err); return false; }
        );
      });
    });
  }
};

export const deleteUser = (id) => {
  const database = getDB();
  return new Promise((resolve, reject) => {
    database.transaction(tx => {
      tx.executeSql(
        'DELETE FROM users WHERE id = ?;',
        [id],
        (_, res) => resolve(res),
        (_, err) => { reject(err); return false; }
      );
    });
  });
};

export const listUsers = () => {
  const database = getDB();
  return new Promise((resolve, reject) => {
    database.transaction(tx => {
      tx.executeSql('SELECT id, nombre, username, role FROM users;', [], (_, { rows }) => {
        resolve(rows._array);
      }, (_, err) => { reject(err); return false; });
    });
  });
};

export const getUserByUsername = (username) => {
  const database = getDB();
  return new Promise((resolve, reject) => {
    database.transaction(tx => {
      tx.executeSql('SELECT * FROM users WHERE username = ?;', [username], (_, { rows }) => {
        resolve(rows._array[0]);
      }, (_, err) => { reject(err); return false; });
    });
  });
};

export const verifyCredentials = async (username, password) => {
  const user = await getUserByUsername(username);
  if (!user) return null;
  const hashed = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password);
  if (hashed === user.password) {
    const { password: p, ...safe } = user;
    return safe;
  }
  return null;
};
