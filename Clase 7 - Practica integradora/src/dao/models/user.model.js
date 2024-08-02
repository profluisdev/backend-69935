import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  account: {type: mongoose.Schema.Types.ObjectId, ref: "accounts"}

})

userSchema.pre("findOne", function () {
  this.populate("account");
})

export const userModel = mongoose.model(userCollection, userSchema)