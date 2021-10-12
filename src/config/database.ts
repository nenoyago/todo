import mongoose from 'mongoose';

const database = process.env.DATABASE;
const databaseURL = process.env.DATABASE_URL;
const databasePort = process.env.DATABASE_PORT;
const databaseName = process.env.DATABASE_NAME;

const url = `${database}://${databaseURL}/${databasePort}/${databaseName}`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

export default mongoose;