const axios = require("axios");
const createTag = async (tagName, tagContent) => {
    const { data } = await axios.post(
        `https://us-central1-acm-core.cloudfunctions.net/challenge/tags/${tagName}`,
        {
            name: tagName,
            contents: tagContent,
        },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return data;
};

module.exports = {
    createTag,
};
