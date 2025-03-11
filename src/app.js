import express from 'express';
import { crearUsuario, iniciarSesion, obtenerUsuarios } from "./functions/user.functions.js";
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const app = express();

app.use(express.json());
app.use(cors());



app.get('/', (req, res) => {
  res.send('Api Working');
});
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Has hecho demasiadas peticiones, contacta a el inge Hiram pa q te ayude, o espera 15 minutos'
});

app.use(limiter);
app.get('/users', obtenerUsuarios);
app.post('/users',crearUsuario)
app.post('/users/iniciarsesion',iniciarSesion)


app.listen(8080, () => {
  console.log('Server is running at port 8080');
});