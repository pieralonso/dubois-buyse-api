const express = require("express");

module.exports = function (data) {
    const router = express.Router();

    router.get("/", (req, res) => {
        const { echelon: rawEchelon, type } = req.query;

        console.log(req.query);
        const echelon = rawEchelon ? Number(rawEchelon) : undefined;
        const isQueryEmpty = Object.keys(req.query).length > 0;
        let response = data;

        if (!isQueryEmpty) {
            return res.status(400).json({
                error: "You should provide at least one query parameter 'echelon' or 'type'",
            });
        }

        if (echelon !== undefined) {
            if (isNaN(echelon) || echelon < 1 || echelon > 43) {
                return res.status(400).json({
                    error: "The parameter echelon should be a number between 1 and 43",
                });
            }
            response = response.filter((item) => item.echelon == echelon);
        }

        if (type) {
            response = response.filter((item) => item.tipe.includes(type));
        }

        res.set("Content-Type", "application/json");
        res.send({ total: response.length, results: response });
    });
    return router;
};
