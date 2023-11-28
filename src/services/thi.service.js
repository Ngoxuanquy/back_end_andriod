const { NotFoundError } = require('../core/error.response')
const thiModel = require('../models/thi.model')
// const { getProductById } = require('../models/repositories/product.repo')

class ThiService {

    static async createUsers() {
        const newTransaction = new thiModel({
            MaTS: '105',
            TenTS: "Nguyên văn A",
            KetQua: "10",
        });



        try {
            const createdTransaction = await newTransaction.save();
            return createdTransaction;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to create user transaction.');
        }
    }

    static async deleteUser({ userId, productId }) {

        const query = { cart_userId: userId, cart_state: 'active' },
            updateSet = {
                $pull: {
                    cart_products: {
                        productId,
                    },
                },
            }

        const deleteCart = await shopModel.updateOne(query, updateSet)

        return deleteCart
    }

    static async updateUser(payload) {

        const query = { _id: payload.id };
        const updateSet = {
            $set: {
                MaTS: payload.MaTS,
                TenTS: payload.TenTS,
                KetQua: payload.KetQua,
            }
        };
        const updateCart = await thiModel.updateOne(query, updateSet)

        return updateCart
    }

    static async updateUserUn({ id }) {

        const query = { _id: id };
        const updateSet = {
            $set: {
                status: "inactive"
            }
        };
        const updateCart = await shopModel.updateOne(query, updateSet)

        return updateCart
    }



    static async getList({ userId }) {

           try {
        const products = await thiModel.find({}).lean();
        console.log(products);
        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }





    }
}

// static async getListUser({ shopId }) {
//     console.log(shopId)
//     return await shopModel
//         .find({
//             transaction_ShopId: shopId,
//         })
//         .lean()
// }


module.exports = ThiService
