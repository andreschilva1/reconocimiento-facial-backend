import {verifyToken} from '../utils/jwt.utils.js';

export function authMiddleware(req, res, next) {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ mensaje: 'Acceso denegado. Token no proporcionado.' });
    }
  
    try {
      const usuarioVerificado = verifyToken(token);
      //console.log(usuarioVerificado);

      req.body.authId = usuarioVerificado.id;
            
      next(); // Continúa con el siguiente middleware o controlador
    } catch (error) {
      res.status(400).json({ mensaje: 'Token inválido' });
    }
}