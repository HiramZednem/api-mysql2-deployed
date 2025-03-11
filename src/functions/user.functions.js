import { connection } from "../db/db.js";

export async function obtenerUsuarios(req, res) {
  try {
    const results = await connection.all("SELECT * FROM `usuarios`");
    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function crearUsuario(req, res) {
  try {
    const { nombre, correo, contrasenia } = req.body;

    // Validate required fields
    if (!nombre || !correo || !contrasenia) {
      const missingFields = [];
      if (!nombre) missingFields.push('nombre');
      if (!correo) missingFields.push('correo');
      if (!contrasenia) missingFields.push('contrasenia');
      res.json({ message: `Faltan las siguientes propiedades: ${missingFields.join(', ')}`, status: false });
      return;
    }

    // Check if the email already exists
    const existingUser = await connection.get(
      "SELECT * FROM `usuarios` WHERE correo = ?",
      [correo]
    );

    if (existingUser) {
      res.json({ message: "El correo ya está registrado", status: false });
      return;
    }

    // Insert the new user
    await connection.run(
      "INSERT INTO `usuarios` (nombre, correo, contrasenia) VALUES (?, ?, ?)",
      [nombre, correo, contrasenia]
    );

    res.json({ message: "Usuario creado con éxito", status: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function iniciarSesion(req, res) {
  const { correo, contrasenia } = req.body;

  // Validate required fields
  if (!correo || !contrasenia) {
    const missingFields = [];
    if (!correo) missingFields.push('correo');
    if (!contrasenia) missingFields.push('contrasenia');
    res.json({ message: `Faltan las siguientes propiedades: ${missingFields.join(', ')}`, status: false });
    return;
  }

  console.log("correoRequest", correo);
  console.log("contraseniaRequest", contrasenia);

  try {
    const results = await connection.get(
      "SELECT * FROM `usuarios` WHERE correo = ?",
      [correo]
    );

    console.log("results", results);

    if (!results) {
      res.json({ message: "el correo no existe", status: false });
      return;
    }

    if (results.contrasenia == contrasenia) {
      console.log("contrasenia correcta");
      res.json({ message: "inicio de sesion correcto", status: true });
    } else {
      console.log("contrasenia incorrecta");
      res.json({ message: "inicio de sesion incorrecto", status: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
