const express = require("express");

module.exports = function (data) {
    const router = express.Router();

    router.get("/", (req, res) => {
        const { echellon: rawEchellon, type } = req.query;

        console.log(req.query);
        const echellon = rawEchellon ? Number(rawEchellon) : undefined;
        const isQueryEmpty = Object.keys(req.query).length > 0;
        let response = data;

        if (!isQueryEmpty) {
            return res.status(400).json({
                error: "You should provide at least one query parameter  'echellon' or 'type'",
            });
        }

        if (echellon !== undefined) {
            if (isNaN(echellon) || echellon < 1 || echellon > 43) {
                return res.status(400).json({
                    error: "The parameter echellon should be a number between 1 and 43",
                });
            }
            response = response.filter((item) => item.echellon == echellon);
        }

        if (type) {
            response = response.filter((item) => item.tipe.includes(type));
        }

        res.set("Content-Type", "application/json");
        res.send({ total: response.length, results: response });
    });
    return router;
};
