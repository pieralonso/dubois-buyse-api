const express = require("express");
const app = express();
const port = 3000;
const createEchellonRouter = require("./routes/queryHandler");
const data = require("./dubois.json");
const { apiKeyAuth } = require("./midleware/apikeyAuth");
const { rateLimit } = require("express-rate-limit");

const echellonRouter = createEchellonRouter(data);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: {
        error: "You have exceeded the rate limit please try again in 15 minutes",
    },
    standardHeaders: "draft-8",
    legacyHeaders: false,
});

app.use(limiter);
app.use(apiKeyAuth);
app.use("/api", echellonRouter);

app.set("json spaces", 2);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
