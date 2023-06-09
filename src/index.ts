import express, {Express} from "express";
import dotenv from 'dotenv'
import bodyParser from "body-parser";
import router from "./controller";
import {AuthMiddleware} from "./middleware/auth.middleware";
import {MongoClient} from "mongodb";
import {IBlog} from "./types/blog.interface";
import {IPost} from "./types/post.interface";

dotenv.config()
if (!process.env.PORT) {
  console.log(`Error to get ports`);
  process.exit(1);
}
const PORT: number = parseInt(process.env.PORT);
const app: Express = express();
const mongoURI = process.env.MONGO_URI;
if(!mongoURI){
  throw new Error('MONGO URI IS INVALID')
}

const client = new MongoClient(mongoURI);
const blogDB = client.db('blogs');
const postDB = client.db('posts');

export const blogRepository = blogDB.collection<IBlog>('blogs');
export const postRepository = postDB.collection<IPost>("posts");

app.use(bodyParser.json());
app.post('*', AuthMiddleware);
app.put('*', AuthMiddleware);
app.use('/api', router);

const start = async() => {
  await client.connect();
  app.listen(PORT || 3333, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

start();
