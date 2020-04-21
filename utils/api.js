const axios =require("axios");

const api = {
  getUser(username) {
    const queryUrl = `https://api.github.com/users/${username}`;

    axios
    .get(queryUrl)
    .then(function(res) {
      picture = res.avatar_url;
      email = res.email;
    })
  }
};

module.exports = api.getUser;