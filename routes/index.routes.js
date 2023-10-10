import auth from "./auth.routes.js";
import foto from "./foto.routes.js";
import user from "./user.routes.js";
import personaDesaparecida from "./personaDesaparecida.routes.js";

const PREFIX_API = "/api";

export const routeMappings = [
  { routeName: "auth", prefix: PREFIX_API },
  { routeName: "foto", prefix: PREFIX_API },
  { routeName: "user", prefix: PREFIX_API },
  { routeName: "personaDesaparecida", prefix: PREFIX_API },
];

export default {
  auth,
  foto,
  user,
  personaDesaparecida,
};
