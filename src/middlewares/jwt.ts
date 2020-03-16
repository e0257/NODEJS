import expressJwt from 'express-jwt';
import { config } from '../config';

export const jwt = () => {
    const { secret } = config;
    return expressJwt({ secret })
        .unless({ path: ['/login'] });
};

