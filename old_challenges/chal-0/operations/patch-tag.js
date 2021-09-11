const axios = require("axios");
const patchTag = async (tagName, token, newContent) => {
    const { data } = await axios.patch(
        `https://us-central1-acm-core.cloudfunctions.net/challenge/tags/${tagName}/${token}`,
        {
            contents: newContent,
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
    patchTag,
};
