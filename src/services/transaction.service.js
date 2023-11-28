const { NotFoundError } = require('../core/error.response');
const { transaction } = require('../models/transaction.model');
// const { getProductById } = require('../models/repositories/product.repo')

class TransactionService {
    // START REPO CART
    // tạo giỏ hàng
    // static async createUserTransaction({ user, product, shopId }) {
    //     const query = { transaction_state: 'active', transaction_ShopId: shopId },
    //         updateOrInsert = {
    //             $addToSet: {
    //                 transaction_products: product,
    //                 transaction_userId: user,
    //             },
    //         },
    //         options = {
    //             upsert: true,
    //             new: true,
    //         }

    //     return await transaction.create(query, updateOrInsert, options)
    // }

    static async createUserTransaction({ user, product, notifications , voucher}) {
        console.log({ voucher });
        product = product.map(order => ({ ...order, voucher: voucher }));

        notifications = notifications[0];

        const newTransaction = new transaction({
            transaction_state: 'active',
            userId: user.userId,
            // transaction_ShopId: shopId,
            transaction_products: product,
            transaction_userId: [user],
            notifications: notifications || 'null',
        });

        try {
            const createdTransaction = await newTransaction.save();
            return createdTransaction;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to create user transaction.');
        }
    }

    static async deleteProduct({ userId, newCartData, createdOn }) {
        console.log({ createdOn });

        const oldCart = await transaction.findOne({
            userId: userId,
            createdOn: createdOn,
        });

        if (!oldCart) {
            throw new Error('Cart not found.');
        }
        console.log({ oldCart });

        // Convert old and new data to JSON strings for comparison
        const oldCartJSON = JSON.stringify(oldCart.transaction_products);
        const newCartDataJSON = JSON.stringify(newCartData);

        console.log({ oldCartJSON });
        console.log({ newCartDataJSON });

        if (oldCartJSON === newCartDataJSON) {
            // If the data is equal, delete the cart
            await transaction.deleteOne({
                userId: userId,
                createdOn: createdOn,
            });
            return null; // Indicate that the cart has been deleted
        } else {
            // Compare old and new data to find new items in newCartData
            // for (const newItem of newCartData) {
            //     oldCart.transaction_products.forEach((product, index) => {
            //         if (newItem._id === product._id) {
            //             oldCart.transaction_products.splice(index, 1); // Loại bỏ phần tử tại vị trí index
            //         }
            //     });
            // }

            const newproduct = (oldCart.transaction_products =
                oldCart.transaction_products.filter((product) => {
                    return !newCartData.some(
                        (newItem) => newItem._id === product._id,
                    );
                }));

            console.log({
                Newtransaction_products: newproduct,
            });
            // Update the cart with the filtered cart_products
            const filter = { userId: userId, createdOn: createdOn };
            const update = {
                $set: {
                    transaction_products: newproduct,
                },
            };

            const options = { new: true };

            const updatedCart = await transaction.updateOne(
                filter,
                update,
                options,
            );

            return updatedCart;
        }
    }

    static async deleteUserTransaction({ userId, productId }) {
        console.log({ userId });
        console.log({ productId });

        const query = { cart_userId: userId, cart_state: 'active' },
            updateSet = {
                $pull: {
                    cart_products: {
                        productId,
                    },
                },
            };

        const deleteCart = await cart.updateOne(query, updateSet);

        return deleteCart;
    }

    static async updateStatus({ userId, product }) {
        console.log(JSON.stringify(product));
        console.log({ userId });

        const query = {
                userId: userId,
                transaction_products: product,
            },
            updateSet = {
                $set: {
                    status: 'Đã gửi hàng',
                },
            };

        try {
            const updateResult = await transaction.updateOne(query, updateSet);
            console.log(
                `${updateResult.modifiedCount} bản ghi đã được cập nhật.`,
            );
            return updateResult;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    static async getListUserTransaction({ userId }) {
        try {
            console.log(userId);

            // Use the 'findMany' method to find multiple documents where 'userId' matches
            const transactions = await transaction.find({ userId }).lean();

            // Return an array of matching documents
            return transactions;
        } catch (error) {
            // Handle any errors (e.g., database connection error)
            console.error('Error fetching user transactions:', error);
            throw error;
        }
    }

    static async getFull() {
        try {
            // Use the 'findMany' method to find multiple documents where 'userId' matches
            const transactions = await transaction
                .find({
                    status: 'Đang nhận đơn',
                })
                .lean();

            // Return an array of matching documents
            return transactions;
        } catch (error) {
            // Handle any errors (e.g., database connection error)
            console.error('Error fetching user transactions:', error);
            throw error;
        }
    }

    static async getFullUseId({ userId }) {
        try {
            // Use the 'findMany' method to find multiple documents where 'userId' matches
            const transactions = await transaction
                .find({
                    status: 'Đang nhận đơn',
                    userId: userId,
                })
                .lean();

            // Return an array of matching documents
            return transactions;
        } catch (error) {
            // Handle any errors (e.g., database connection error)
            console.error('Error fetching user transactions:', error);
            throw error;
        }
    }

    static async getFullOrder_done() {
        try {
            // Use the 'findMany' method to find multiple documents where 'userId' matches
            const transactions = await transaction
                .find({
                    status: 'Đã gửi hàng',
                })
                .lean();

            // Return an array of matching documents
            return transactions;
        } catch (error) {
            // Handle any errors (e.g., database connection error)
            console.error('Error fetching user transactions:', error);
            throw error;
        }
    }

    static async getFullOrder_doneUseId({ userId }) {
        try {
            // Use the 'findMany' method to find multiple documents where 'userId' matches
            const transactions = await transaction
                .find({
                    status: 'Đã gửi hàng',
                    userId: userId,
                })
                .lean();

            // Return an array of matching documents
            return transactions;
        } catch (error) {
            // Handle any errors (e.g., database connection error)
            console.error('Error fetching user transactions:', error);
            throw error;
        }
    }
}

module.exports = TransactionService;
