import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid';
import { userService } from '../services';

class UserController {
    async getUser(req: Request, res: Response) {
        const user = await userService.getUserById(req.params.id);
        res.json(user);
    }

    async getAutoSuggestUsers(req: Request, res: Response) {
        const limit = parseInt(req.query.limit, 10) || 50;
        const substr = req.query.substr || '';
        const result = await userService.getAutoSuggestUsers(limit, substr);
        res.json(result);
    }

    async createUser(req: Request, res: Response) {
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
    }

    async updateUser(req: Request, res: Response) {
        const user = await userService.hasUser(req.body);
        if (user) {
            await userService.updateUser(req.body);
            res.send('User was updated');
        } else {
            res.send(`User is not found`);
        }
    }

    async deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        const user = await userService.hasUser({ id });
        if (user) {
            await userService.deleteUser(id);
            res.send('User was deleted');
        } else {
            res.send('User is not found');
        }
    }

}

export default new UserController();
