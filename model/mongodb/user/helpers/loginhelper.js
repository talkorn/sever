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

module.exports = whoTryToLogin;
