//import mongoose from "mongoose";

// const mongodb_URL = "mongodb+srv://haquemashirul_db_user:ChG8ZMMR4I9gzHcQ@cluster0.ocwulv6.mongodb.net/?appName=Cluster0" ;
// export async function connectDB(){
//     if (!mongodb_URL) {
//         throw new Error("MONGOODB_URL environment variable is not set");
//     }
//     mongoose.connect(mongodb_URL)
//     .then(() => {
//         console.log("Database is connected");
//     })
//     .catch(err => {
//         console.log("mongoDB connection error : ", err);
//     });
// }


// const connection = {
//     isConnected : 0
// }

// async function connectDB() {
//     if(connection.isConnected){
//         console.log("BD is already connected!");
//         return;
//     }

//     try {
//         const db = await mongoose.connect(process.env.MONGOODB_URL!)
//         connection.isConnected =  db.connections[0].readyState;
//         console.log('database is connected')
//     } catch (error) {
//         console.log(error)
//     }
// }


// export default connectDB();


import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn){
    console.log("DB already connected")
    return cached.conn;
  } 

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
        console.log("db is connected")
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}


