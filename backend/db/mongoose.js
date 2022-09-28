const mongoose = require("mongoose");

mongoose.connect(
    process.env.MONGOURI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err) {
        if (err) console.log(err);
        else console.log("MongoDB Connected");
    }
)