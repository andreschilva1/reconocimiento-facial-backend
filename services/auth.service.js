import { encrypt, verify } from "../utils/bcrypt.utils.js";
import {generateToken} from "../utils/jwt.utils.js";
import user from "../models/user.js";


const register = async ({ nombre, email, password, celular }) => {
  const existUser = await user.findOne({ where: { email } });
  if (existUser) return null;

  const passwordHash = await encrypt(password);
  const newUser = await user.create({
    nombre,
    email,
    password: passwordHash,
    celular,
  });

  return newUser;
};

const login = async ({ email, password }) => {
  const userFound = await user.findOne({ where: { email } });
  if (!userFound) return null;

  const passwordHash = userFound.password;
  const isCorrect = await verify(password, passwordHash);
  if (!isCorrect) return null;

  const token = generateToken(userFound);

  const data = {
    id: userFound.id,
    nombre: userFound.nombre,
    email: userFound.email,
    celular: userFound.celular,
    token,
  };
  return data;
};

export default {
  register,
  login,
};
