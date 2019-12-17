import express from 'express';
import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid';
import { User } from './models/user';

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
    public router = express.Router();

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get('/user/:id', this.getUser);
        this.router.post('/user', this.createUser);
        this.router.put('/user', this.updateUser);
        this.router.delete('/user/:id', this.deleteUser);
        this.router.get('/filter/user', this.getAutoSuggestUsers);
    }

    getUser(req: Request, res: Response) {
        const user = users.find(u => u.id === req.params.id);
        res.json(user);
    }

    getAutoSuggestUsers(req: Request, res: Response) {
        const limit = parseInt(req.query.limit, 10);
        const substr = req.query.substr;
        const result = users
            .filter( user => user.login.includes(substr))
            .sort( (a, b) => a.login.toLowerCase() > b.login.toLowerCase() ? 1 : -1)
            .slice(0, limit);
        res.json(result);
    }

    createUser(req: Request, res: Response) {
        const id = uuid();
        users.push({
            ...req.body,
            id,
            isDeleted: false
        });
        res.send(`User added with id: ${id}`)
    }

    updateUser(req: Request, res: Response) {
        const index = users.findIndex(user => user.id === req.body.id);
        if (index >= 0) {
            users[index] = {...users[index], ...req.body };
            res.send('User updated');
        } else {
            res.send('User is not found');
        }
    }

    deleteUser(req: Request, res: Response) {
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
