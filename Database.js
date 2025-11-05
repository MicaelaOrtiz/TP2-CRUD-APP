import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('datos_tp2_estilo.db');

export const initDatabase = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY NOT NULL, nombre TEXT NOT NULL, descripcion TEXT, cantidad INTEGER);',
        [], 
        () => {
          resolve(); 
        },
        (_, err) => {
          reject(err); 
          return false; 
        }
      );
    });
  });
  return promise;
};

export const createItem = (nombre, descripcion, cantidad) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO items (nombre, descripcion, cantidad) VALUES (?, ?, ?);',
        [nombre, descripcion, cantidad], 
        (_, result) => resolve(result),
        (_, err) => { reject(err); return false; }
      );
    });
  });
  return promise;
};

export const getItems = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM items ORDER BY id DESC;',
        [], 
        (_, result) => {
          const items = [];
          for (let i = 0; i < result.rows.length; i++) {
            items.push(result.rows.item(i));
          }
          resolve(items); 
        },
        (_, err) => { reject(err); return false; }
      );
    });
  });
  return promise;
};

export const updateItem = (id, nombre, descripcion, cantidad) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE items SET nombre = ?, descripcion = ?, cantidad = ? WHERE id = ?;',
        [nombre, descripcion, cantidad, id],
        (_, result) => resolve(result), 
        (_, err) => { reject(err); return false; }
      );
    });
  });
  return promise;
};

export const deleteItem = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM items WHERE id = ?;',
        [id],
        (_, result) => resolve(result), 
        (_, err) => { reject(err); return false; }
      );
    });
  });
  return promise;
};