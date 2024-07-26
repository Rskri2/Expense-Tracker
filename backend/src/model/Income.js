const mongoose = require('mongoose');
const mongoosepaginate = require('mongoose-paginate-v2')
const User = require('../model/User');

const incomeSchema = mongoose.Schema({
    title:{
        type: String,
        required:[true,' Title is required']
    },
    description:{
        type:String,
        required:[true, 'Description is required']
    },
    type:{
        type: String,
        default:'income'
    },
    amount:{
        type:Number,
        required:[true, 'Amount is required']
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    category:{
        type:String,
        required:[true, 'category is required']
    },
    date:{
        type:Date
    }
},
{
    timestamps:true,
    toJSON:{virtuals: true},
    toObject: { virtuals:true }
}
)

incomeSchema.plugin(mongoosepaginate);

const Income = mongoose.model('Income',incomeSchema);
Income.paginate().then({})
module.exports = Income;