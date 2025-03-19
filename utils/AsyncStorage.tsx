import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

export interface UserTypes {
  id: string,
  email: string,
  password: string,
  localPassword?: string,
}

const saveUser = async (newUser: { email: string; password: string }) => {
  try {
    const existingUsers = await AsyncStorage.getItem("users");
    let usersArray = existingUsers ? JSON.parse(existingUsers) : [];

    const userWithId = {
      id: uuid.v4(),
      ...newUser,
      localPassword: "", // Default bo'sh qiymat
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
    return users.find((user: UserTypes) => user.id === id) || null;
  } catch (error) {
    console.error("Xatolik:", error);
    return null;
  }
};

const deleteUserById = async (id: string) => {
  try {
    let users = await getUsers();
    const filteredUsers = users.filter((user: UserTypes) => user.id !== id);
    await AsyncStorage.setItem("users", JSON.stringify(filteredUsers));
    console.log(`Foydalanuvchi (${id}) o‘chirildi!`);
  } catch (error) {
    console.error("Xatolik:", error);
  }
};

const updateLocalPassword = async (id: string, newLocalPassword: string) => {
  try {
    let users = await getUsers();
    users = users.map((user: UserTypes) =>
      user.id === id ? { ...user, localPassword: newLocalPassword } : user
    );
    await AsyncStorage.setItem("users", JSON.stringify(users));
    console.log(`Foydalanuvchi (${id}) ning localPassword yangilandi!`);
  } catch (error) {
    console.error("Xatolik:", error);
  }
};

const getLocalPassword = async (id: string) => {
  try {
    const user = await getUserById(id);
    return user ? user.localPassword : null;
  } catch (error) {
    console.error("Xatolik:", error);
    return null;
  }
};

const AsyncStorageUserFunctions = {
  saveUser,
  getUsers,
  getUserById,
  deleteUserById,
  updateLocalPassword,
  getLocalPassword,
};

export default AsyncStorageUserFunctions;
