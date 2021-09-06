const express = require("express");
const app = express();

const baseDir = `${__dirname}/build`

app.use(express.static(baseDir))
app.get("*", (request, response) => {
    response.sendFile("index.html", {
        root: baseDir,
    })
})

const port = 4000;
app.listen(port, () => {
    console.log(`listening on port: ${port}`)
})