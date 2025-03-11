import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// open the database
export const connection = await open({
  filename: './data/database.db',
  driver: sqlite3.Database
});

// Function to create users table if it doesn't exist
export async function createUsersTable() {
  await connection.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      correo TEXT NOT NULL UNIQUE,
      nombre TEXT NOT NULL,
      contrasenia TEXT NOT NULL
    )
  `);
}

// Function to insert a user
export async function insertUser(nombre, correo, contrasenia) {
  await connection.run(`
    INSERT INTO usuarios (nombre, correo, contrasenia)
    VALUES (?, ?, ?)
  `, [nombre, correo, contrasenia]);
}

// Function to select all users
export async function selectAllUsers() {
  return await connection.all(`
    SELECT * FROM usuarios
  `);
}

// Check if the table exists and create it if it doesn't
const tableExists = await connection.get(`
  SELECT name FROM sqlite_master WHERE type='table' AND name='usuarios'
`);

if (!tableExists) {
  await createUsersTable();
  await insertUser('Lizbeth', 'lizbeth@example.com', 'password123');
  await insertUser('Hiram', 'hiram@example.com', 'securepass456');
  await insertUser('Diego', 'diego@example.com', 'mypassword789');
}
