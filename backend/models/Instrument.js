const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const instrumentSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      trim: true, 
      requrie: true,
      maxlength: 32,
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        require: true
      },
    price: {
      type: Number,
      trim: true,
      require: true,
      maxlength: 32,
    },  
    quantity: {
      type: Number,
    },
    description: {
        type: String,
        trim: true,
        require: true,
        maxlength: 2000
      },
    photo: {
      data: Buffer,
      contentType: String
    }
  },
  {timestamps: true}
);

module.exports = mongoose.model("Instrument", instrumentSchema);

