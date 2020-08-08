const express = require('express')
const server = express()
const nunjucks = require('nunjucks')
const {home, study, giveClasses, saveClasses} = require('./pages')
nunjucks.configure("src/views", {
    express: server,
    noCache: true,
})
server
.use(express.urlencoded({ extended: true }))
.use(express.static("public"))
.get("/", home)
.get("/study", study)
.get("/give-classes", giveClasses)
.post("/save-classes", saveClasses)
.listen(5500)