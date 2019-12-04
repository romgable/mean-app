import {Collection, MongoClient} from 'mongodb';
import {Data} from './data/data.model';

export let mongoClient: MongoClient;

export let dataCollection: Collection<Data>;

export function initMongoDB(
    callback?: (error: any, items?: Collection<Data>) => any
) {
    const mongodbHost = process.env.MONGODB_HOST || 'localhost';
    const mongodbPort = process.env.MONGODB_PORT || 27017;
    const mongodbDatabase = process.env.MONGODB_DB || 'myapp';
    const mongodbURL =
        process.env.MONGODB_URL ||
        `mongodb://${mongodbHost}:${mongodbPort}/${mongodbDatabase}`;

    console.debug('Connecting to MongoDB with URL', mongodbURL);

    let tries = 0;

    let connectToMongoDB = (cb: (error: any, client: MongoClient) => any) => {
        MongoClient.connect(
            mongodbURL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                socketTimeoutMS: 0,
                connectTimeoutMS: 0
            },
            (err, client) => {
                if (err) {
                    if (tries < 30) {
                        console.debug(
                            'Initial connection to mongodb failed, retrying',
                            err
                        );
                        setTimeout(() => connectToMongoDB(cb), 5000);
                        return;
                    } else {
                        cb(err, undefined);
                        return;
                    }
                }
                cb(undefined, client);
            }
        );
    };

    connectToMongoDB((error, result) => {
        if (error) {
            callback && callback(error, undefined);
            return;
        }

        console.debug('Connected to DB');

        mongoClient = result;
        dataCollection = mongoClient.db().collection('myapp');
        callback && callback(undefined, dataCollection);
    });
}
