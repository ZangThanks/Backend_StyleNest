const mongoose = require("mongoose");

// Định nghĩa schema cho Account
const AccountSchema = new mongoose.Schema(
  {
    id: { type: String, required: false },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
  },
  { versionKey: false }
);

AccountSchema.pre("save", async function (next) {
  if (!this.id) {
    const count = await mongoose.model("Account").countDocuments();
    this.id = String(count + 1);
  }
  next();
});

// Tạo và xuất model từ schema
const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
