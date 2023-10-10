import user from "../models/user.js";

import { encrypt } from "../utils/bcrypt.utils.js";

const getAllUsers = async () => {
  
  const allUsers = await user.findAll();
  return allUsers;
};

const addUser = async ({ nombre, email, password, celular}) => {
  const existUser = await user.findOne({ where: { email } });
  //const existUser = await prisma.user.findUnique({ where: { email } });
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

const getUser = async (id) => {
  const userFound = await user.findOne({ where: { id } });
  return userFound;
};

const updateUser = async (id, dataUser) => {
  const existUser = await user.findOne({ where: { id } });
  if (!existUser) return null;

  //funcion para actualizar en sequelize
  const updatedUser = await user.update(dataUser, { where: { id } });
  return updatedUser;
};


const deleteUser = async (id) => {
  const existUser = await user.findOne({ where: { id } });
  if (!existUser) return null;

  //funcion para eliminar en sequelize
  const deletedUser = await user.destroy({ where: { id } });
  return deletedUser;
};

export default { getAllUsers, addUser, getUser, updateUser, deleteUser};
