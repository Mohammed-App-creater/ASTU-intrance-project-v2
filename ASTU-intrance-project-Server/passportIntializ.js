import passportLocal from "passport-local";
import bcrypt from "bcrypt";



async function initializem(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
      try {
        const user = await getUserByEmail(email);
  
        if (!user) {
          return done(null, false, { message: 'No user with that email' });
        }
  
        const isMatch = await bcrypt.compare(password, user.password);
  
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Password incorrect' });
        }
      } catch (error) {
        console.error('Error during authentication:', error);
        return done(error);
      }
    };
  
    passport.use(new passportLocal({ usernameField: 'email' }, authenticateUser));
  
    passport.serializeUser((user, done) => {
      console.log("Serializing user:", user);
      done(null, user.id); // Store the user ID in the session.
    });
    
    passport.deserializeUser(async (id, done) => {
      console.log("Deserializing user ID:", id); // Debugging log
      try {
        const user = await getUserById(id); // Fetch user by ID
        if (!user) {
          return done(null, false); // No user found
        }
        console.log("User fetched during deserialization:", user);
        done(null, user); // Attach the user object to req.user
      } catch (err) {
        console.error("Error during deserialization:", err);
        done(err, null);
      }
    });
    
    

    console.log('Passport initialized'); 
  }

export default initializem;