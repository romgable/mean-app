import {ObjectId} from 'mongodb';

export interface Data {
    _id?: ObjectId;
    __v?: number;
    message?: string;
    date?: string;
}
