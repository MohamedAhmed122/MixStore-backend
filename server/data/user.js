import bcrypt from "bcryptjs";

const users = [
  {
    name: "Mohamed Youssef",
    email: "Admin@SuperAdmin.com",
    password: bcrypt.hashSync("12345"),
    isAdmin: true,
  },
  {
    name: "Ahmed Mostafa",
    email: "ahmed@ahmed.com",
    password: bcrypt.hashSync("54321"),
  },
  {
    name: "John Doe",
    email: "john@john.com",
    password: bcrypt.hashSync("112233"),
  },
];

export default users;
