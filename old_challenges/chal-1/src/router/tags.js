const express = require("express");
const { body } = require("express-validator");
const { validateRequest } = require("../validation/validate-request");
const { Tag } = require("../models/tag");
const { NotFoundError } = require("../errors/not-found");
const { uuid } = require("uuidv4");

const router = express.Router();

router.get("/:name/:token", async (req, res, next) => {
    const { name, token } = req.params;
    const tagObj = await Tag.findOne({
        name,
        token,
    }).catch((err) => {
        return next(err);
    });
    if (!tagObj) {
        return next(
            new NotFoundError("Tag with given name and token does not exist")
        );
    }
    res.send(tagObj);
});

router.post(
    "/",
    [
        body("name").not().isEmpty().withMessage("Tag name is required"),
        body("contents").not().isEmpty().withMessage("Tag content is required"),
    ],
    validateRequest,
    async (req, res, next) => {
        const { name, contents } = req.body;
        const newTag = new Tag({
            name,
            contents,
            token: uuid(),
        });
        await newTag.save().catch((err) => {
            return next(err);
        });
        res.send(newTag);
    }
);

router.patch(
    "/:name/:token",
    [body("contents").not().isEmpty().withMessage("Content is required")],
    validateRequest,
    async (req, res, next) => {
        const { name, token } = req.params;
        const { contents } = req.body;
        const tagObj = await Tag.findOne({
            name,
            token,
        }).catch((err) => {
            return next(err);
        });
        if (!tagObj) {
            return next(
                new NotFoundError(
                    "Tag with given name and token does not exist"
                )
            );
        }
        tagObj.contents = contents;
        await tagObj.save().catch((err) => {
            return next(err);
        });
        res.send(tagObj);
    }
);

router.delete("/:name/:token", async (req, res, next) => {
    const { name, token } = req.params;
    const tagObj = await Tag.findOne({
        name,
        token,
    });
    await Tag.deleteOne({
        _id: tagObj._id,
    }).catch((err) => {
        return next(err);
    });
    res.end();
});

module.exports = router;
