import { User } from "../models/user.model.js";

export async function addUser(name, pwd, isAdmin = false) {
    const user = await User.create({nombre: name, password: pwd, is_admin: isAdmin});
    return user;
}

export async function findUser(id) {
    return await User.findByPk(id);
}
