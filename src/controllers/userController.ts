import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid';
import { UserModel } from '../models';
import { Op } from 'sequelize';

class UserController {
    async getUser(req: Request, res: Response) {
        const user = await UserModel.findOne({
            where: { id: req.params.id}
        });
        res.json(user);
    }

    async getAutoSuggestUsers(req: Request, res: Response) {
        const limit = parseInt(req.query.limit, 10);
        const substr = req.query.substr || '';
        const result = await UserModel.findAll({
            where: {
                login: { [Op.like]: `%${substr}%` }
            },
            order: ['login'],
            limit: limit
        });
        res.json(result);
    }

    async createUser(req: Request, res: Response) {
        const id = uuid();
        const { login } = req.body;
        const user = await UserModel.findOne({
            where: { login: login}
        });
        if(!user) {
            await UserModel.create({
                ...req.body,
                id,
                isDeleted: false});
            res.send(`User added with id: ${id}`);
        } else {
            res.send(`User with login: "${login}" already exists`);
        }
    }

    async updateUser(req: Request, res: Response) {
        const {id} = req.body;
        const user = await UserModel.findOne({
            where: {id: id}
        });
        if (user) {
            await UserModel.update(
                {...req.body},
                {where: {id: id}});
            res.send('User updated');
        } else {
            res.send(`User is not found`);
        }
    }

    async deleteUser(req: Request, res: Response) {
        const {id} = req.params;
        const user = await UserModel.findOne({
            where: {id: id}
        });
        if (user) {
            await UserModel.update(
                {isDeleted: false},
                {where: {id: id}});
            res.send('User deleted');
        } else {
            res.send('User is not found');
        }
    }

}

export default new UserController();