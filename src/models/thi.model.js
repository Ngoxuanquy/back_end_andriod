const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model

const DOCUMENT_NAME = 'Thi'
const COLLECTION_NAME = 'Thi'

var thiSchema = new mongoose.Schema(
    {
        MaTS: {
            type: String,
            trim: true,
            maxLength: 150,
        },
        TenTS: {
            type: String,
            unique: true,
            trim: true,
        },
        KetQua: {
            type: String,
            required: true,
        },
        
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
)

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, thiSchema)
