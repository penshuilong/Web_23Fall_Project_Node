import { BaseUserModel, UserModel, SellerModel, AdminModel } from "./model.js";

export const createUser = async (user) => {
  try {
    console.log("Creating user:", user);
    if (user.role === 'USER') {
      return await UserModel.create(user);
    } else if (user.role === 'SELLER') {
      return await SellerModel.create(user);
    } else if (user.role === 'ADMIN') {
      return await AdminModel.create(user);
    }
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};



// export const createUser = (user) => model.create(user);
export const findAllUsers = () => BaseUserModel.find();
export const findUserById = (userId) => BaseUserModel.findById(userId);
export const findUserByUsername = (username) =>
  BaseUserModel.findOne({ username: username });

export const findUserByCredentials = (usr, pass) =>
  BaseUserModel.findOne({ username: usr, password: pass });

// export const updateUser = (userId, user) =>
// BaseUserModel.updateOne({ _id: userId }, { $set: user });
export const updateUser = async (userId, user) => {
  switch (user.role) {
    case 'USER':
      return UserModel.updateOne({ _id: userId }, { $set: user });
    case 'SELLER':
      return SellerModel.updateOne({ _id: userId }, { $set: user });
    case 'ADMIN':
      return AdminModel.updateOne({ _id: userId }, { $set: user });
    default:
      return BaseUserModel.updateOne({ _id: userId }, { $set: user });
  }
};


export const deleteUser = (userId) => BaseUserModel.deleteOne({ _id: userId });


