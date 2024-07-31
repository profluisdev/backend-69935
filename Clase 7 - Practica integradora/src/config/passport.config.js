import passport from "passport";
import local from "passport-local";
import userDao from "../dao/user.dao.js";
import accountDao from "../dao/account.dao.js";

const LocalStrategy = local.Strategy;

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
          password,
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
