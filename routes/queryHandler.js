const express = require("express");

module.exports = function (data) {
    const router = express.Router();

    router.get("/", (req, res) => {
        const { level: rawLevel, type } = req.query;

        console.log(req.query);
        const level = rawLevel ? Number(rawLevel) : undefined;
        const isQueryEmpty = Object.keys(req.query).length > 0;
        let response = data;

        if (!isQueryEmpty) {
            return res.status(400).json({
                error: "You should provide at least one query parameter 'level' or 'type'",
            });
        }

        if (level !== undefined) {
            if (isNaN(level) || level < 1 || level > 43) {
                return res.status(400).json({
                    error: "The parameter level should be a number between 1 and 43",
                });
            }
            response = response.filter((item) => item.level == level);
        }

        if (type) {
            response = response.filter((item) => item.type.includes(type));
        }

        res.set("Content-Type", "application/json");
        res.send({ total: response.length, results: response });
    });
    return router;
};
