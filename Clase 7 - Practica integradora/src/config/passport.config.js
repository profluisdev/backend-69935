import passport from "passport";
import local from "passport-local";
import jwt from "passport-jwt";
import userDao from "../dao/user.dao.js";
import accountDao from "../dao/account.dao.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import { cookieExtractor } from "../utils/cookieExtractor.js";
import envsConfig from "./envs.config.js";

const LocalStrategy = local.Strategy;
const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

export const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, username, password, done) => {
      try {
        const { name, lastName } = req.body;
        const user = await userDao.getOne({ email: username });
        if (user) return done(null, false, { message: "User already exist" });

        const accountUser = await accountDao.create({ name, lastName });

        const newUser = {
          name,
          lastName,
          email: username,
          password: createHash(password),
          account: accountUser._id,
        };

        const createdUser = await userDao.create(newUser);

        await accountDao.update(accountUser._id, { userId: createdUser._id });

        return done(null, createdUser);
      } catch (error) {
        done(error);
      }
    })
  );

  passport.use(
    "login",
    new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
      try {
        const user = await userDao.getOne({ email: username });

        if (!user || !isValidPassword(password, user.password)) return done(null, false, { message: "User not found" });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    })
  );

  passport.use(
    "jwt",
    new JwtStrategy({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: envsConfig.JWT_CODE
    },
    async (jwt_payload, done) => {
      try {

        return done(null, jwt_payload);
        
      } catch (error) {
        done(error);
      }
    }
  )
  )

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userDao.getOne({ _id: id });
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
