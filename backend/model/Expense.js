const mongoose = require('mongoose');
const mongoosepaginate = require('mongoose-paginate-v2');
const User = require('./User');
const expenseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'title is required']
    },
    description:{
        type: String,
        required:[true, 'Description is required']
    },
    type:{
        type:String,
        default:"expense"
    },
    amount:{
        type: Number,
        required: [true,'Amount is required']
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    category:{
        type:String,
        required:[true,'Category is required']
    },
    date:{
        type:Date
    }
},{
    timestamp:true
})

expenseSchema.plugin(mongoosepaginate);
const Expense = mongoose.model('Expense',expenseSchema);
Expense.paginate().then({});
module.exports = Expense;