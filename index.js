const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const createQueryRouter = require("./routes/queryHandler");
const data = require("./dubois.json");
const { apiKeyAuth } = require("./midleware/apikeyAuth");
const { rateLimit } = require("express-rate-limit");

const queryRouter = createQueryRouter(data);

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
app.use(cors());
app.use(apiKeyAuth);
app.use("/api", queryRouter);

app.set("json spaces", 2);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
