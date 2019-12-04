import {dataCollection} from '../db';
import {Data} from './data.model';
import {ObjectId} from 'mongodb';

export function getAllData(
    callback: (error: any, result: Data[]) => any
) {
    dataCollection.find().toArray((err, value: Data[]) => {
        if (err) {
            callback(err, []);
        } else {
            callback(undefined, value);
        }
    });
}

export function getOneData(
    id: any,
    callback: (error: any, result: Data) => any
) {
    dataCollection.findOne(new ObjectId(id), (err, value) => {
        if (err) {
            callback(err, undefined);
        } else {
            callback(undefined, value);
        }
    });
}

export function createData(
    item: Data,
    callback: (error: any, result: any) => any
) {
    dataCollection
        .insertOne(item)
        .then(item => {
            const res = {
                message: 'Create Success'
            };
            callback(undefined, res);
        })
        .catch(err => {
            callback(err, {});
        });
}

export function updateData(
    id: string,
    item: Data,
    callback: (error: any, result: any) => any
) {
    dataCollection
        .findOneAndUpdate({_id: new ObjectId(id)}, {$set: {...item}})
        .then(item => {
            const res = {
                message: 'Update Success'
            };
            callback(undefined, res);
        })
        .catch(err => {
            callback(err, {});
        });
}

export function deleteData(
    id: string,
    callback: (error: any, result: any) => any
) {
    dataCollection
        .findOneAndDelete({_id: new ObjectId(id)})
        .then(item => {
            const res = {
                message: 'Delete Success'
            };
            callback(undefined, res);
        })
        .catch(err => {
            callback(err, {});
        });
}
