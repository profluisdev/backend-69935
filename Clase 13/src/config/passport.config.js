import passport from "passport";
import google from "passport-google-oauth20";
import jwt from "passport-jwt";
import local from "passport-local";
import passportCustom from "passport-custom";

import { cookieExtractor } from "../utils/cookieExtractor.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import envs from "./envs.config.js";
import { verifyToken } from "../utils/jwt.js";
import cartRepository from "../persistence/mongoDB/cart.repository.js";
import userRepository from "../persistence/mongoDB/user.repository.js";

const LocalStrategy = local.Strategy;
const GoogleStrategy = google.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const CustomStrategy = passportCustom.Strategy; 

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
        const user = await userRepository.getByEmail(username);
        if (user) return done(null, false, { message: "User already exists" });
        
        const cart = await cartRepository.create();
        const newUser = {
          first_name,
          last_name,
          password: createHash(password),
          email: username,
          age,
          cart: cart._id
        };

        const userCreate = await userRepository.create(newUser);

        return done(null, userCreate);
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.use(
    "login",
    new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
      try {
        const user = await userRepository.getByEmail(username);
        
        if (!user || !isValidPassword(user.password, password)) return done(null, false, {message: "User or email invalid"});


        return done(null, user);
      } catch (error) {
        done(error);
      }
    })
  );

  // Estrategia de Google
  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: envs.GOOGLE_CLIENT_ID,
        clientSecret: envs.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/session/google",
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          const { name, emails } = profile;
          const user = await userRepository.getByEmail(emails[0].value);

          if (user) {
            return cb(null, user);
          } else {
            const newUser = {
              first_name: name.givenName,
              last_name: name.familyName,
              email: emails[0].value,
            };

            const userCreate = await userRepository.create(newUser);
            return cb(null, userCreate);
          }
        } catch (error) {
          return cb(error);
        }
      }
    )
  );

  // Estrategia de JWT
  passport.use(
    "jwt",
    new JWTStrategy(
      {jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), secretOrKey: envs.JWT_SECRET_CODE},
      async (jwt_payload, done) => {
          try {
            
            return done(null, jwt_payload);
            
          } catch (error) {
            return done(error);
          }
      }
    )
  )

  passport.use(
    "current",
    new CustomStrategy(
      async (req, done) => {
        try {

          const token = cookieExtractor(req);
          if(!token) return done(null, false);
          const tokenVerify = verifyToken(token);
          if(!tokenVerify) return done(null, false);
          const user = await userRepository.getByEmail(tokenVerify.email)
          done(null, user);
          
        } catch (error) {
          done(error)
        }
      }
    )
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
      const user = await userRepository.getById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
