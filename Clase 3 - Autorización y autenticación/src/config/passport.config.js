import passport from "passport";
import local from "passport-local";
import userDao from "../dao/mongoDB/user.dao.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";

const LocalStrategy = local.Strategy;

export const initializePassport = () => {
  passport.use(
    "register", // Nombre de la estrategia
    new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, username, password, done) => {
      /* 
      "register" es el nombre de la estrategia que estamos creando.
      passReqToCallback: true, nos permite acceder a la request en la función de autenticación.
      usernameField: "email", nos permite definir el campo que usaremos como username.
      done es una función que debemos llamar cuando terminamos de procesar la autenticación.
      Nota: passport recibe dos datos el username y el password, en caso de que no tengamos un campo username en nuestro formulario, podemos usar usernameField para definir el campo que usaremos como username.
      */
      try {
        const { first_name, last_name, age } = req.body;
        const user = await userDao.getByEmail(username);
        if (user) return done(null, false, { message: "User already exists" });

        const newUser = {
          first_name,
          last_name,
          password: createHash(password),
          email: username,
          age,
        };

        const userCreate = await userDao.create(newUser);

        return done(null, userCreate);
      } catch (error) {
        return done(error);
      }
    })
  );


  passport.use(
    "login",
    new LocalStrategy({usernameField:"email"}, async (username, password, done) => {
      
      try {

        const user = await userDao.getByEmail(username);
        if (!user || !isValidPassword(user.password, password)) return done(null, false);

        return done(null, user);
        
      } catch (error) {
        done(error)
      }
    })
  )




    // Serialización y deserialización de usuarios
  /* 
  La serialización y deserialización de usuarios es un proceso que nos permite almacenar y recuperar información del usuario en la sesión.
  La serialización es el proceso de convertir un objeto de usuario en un identificador único.
  La deserialización es el proceso de recuperar un objeto de usuario a partir de un identificador único.
  Los datos del user se almacenan en la sesión y se recuperan en cada petición.
  */

  passport.serializeUser((user, done) => {
    done(null, user._id); 
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userDao.getById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

};
