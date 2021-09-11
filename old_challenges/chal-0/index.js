const { createTag } = require("./operations/create-tag");
const { deleteTag } = require("./operations/delete-tag");
const { getTag } = require("./operations/get-tag");
const { patchTag } = require("./operations/patch-tag");

const main = async () => {
    // Make post request to create tag called linux
    const createTagData = await createTag("linux", "This is My Linux's tag");
    console.log(createTagData);

    // Make get request to return linux tag that is just created
    const getTagData = await getTag("linux", createTagData.token);
    console.log(getTagData);

    // Make patch request to update the previously created linux tag
    const patchTagData = await patchTag(
        "linux",
        createTagData.token,
        "My tag is just updated"
    );
    console.log(patchTagData);

    // Make delete request to remove tag
    await deleteTag("linux", createTagData.token);
};

main();
