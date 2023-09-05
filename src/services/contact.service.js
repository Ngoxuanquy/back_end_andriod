const { NotFoundError } = require('../core/error.response')
const { contact } = require('../models/contact.model')
// const { getProductById } = require('../models/repositories/product.repo')

class ContactService {

    static async createUserTransaction(payload) {
        try {
            // Tìm contact theo userId
            const existingContact = await contact.findOne({ userId: payload.userId });

            // Nếu đã tồn tại contact, thực hiện cập nhật thông tin
            if (existingContact) {
                existingContact.address = payload.address;
                existingContact.phone = payload.phone;
                existingContact.name = payload.name;
                const updatedContact = await existingContact.save();
                return updatedContact;
            } else {
                // Nếu không tìm thấy contact, tạo mới và lưu vào cơ sở dữ liệu
                const newContact = new contact({
                    address: payload.address,
                    phone: payload.phone,
                    userId: payload.userId,
                    name: payload.name
                });
                const createdContact = await newContact.save();
                return createdContact;
            }
        } catch (error) {
            console.error(error);
            throw new Error('Failed to create or update user transaction.');
        }
    }

    /*
        shop_order_ids = [
            {
                shopId,
                item_products: [
                    {
                        quantity,
                        price,
                        shopId,
                        old_quntity,
                        productId
                    }
                ]
            }
        ]
    */


    static async deleteUserTransaction({ userId, productId }) {

        console.log({ userId })
        console.log({ productId })

        const query = { cart_userId: userId, cart_state: 'active' },
            updateSet = {
                $pull: {
                    cart_products: {
                        productId,
                    },
                },
            }

        const deleteCart = await cart.updateOne(query, updateSet)

        return deleteCart
    }

    static async getListUserTransaction({ userId }) {
        console.log(userId)
        return await contact
            .findOne({
                userId: userId,
            })
            .lean()
    }

    static async getListUserTransactiontByShop({ shopId }) {
        console.log(shopId)
        return await transaction
            .find({
                transaction_ShopId: shopId,
            })
            .lean()
    }


}

module.exports = ContactService
