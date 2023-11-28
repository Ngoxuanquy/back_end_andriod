const { BadRequestError } = require('../core/error.response')
const { product, clothing, electronic, furniture } = require('../models/product.model')
const { inserInventory } = require('../models/repositories/inventory.repo')
const {
    findAllDraftsForShop,
    publishProductByShop,
    findAllPublishForShop,
    unPublishProductByShop,
    searchProductByUser,
    findAllProducts,
    findProduct,
    updateProductById,
    getProductById,
    getProductAll,
    deleteProductById
} = require('../models/repositories/product.repo')
const { removeUndefinedObject, updateNestedObjectParser } = require('../utils')

class ProductFactory {
    // create
    static productRegistry = {}

    static registryProductType(type, classRef) {
        ProductFactory.productRegistry[type] = classRef
    }

    static async createProduct(type, payload) {

        // console.log({ payload })
        const productClass = ProductFactory.productRegistry[type]

        console.log({ productClass })

        if (!productClass) throw new BadRequestError(`Invalid product type ${type}`)
        return new productClass(payload).createProduct()
    }

    // end create

    static async updateProduct(type, productId, payload) {
        const productClass = ProductFactory.productRegistry[type]
        if (!productClass) throw new BadRequestError(`Invalid product type ${type}`)
        return new productClass(payload).updateProduct(productId)
    }

    // query

    static async findAllDraftsForShop({ product_shop, limit = 50, skip = 0 }) {
        const query = { product_shop, isDraft: true }
        return await findAllDraftsForShop({ query, limit, skip })
    }

    static async findAllPublishForShop({ product_shop, limit = 50, skip = 0 }) {
        const query = { product_shop, isPublished: true }
        return await findAllPublishForShop({ query, limit, skip })
    }

    static async searchProduct({ keySearch }) {
        return await searchProductByUser({ keySearch })
    }

    static async findAllProducts(paload) {

        console.log({ paload })

        const limit = 10
        const sort = 'ctime'
        const page = paload.page || 1
        const filter = {}
        const select = null

        return await findAllProducts({
            limit,
            sort,
            page,
            filter,
            select: ['product_name', 'product_price', 'product_thumb', 'product_type'] || select,
        })
    }

    static async findProduct({ product_id }) {
        return await findProduct({ product_id })
    }

    // end query

    // put

    static async publishProductByShop({ product_shop, product_id }) {
        return await publishProductByShop({ product_shop, product_id })
    }

    static async unPublishProductByShop({ product_shop, product_id }) {
        return await unPublishProductByShop({ product_shop, product_id })
    }

    // end put


    //get
    static async getproductById({ product_id }) {
        return await getProductById(product_id)
    }

    static async getproductAll() {
        return await getProductAll()
        // return product.findMany().lean()
    }

    //delete
    static async dateleproductById(product_id) {
        return await deleteProductById(product_id)
    }
}

class Product {
    constructor({
        product_name,
        product_thumb,
        product_description,
        product_price,
        product_quantity,
        product_type,
        product_shop,
        product_attributes,
    }) {
        this.product_name = product_name
        this.product_thumb = product_thumb
        this.product_description = product_description
        this.product_price = product_price
        this.product_quantity = product_quantity
        this.product_type = product_type
        this.product_shop = product_shop
        this.product_attributes = product_attributes
    }

    async createProduct(product_id) {

        const newProduct = await product.create({ ...this, _id: product_id })

        if (newProduct) {
            await inserInventory({ productId: product_id, shopId: this.product_shop, stock: this.product_quantity })
        }

        return newProduct
    }

    async updateProduct(productId, bodyUpdate) {
        console.log(bodyUpdate)

        return await updateProductById({ productId, bodyUpdate, model: product })
    }
}

class Clothing extends Product {
    async createProduct() {
        const newClothing = await clothing.create({
            ...this.product_attributes,
            product_shop: this.product_shop,
        })
        if (!newClothing) throw new BadRequestError('Create new Clothing error')

        const newProduct = await super.createProduct(newClothing._id)
        if (!newProduct) throw new BadRequestError('Create new Product error')

        return newProduct
    }

    async updateProduct(productId) {
        const objectParams = removeUndefinedObject(this)

        if (objectParams.product_attributes) {
            const bodyUpdate = removeUndefinedObject(objectParams.product_attributes)
            await updateProductById({
                productId,
                bodyUpdate: updateNestedObjectParser(bodyUpdate),
                model: clothing,
            })
        }

        const updateProduct = await super.updateProduct(productId, updateNestedObjectParser(objectParams))

        return updateProduct
    }
}

class Electronics extends Product {
    async createProduct() {
        const newElectronic = await electronic.create({
            ...this.product_attributes,
            product_shop: this.product_shop,
        })
        if (!newElectronic) throw new BadRequestError('Create new Electronics error')

        const newProduct = await super.createProduct(newElectronic._id)
        if (!newProduct) throw new BadRequestError('Create new Product error')

        return newProduct
    }

    async updateProduct(productId) {
        const objectParams = removeUndefinedObject(this)

        if (objectParams.product_attributes) {
            const bodyUpdate = removeUndefinedObject(objectParams.product_attributes)
            await updateProductById({
                productId,
                bodyUpdate: updateNestedObjectParser(bodyUpdate),
                model: electronic,
            })
        }

        const updateProduct = await super.updateProduct(productId, updateNestedObjectParser(objectParams))
        return updateProduct
    }
}

class Furniture extends Product {
    async createProduct() {
        const newFurniture = await furniture.create({
            ...this.product_attributes,
            product_shop: this.product_shop,
        })
        if (!newFurniture) throw new BadRequestError('Create new newFurniture error')

        const newProduct = await super.createProduct(newFurniture._id)
        if (!newProduct) throw new BadRequestError('Create new Product error')

        return newProduct
    }

    async updateProduct(productId) {
        const objectParams = removeUndefinedObject(this)

        if (objectParams.product_attributes) {
            const bodyUpdate = removeUndefinedObject(objectParams.product_attributes)
            await updateProductById({
                productId,
                bodyUpdate: updateNestedObjectParser(bodyUpdate),
                model: furniture,
            })
        }

        const updateProduct = await super.updateProduct(productId, updateNestedObjectParser(objectParams))

        return updateProduct
    }
}

ProductFactory.registryProductType('Clothing', Clothing)
ProductFactory.registryProductType('Electronics', Electronics)
ProductFactory.registryProductType('Furniture', Furniture)

module.exports = ProductFactory
