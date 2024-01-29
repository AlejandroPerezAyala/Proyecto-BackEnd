import { userService } from "../services/index.js";

export const getUser = async (req, res) => {

    const {user} = req.user

    const result = await userService.getUser(user._id)

    res.send(result)
}