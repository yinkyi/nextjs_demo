// /api/new-meetup
//POST REQUEST
import connectDatabase from '../../utils/mongo';
async function handler(req,res){
    const client = await connectDatabase();
    console.log(req.body);
    if (req.method === 'POST') {
        const data = req.body;
        // const client =  await MongoClient.connect(
        //     "mongodb+srv://root:lc0u5j07y5VjLzOH@cluster0.vm1cs.mongodb.net/meetups?retryWrites=true&w=majority");
        // console.log(client);
        const db = client.db();
        const meetupsCollection = db.collection('meetups');
        const result = await meetupsCollection.insertOne(data);
        console.log(result);
        client.close();
        res.status(201).json({ message: 'Meetup inserted!' });
    }

}
export default handler;