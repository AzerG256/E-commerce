const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

// Method to compare input password with the stored hashed password
UserSchema.methods.comparePassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
};
// Pre-save middleware to hash the password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Skip hashing if password is not modified
    this.password = await bcrypt.hash(this.password, 10); // Hash password with a salt of 10
    next();
});
// Create and export the User model
const User = mongoose.model('User', UserSchema);
module.exports = User;