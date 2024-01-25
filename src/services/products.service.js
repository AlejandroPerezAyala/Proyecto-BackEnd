export default class ProductServices{

    constructor(dao) {
        this.dao = dao
    }

    getProducts =  async (limit, page, sort, query) => {
        return await this.dao.getProducts(limit, page, sort, query)
    }

    getAddProducts = async (producto) => {
        return await this.dao.getAddProducts(producto)
    }

    getProductById = async (id) => {
        return await this.dao.getProductById(id)
    }

    updateProduct = async (id, update) => {
        return await this.dao.updateProduct(id, update)
    }

    deleteProduct = async (id) => {
        return await this.dao.deleteProduct(id)
    }
}