export default class CartServices{

    constructor(dao){
        this.dao = dao
    }

    createCart = async () => {
        return await this.dao.createCart()
    }

    getCarts = async () => {
        return await this.dao.getCarts()
    }

    getCartById = async (cid) => {
        return await this.dao.getCartById(cid)
    }

    addProductInCart = async (cid, pid) => {
        return await this.dao.addProductInCart(cid,pid)
    }

    deleteProductInCart = async (cid, pid) => {
        return await this.dao.deleteProductInCart(cid, pid)
    }

    deleteAllProducts = async (cid) => {
        return await this.dao.deleteAllProducts(cid)
    }

    updateProductInCart = async(cid, pid, update) => {
        return await this.dao.updateProductInCart(cid, pid, update)
    }

    updateProductsInCart = async (cid, update) => {
        return await this.dao.updateProductsInCart(cid, update)
    }

    purchaseProducts = async (cid, email) => {
        return await this.dao.purchaseProducts(cid, email)
    }

}