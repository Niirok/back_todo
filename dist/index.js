"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("sequelize");
let app = (0, express_1.default)();
const port = parseInt(process.env.PORT);
const database = process.env.DATABASE;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const server = process.env.SERVER;
const sequelize = new sequelize_1.Sequelize('neondb', 'Niirok', 'ChtL1kmVDf7G', {
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
function connexionTest() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize.authenticate();
            console.log('Connection has been established successfully.');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    });
}
connexionTest();
const Todo = sequelize.define('Todo', {
    nomTache: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
});
app.get('/', function (_, res) {
    res.send(200);
});
app.post('/todo/:value', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let taskValue = req.params.value;
    yield Todo.create({ nomTache: `${taskValue}`, status: false });
    res.send(taskValue);
}));
app.put('/true/:task', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let taskStatus = req.params.task;
    yield Todo.update({ status: true }, {
        where: {
            nomTache: taskStatus,
        }
    });
    res.send("updated");
}));
app.put('/false/:task', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let taskStatus = req.params.task;
    yield Todo.update({ status: false }, {
        where: {
            nomTache: taskStatus,
        }
    });
    res.send("updated");
}));
app.delete('/delete/:task', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let task = req.params.task;
    yield Todo.destroy({
        where: {
            nomTache: task,
        }
    });
    res.send("deleted");
}));
app.get('/getall', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allTasks = yield Todo.findAll();
    res.send(allTasks);
}));
app.delete('/removeall', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield Todo.findAll();
    for (let index = 0; index < todos.length; index++) {
        const element = todos[index];
        yield element.destroy();
        res.send("all tasks deleted");
    }
}));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map