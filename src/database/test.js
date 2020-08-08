const Database = require('./db')
const createProffy = require('./createProffy')
Database.then(async (db) => {
    proffyValue = {
        name: "Cauê",
        avatar: "https://avatars2.githubusercontent.com/u/11269749?s=460&v=4",
        whatsapp: "11999998888",
        bio: "Professor de Quimica"
    }
    classValue = {
        subject: 1,
        cost: "20"
    }
    classScheduleValues = [
        {
            weekday: 0,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 2,
            time_from: 520,
            time_to: 1620
        }
    ]

    /* criar dados */
   /* await  createProffy(db, {proffyValue, classValue, classScheduleValues}) */

   /* consultar dados proffys */
   const selectedProffys = await db.all("SELECT * FROM proffys")
   /* console.log(selectedProffys) */

   /* consultar classe de professor x e trazer seus dados juntos */
   const selectClassAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
   `)
   /* console.log(selectClassAndProffys) */

   /*
   horario que a pessoa trabalha 8 - 18 
   o horario do time_from (8) precisa ser menor ou igual ao horario solicitado
   o time_to precisa ser acima
   */

   const selectClassesSchedule = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = 1
        AND class_schedule.weekday = 0
        AND class_schedule.time_from <= 1300
        AND class_schedule.time_to > "1300"
   `)

   console.log(selectClassesSchedule)


})