const axios = require("axios");
const deleteTag = async (tagName, token) => {
    const { data } = await axios.delete(
        `https://us-central1-acm-core.cloudfunctions.net/challenge/tags/${tagName}/${token}`
    );
};

module.exports = {
    deleteTag,
};
