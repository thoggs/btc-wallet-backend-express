import passport from "passport";
import {Strategy as JwtStrategy, ExtractJwt, StrategyOptions} from "passport-jwt";
import dotenv from "dotenv";
import {SequelizeUserRepository} from "../adapters/persistence/repositories/SequelizeUserRepository";
import {ValidateUserToken} from "../application/usecases/token/ValidateUserToken";

dotenv.config();

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string,
    issuer: process.env.JWT_ISSUER as string,
    audience: process.env.JWT_AUDIENCE as string,
};

passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
        try {
            const userRepository = new SequelizeUserRepository();
            const validateUserToken = new ValidateUserToken(userRepository);

            const user = await validateUserToken.execute(jwtPayload.id);

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    })
);

export default passport;
