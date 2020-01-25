import { UserModel } from "../models";
import { Op } from "sequelize";
import { User } from "../DTO";

class UserService {

    getUserById(id: string) {
        return UserModel.findOne({
            where: {id: id}
        });
    }

    getAutoSuggestUsers(limit: number, substr: string) {
        return UserModel.findAll({
            where: {
                login: { [Op.like]: `%${substr}%` },
                isDeleted: false
            },
            order: ['login'],
            limit: limit
        });
    }

    createUser(user: User) {
        return UserModel.create(user);
    }

    deleteUser(id: string) {
        return UserModel.update(
            { isDeleted: true },
            { where: { id: id } });
    }

    updateUser(user: User){
        return UserModel.update(user,
            { where: { id: user.id } });
    }

    hasUser(user: Partial<User>) {
        return UserModel.findOne({
            where: {
                [Op.or]: [{
                    login: user.login! || ''
                }, {
                    id: user.id! || ''
                }],
                [Op.and]: {
                    isDeleted: false
                }
            }
        });
    }
}

export const userService =  new UserService();