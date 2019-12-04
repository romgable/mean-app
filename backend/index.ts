import { initServer } from './app';
import { initMongoDB } from './db';

console.info("Starting up server...");

initMongoDB((err) => {
    if (err) {
        console.error('Failed to connect to MongoDB: ', err);
        process.exit(1);
    }

    initServer();
});
