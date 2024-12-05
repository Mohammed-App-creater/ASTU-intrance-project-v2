import passportLocal from "passport-local";
import bcrypt from "bcrypt";

async function initializem(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    try {
      const user = await getUserByEmail(email);

      if (!user) {
        return done(null, false, { message: "No user with that email" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      return done(error);
    }
  };

  passport.use(new passportLocal({ usernameField: "email" }, authenticateUser));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await getUserById(id);
      if (!user) {
        return done(null, false);
      }

      done(null, user); // Attach the user object to req.user
    } catch (err) {
      done(err, null);
    }
  });

  console.log("Passport initialized");
}

export default initializem;
