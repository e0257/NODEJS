import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config, controllerLogger, logger } from '../config';


class AuthController {
    async login(req: Request, res: Response) {
        try {
            const { userName, password } = req.body;
            if (userName || password) {
                const token = 'Bearer ' + jwt.sign({ sub: userName }, config.secret, { expiresIn: 3000});
                res.json({ token });
            } else {
                res.status(403).json('Bad userName/password combination.');
            }
        } catch (err) {
            logger.error('', controllerLogger('login', err.message, req.body));
            res.status(500).send(err.message)
        }
    }
}

export default new AuthController();
