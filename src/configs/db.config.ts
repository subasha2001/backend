import mongoose, {connect, ConnectOptions} from 'mongoose'

export const dbConnect = ()=>{
    connect(process.env.MONGO_URI!, { } as ConnectOptions).then(
        ()=>console.log('Connected successfully to mongodb'),
        (error) =>console.log(error) 
    ) 
}


//
// const uri = "mongodb://localhost:27017/testdb";
// // Connect to the database
// mongoose
//   .connect(uri)
//   .then(() => {
//     console.log("Successfully connected to MongoDB");
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error.message);
//   });