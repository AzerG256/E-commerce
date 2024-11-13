const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    address: { type: String },
    phone: { type: String },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);