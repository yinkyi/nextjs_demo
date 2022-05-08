import { MongoClient } from "mongodb";

async function connectDatabase(){
    const client =  await MongoClient.connect(
        "mongodb+srv://root:lc0u5j07y5VjLzOH@cluster0.vm1cs.mongodb.net/meetups?retryWrites=true&w=majority");
    console.log("hyyyy");
    // const db = client.db();
    return client;
}

export default connectDatabase;