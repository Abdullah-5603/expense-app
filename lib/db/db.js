import { MongoClient, ServerApiVersion } from "mongodb";

const uri = `mongodb+srv://expense:FZ1IldmEG4gDh6Gd@cluster0.jjaqgwq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: false,
        deprecationErrors: true,
    }
});

export const connectDB = async () => {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("You successfully connected to MongoDB!");
        return client.db("expense")
    } catch (err) {
        console.log('Error: ' + err.message);
    }
}
