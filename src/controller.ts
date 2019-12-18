import express from 'express';
import { createValidator } from 'express-joi-validation';
import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid';
import { User } from './models';
import { userSchema } from './validation-schemas';

const users: User[] = [
    {
        id: uuid(),
        login: 'user',
        password: 'user',
        age: 22,
        isDeleted: false,
    },
    {
        id: uuid(),
        login: 'tester',
        password: 'tester',
        age: 26,
        isDeleted: false,
    },
    {
        id: uuid(),
        login: 'boss',
        password: 'boss',
        age: 29,
        isDeleted: false,
    }];

class Controller {
    router = express.Router();
    validator = createValidator({ passError: true });

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/user/:id', this.getUser);
        this.router.post('/user', this.validator.body(userSchema), this.createUser);
        this.router.put('/user', this.validator.body(userSchema), this.updateUser);
        this.router.delete('/user/:id', this.deleteUser);
        this.router.get('/filter/user', this.getAutoSuggestUsers);
    }

    private getUser(req: Request, res: Response) {
        const user = users.find(u => u.id === req.params.id);
        res.json(user);
    }

    private getAutoSuggestUsers(req: Request, res: Response) {
        const limit = parseInt(req.query.limit, 10);
        const substr = req.query.substr;
        const result = users
            .filter( user => user.login.includes(substr))
            .sort( (a, b) => a.login.toLowerCase() > b.login.toLowerCase() ? 1 : -1)
            .slice(0, limit);
        res.json(result);
    }

    private createUser(req: Request, res: Response) {
        const id = uuid();
        users.push({
            ...req.body,
            id,
            isDeleted: false
        });
        res.send(`User added with id: ${id}`);
    }

    private updateUser(req: Request, res: Response) {
        const index = users.findIndex(user => user.id === req.body.id);
        if (index >= 0) {
            users[index] = {...users[index], ...req.body };
            res.send('User updated');
        } else {
            res.send('User is not found');
        }
    }

    private deleteUser(req: Request, res: Response) {
        const index = users.findIndex(u => u.id === req.params.id);
        if (index >= 0) {
            users[index].isDeleted = true;
            res.send('User deleted');
        } else {
            res.send('User is not found');
        }
    }

}

export default new Controller();
