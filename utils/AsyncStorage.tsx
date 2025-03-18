import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

export interface UserTypes {
  id: string,
  email:string,
  password:string,
}

const saveUser = async (newUser: { email: string; password: string }) => {
  try {
    const existingUsers = await AsyncStorage.getItem("users");
    let usersArray = existingUsers ? JSON.parse(existingUsers) : [];

    const userWithId = {
      id: uuid.v4(),
      ...newUser,
    };

    usersArray.push(userWithId);

    await AsyncStorage.setItem("users", JSON.stringify(usersArray));

    console.log("Foydalanuvchi muvaffaqiyatli saqlandi!", userWithId);
  } catch (error) {
    console.error("Xatolik:", error);
  }
};

const getUsers = async () => {
  try {
    const users = await AsyncStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error("Xatolik:", error);
    return [];
  }
};

const getUserById = async (id: string) => {
  try {
    const users = await getUsers();
    const user = users.find((u: { id: string }) => u.id === id);

    if (user) {
      console.log("Foydalanuvchi topildi:", user);
      return user;
    } else {
      console.log("Foydalanuvchi topilmadi!");
      return null;
    }
  } catch (error) {
    console.error("Xatolik:", error);
    return null;
  }
};

const deleteUserById = async (id: string) => {
  try {
    let users = await getUsers();
    const filteredUsers = users.filter(
      (user: { id: string }) => user.id !== id
    );

    await AsyncStorage.setItem("users", JSON.stringify(filteredUsers));

    console.log(`Foydalanuvchi (${id}) o‘chirildi!`);
  } catch (error) {
    console.error("Xatolik:", error);
  }
};

const updatePasswordById = async (id: string, newPassword: string) => {
  try {
    let users = await getUsers();
    let updatedUsers = users.map((user: { id: string; password: string }) =>
      user.id === id ? { ...user, password: newPassword } : user
    );

    await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
    console.log(`Foydalanuvchi (${id}) paroli yangilandi!`);
  } catch (error) {
    console.error("Xatolik:", error);
  }
};

const AsyncStorageUserFunctions = {
  saveUser,
  getUsers,
  deleteUserById,
  getUserById,
  updatePasswordById,
};

export default AsyncStorageUserFunctions;
