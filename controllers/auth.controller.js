import AuthService from "../services/auth.service.js";
import user from "../models/user.js";

const register = async (req, res) => {
  try {
    const { nombre, email, password, celular } = req.body;
    const newUser = await AuthService.register({
      nombre,
      email,
      password,
      celular,
    });

    if (!newUser)
      return res.status(400).json({ message: "El email ya esta en uso" });

    return res.status(201).json(newUser);
  } catch (error) {
    console.log("Error Server: ", error);
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const userAndToken = await AuthService.login({ email, password });

    if (!userAndToken) {
      return res
        .status(400)
        .json({ message: "El email o password son incorrectos" });
    }

    return res.status(200).json(userAndToken);
  } catch (error) {
    console.log("Error Server: ", error);
    res.status(500).json(error);
  }
};

const getAuthUser = async (req, res) => {
  try {
    const idUser = req.body.authId;
    const userAuht = await user.findOne({ where: { id:idUser } });
    if (!userAuht) return res.status(400).json({ message: "El usuario no existe" });

    return res.status(200).json(userAuht);
  } catch (error) {
    console.log("Error Server: ", error);
    return es.status(500).json(error);
  }
};


/* const isAlive = async (req, res) => {
  return res.status(200).json({ message: "is Ok" });
}; */

export{
  register,
  login,
  getAuthUser,
};
