import 'dotenv/config'
import express from 'express'
import { Sequelize, DataTypes } from 'sequelize';

let app = express();
const port = parseInt(process.env.PORT as string);
const database = process.env.DATABASE as string;
const username = process.env.USERNAME as string;
const password = process.env.PASSWORD as string;
const server = process.env.SERVER as string;

const sequelize = new Sequelize('neondb', 'Niirok', 'ChtL1kmVDf7G', {
host: 'ep-sweet-lake-23223658.eu-central-1.aws.neon.tech',
dialect: 'postgres',
dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    },
    dialectModule: require('pg'),
});


async function connexionTest() {
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connexionTest();

const Todo = sequelize.define('Todo', {
    nomTache: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN
    }
})

app.get('/', function (_, res) {
    res.send(200)
}) 

app.post('/todo/:value', async (req, res) => {
    let taskValue: string = req.params.value;
    await Todo.create({nomTache: `${taskValue}`, status: false})
    res.send(taskValue)
})

app.put('/true/:task', async (req, res) => {
    let taskStatus: string = req.params.task;
    await Todo.update({status: true}, {
        where: {
            nomTache: taskStatus,
        }
    })
    res.send("updated")
})

app.put('/false/:task', async (req, res) => {
    let taskStatus: string = req.params.task;
    await Todo.update({status: false}, {
        where: {
            nomTache: taskStatus,
        }
    })
    res.send("updated")
})

app.delete('/delete/:task', async (req, res) => {
    let task: string = req.params.task;
    await Todo.destroy({
        where: {
            nomTache: task,
        }
    })
    res.send("deleted")
});

app.get('/getall', async (_, res) => {
    const allTasks = await Todo.findAll();
    res.send(allTasks)
})

app.delete('/removeall', async (_, res) => {
    const todos = await Todo.findAll()
    for (let index = 0; index < todos.length; index++) {
        const element = todos[index];
        await element.destroy()
    res.send("all tasks deleted")}
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
