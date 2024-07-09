const userModel = require("../models/userModel").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};

const getUserById = (id) => {
  let user = userModel.findById(id);
  return user || null;
};

const getUserByGithubIdOrCreate = (profile) => {
  let user = userModel.findById(profile.id);
  if (!user) {
    user = userModel.create({
      id: profile.id,
      name: profile.displayName || profile.username,
      email: profile.emails ? profile.emails[0].value : null,
      githubProfile: profile._json.avatar_url,
    });
  }
  return user;
};

function isUserValid(user, password) {
  return user.password === password;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  getUserByGithubIdOrCreate,
};
