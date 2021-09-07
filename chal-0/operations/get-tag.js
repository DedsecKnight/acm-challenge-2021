const axios = require("axios");

const getTag = async (tagName, token) => {
    const { data } = await axios.get(
        `https://us-central1-acm-core.cloudfunctions.net/challenge/tags/${tagName}/${token}`
    );
    return data;
};

module.exports = { getTag };
