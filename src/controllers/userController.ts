import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid';
import { userService } from '../services';
import { controllerLogger, logger} from "../config";

class UserController {
    async getUser(req: Request, res: Response) {
        try {
            const user = await userService.getUserById(req.params.id);
            res.json(user);
        } catch (err) {
            logger.error('', controllerLogger('getUser', err.message));
            res.status(500).send(err.message)
        }
    }

    async getAutoSuggestUsers(req: Request, res: Response) {
        try {
            const limit = parseInt(req.query.limit, 10) || 50;
            const substr = req.query.substr || '';
            const result = await userService.getAutoSuggestUsers(limit, substr);
            res.json(result);
        } catch (err) {
            logger.error('', controllerLogger('getAutoSuggestUsers', err.message, req.query));
            res.status(500).send(err.message)
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const id = uuid();
            const userExists = await userService.hasUser(req.body);
            if (!userExists) {
                await userService.createUser({
                    ...req.body,
                    id,
                    isDeleted: false
                });
                res.send(`User was added with id: ${id}`);
            } else {
                res.send(`User with login: "${req.body.login}" already exists`);
            }
        } catch (err) {
            logger.error('', controllerLogger('createUser', err.message, req.body));
            res.status(500).send(err.message)
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const user = await userService.hasUser(req.body);
            if (user) {
                await userService.updateUser(req.body);
                res.send('User was updated');
            } else {
                res.send(`User is not found`);
            }
        } catch (err) {
            logger.error('', controllerLogger('updateUser', err.message, req.body));
            res.status(500).send(err.message)
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await userService.hasUser({ id });
            if (user) {
                await userService.deleteUser(id);
                res.send('User was deleted');
            } else {
                res.send('User is not found');
            }
        } catch (err) {
            logger.error('', controllerLogger('deleteUser', err.message, req.params));
            res.status(500).send(err.message)
        }
    }

}

export default new UserController();
