export default class UserServices{

    constructor(dao) {
        this.dao = dao
    }

    getUser =  async (id) => {
        return await this.dao.getUser(id)
    }

    getUserByEmail = async (email) => {
        return await this.dao.getUserByEmail(email)
    }

    
}