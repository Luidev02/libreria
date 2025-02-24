import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

passport.use(
    
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/users/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ where: { email: profile.emails[0].value } });
        console.log("✅ Perfil de Google:", profile.emails[0].value);

        if (!user) {
            console.log("ℹ️ Usuario no encontrado. Creando uno nuevo...");

          const hashedPassword = await bcrypt.hash(profile.id, 10);
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: hashedPassword, // Google no usa contraseña, pero la almacenamos cifrada
            role: "user",
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
