import {Request, Response, NextFunction} from 'express';
import passport from 'passport';
import {UnauthorizedError} from '../../../shared/errors/UnauthorizedError';

const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', {session: false}, (err: any, user: Express.User | undefined) => {
        if (err || !user) {
            return next(new UnauthorizedError('Authentication Failed: Access denied.'));
        }
        req.user = user;
        next();
    })(req, res, next);
};

export default authenticateJwt;
