import * as express from 'express';
import * as bodyParser from 'body-parser';
import 'moment-timezone';
import {Data} from './data/data.model';
import {createData, deleteData, getAllData, getOneData, updateData} from "./data/data.db";
import moment = require('moment');

const PORT = process.env.PORT || 4000;
const app = express();
app.use(bodyParser.json());

export function initServer(callback?: () => any) {
    app.get('/api/data', (req, res) => {
        getAllData((err, result) => {
            if (err) {
                console.error(err);
                res.status(500);
                res.end();
            } else {
                res.json(result);
            }
        });
    });

    app.get('/api/data/:id', (req, res) => {
        const id = req.params.id;
        getOneData(id, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500);
                res.end();
            } else {
                res.json(result);
            }
        });
    });

    app.post('/api/data', (req, res) => {
        const item = req.body as Data;
        item.date = moment()
            .tz('Europe/Vienna')
            .format();
        createData(item, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500);
                res.end();
            } else {
                res.json(result);
            }
        });
    });

    app.put('/api/data/:id', (req, res) => {
        const id = req.params.id;
        const item = req.body as Data;
        updateData(id, item, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500);
                res.end();
            } else {
                res.json(result);
            }
        });
    });

    app.delete('/api/data/:id', (req, res) => {
        const id = req.params.id;
        deleteData(id, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500);
                res.end();
            } else {
                res.json(result);
            }
        });
    });

    app.listen(PORT, () => {
        console.info(`Server started on port ${PORT}`);
        callback && callback();
    });
}
