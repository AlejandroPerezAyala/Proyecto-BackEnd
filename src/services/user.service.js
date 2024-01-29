export default class UserServices{

    constructor(dao) {
        this.dao = dao
    }

    getUser =  async (id) => {
        return await this.dao.getUser(id)
    }

    
}