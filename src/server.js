const proffys = [
    {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "11999999999",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost: "20",
        weekday: [0],
        time_from: [720],
        time_to: [1220]
    },
    {
        name: "Teste",
        avatar: "https://avatars2.githubusercontent.com/u/11269749?s=460&v=4",
        whatsapp: "11999999999",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost: "20",
        weekday: [1],
        time_from: [320],
        time_to: [220]
    }
]
const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
]
const weekdays = [
    "Domingo",
    "Segunda - feira",
    "Terça - feira",
    "Quarta - feira",
    "Quinta - feira",
    "Sexta - feira",
    "Sábado"
]


const express = require('express')
const nunjucks = require('nunjucks')
const server = express()

nunjucks.configure("src/views", {
    express: server,
    noCache: true,
})

function home(req, res) {
    return res.render("index.html")
}
function study(req, res) {
    const filters = req.query
    return res.render("study.html", { proffys, filters, subjects, weekdays })
}
function giveClasses(req, res) {
    const data = req.query
    const isNotEmpty = Object.keys(data).length > 0
    if (isNotEmpty){
        data.subject = getSubject(data.subject)
        proffys.push(data)
        return res.redirect("/study")
    }
    return res.render("give-classes.html", {subjects, weekdays})
}
function getSubject(subjectNumber){
    const position = +subjectNumber - 1 
    return subjects[position]
}

server
    .use(express.static("public"))
    .get("/", home)
    .get("/study", study)
    .get("/give-classes", giveClasses)
    .listen(5500)