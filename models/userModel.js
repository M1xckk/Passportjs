const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "user",
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "user",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "user",
  },
  {
    id: 4,
    name: "Brian Xu💻",
    email: "brianxu@gmail.com",
    password: "brian123!",
    role: "admin",
  },
];

const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    return user || null;
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    return user || null;
  },
  create: (user) => {
    user.id = database.length + 1;
    database.push(user);
    return user;
  },
};

module.exports = { database, userModel };