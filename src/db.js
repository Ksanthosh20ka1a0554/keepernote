const { MongoClient } = require("mongodb");

async function run() {
  const uri = "mongodb+srv://santhosh9515:santhosh9515@cluster0.itdx0o5.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    console.log("Connected successfully");

    const database = client.db("KeeperNote"); // Replace "your_database_name" with your actual database name
    const collection = database.collection("Keeper_Note_notes"); // Replace "your_collection_name" with your actual collection name

    // Find all documents in the collection
    const documents = await collection.find().toArray();
    return documents;
    
  } finally {
    // Close the client connection
    await client.close();
  }
}


export default run;