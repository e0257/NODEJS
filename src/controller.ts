import express from 'express';
import { Request, Response } from 'express'
import {User} from "./models/user";

const users: User[] = [
    {
        id: '1',
        login: 'user',
        password: 'user',
        age: 22,
        isDeleted: false,
    },
    {
        id: '2',
        login: 'tester',
        password: 'tester',
        age: 26,
        isDeleted: false,
    },
    {
        id: '3',
        login: 'boss',
        password: 'boss',
        age: 29,
        isDeleted: false,
    }];

class Controller {
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get('/user/:id', this.getUser);
        this.router.post('/user', this.createUser);
        this.router.put('/user/:id', this.updateUser);
        this.router.delete('/user/:id', this.deleteUser);
        this.router.get('/user/filter/:limit/:substr',this.getAutoSuggestUsers);
    }

    getUser(req: Request, res: Response) {
        const user = users.find(user => user.id === req.params.id);
        res.send(user);
    }

    getAutoSuggestUsers(req: Request, res: Response) {
        const { limit, substr } = req.params;
        const result = users
            .filter( user => user.login.includes(substr))
            .slice(0, +limit)
            .sort( (a, b) => a.login.toLowerCase() > b.login.toLowerCase() ? 1 : -1);
        res.send(result);
    }

    createUser(req: Request, res: Response) {}

    updateUser(req: Request, res: Response) {}

    deleteUser(req: Request, res: Response) {
        const index = users.findIndex(user => user.id === req.params.id);
        if (index >= 0) {
            users[index].isDeleted = true;
            res.send('User deleted');
        } else {
            res.send('User is not found');
        }
    }

}

export default new Controller();