import {MongoClient, MongoClientOptions} from 'mongodb';
import { Collection, Document } from 'mongodb';

async function connectToMongoDB(url: string, options?: MongoClientOptions) {
    const client = await MongoClient.connect(url, options);
    return client;
}

async function queryDocuments(collection: Collection<Document>, query: object): Promise<Document[]> {
  const cursor = collection.find(query);
  const documents = await cursor.toArray();
  return documents;
}

async function insertDocument(collection: Collection<Document>, document: Document): Promise<void> {
    await collection.insertOne(document);
}

async function insertDocuments(collection: Collection<Document>, documents: Document[]): Promise<void> {
    await collection.insertMany(documents);
}

async function updateDocument(collection: Collection<Document>, query: object, document: Document): Promise<void> {
    await collection.updateOne(query, document);
}

async function updateDocuments(collection: Collection<Document>, query: object, document: Document): Promise<void> {
    await collection.updateMany(query, document);
}

async function deleteDocument(collection: Collection<Document>, query: object): Promise<void> {
    await collection.deleteOne(query);
}

async function deleteDocuments(collection: Collection<Document>, query: object): Promise<void> {
    await collection.deleteMany(query);
}

async function countDocuments(collection: Collection<Document>, query: object): Promise<number> {
    const count = await collection.countDocuments(query);
    return count;
}

async function createCollection(client: MongoClient, collectionName: string): Promise<Collection<Document>> {
    const collection = await client.db().createCollection(collectionName);
    return collection;
}

async function dropCollection(client: MongoClient, collectionName: string): Promise<void> {
    await client.db().dropCollection(collectionName);
}

async function listCollections(client: MongoClient): Promise<string[]> {
    const collections = await client.db().listCollections().toArray();
    return collections.map(collection => collection.name);
}

async function listDatabases(client: MongoClient): Promise<string[]> {
    const databases = await client.db().admin().listDatabases();
    return databases.databases.map(database => database.name);
}


export default {
    connectToMongoDB,
    queryDocuments,
    insertDocument,
    insertDocuments,
    updateDocument,
    updateDocuments,
    deleteDocument,
    deleteDocuments,
    countDocuments,
    createCollection,
    dropCollection,
    listCollections,
    listDatabases
}