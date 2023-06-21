let tryToLogedIn = "";
global.count = 1;

const whoTryToLogin = (email) => {
  console.log("tryToLogedIn", tryToLogedIn);
  if (email === tryToLogedIn) {
    console.log("count", global.count);
    global.count = global.count + 1;
    console.log("count", global.count);
  } else {
    tryToLogedIn = email;
    global.count = 1;
  }
  console.log("tryToLogedIn", tryToLogedIn);
  return global.count;
};

const blockedUsers = {};

const blockUser = (email, blockDuration) => {
  blockedUsers[email] = Date.now() + blockDuration;
  return blockedUsers[email];
};

const isUserBlocked = (email) => {
  if (blockedUsers[email]) {
    const blockExpiration = blockedUsers[email];
    const currentTime = Date.now();
    return blockExpiration > currentTime;
  }
  return false;
};

module.exports = { whoTryToLogin, blockUser, isUserBlocked };
