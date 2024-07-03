import { userModel } from "./models/user.model.js";

const getAll = async (query) => {
  return await userModel.find(query);
};

const getOne = async (query) => {
  return await userModel.findOne(query);
};

const create = async (data) => {
  return await userModel.create(data);
};

const update = async (id, data) => {
  return await userModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteOne = async (id) => {
  return await userModel.findByIdAndDelete(id);
};

export default {
  getAll,
  getOne,
  create,
  update,
  deleteOne
}

