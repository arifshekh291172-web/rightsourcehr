const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: "/api/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  // In production, find or create user in DB
  return done(null, profile);
}));

passport.serializeUser((u, done)=> done(null,u));
passport.deserializeUser((u, done)=> done(null,u));
