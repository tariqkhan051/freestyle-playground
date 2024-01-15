import dotenv from 'dotenv';

import { createListing, createMultipleListings } from './data/create';
import { findOneListingByName, findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews } from './data/get';
import { updateListingByName, upsertListingByName, updateAllListingsToHavePropertyType } from './data/update';
import { deleteListingByName, deleteListingsScrapedBeforeDate } from './data/delete';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { ListingInput } from './models/listing.model';

dotenv.config();

const { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } = process.env;

// const connectToDatabase = async (): Promise<void> => {
//     const options: ConnectOptions = { 
//         autoIndex: true
//     };

//     await mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, options);
// };

const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // Send a ping to confirm a successful connection
        //await client.db("admin").command({ ping: 1 });
        //console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // Sample Database
        const database = client.db('sample_mflix');

        // Get Sample Collection
        const movies = database.collection('movies');
        
        // Query for a movie that has the title 'Back to the Future'
        const query = { title: 'Back to the Future' };
        
        // Execute Query
        const movie = await movies.findOne(query);
        
        console.log(movie);
    } finally {
        // Ensures that the client will close when you finish/error
        console.log("Closing connection..");
        await client.close();
    }
}

//run().catch(console.dir);

// create single listing
async function create(newListing: ListingInput): Promise<boolean> {
    try {
        await client.connect();
        await createListing(client, newListing);
    } catch (exception) {
        console.log(exception);
        return false;
    } finally {
        console.log("Closing connection..");
        await client.close();
    }

    return true;
}


// create multiple listings
async function createMultiple(newListings: ListingInput[]): Promise<boolean> {
    try {
        await client.connect();
        await createMultipleListings(client, newListings);
    } catch (exception) {
        console.log(exception);
        return false;
    } finally {
        console.log("Closing connection..");
        await client.close();
    }

    return true;
}

//get listing by name
async function getByName(name): Promise<string | undefined> {
    try {
        await client.connect();
        return await findOneListingByName(client, name);
    } catch (exception) {
        console.log(exception);
    } finally {
        console.log("Closing connection..");
        await client.close();
    }

    return undefined;
}

//get multiple listings
async function getAll(filter): Promise<any> {
    try {
        await client.connect();
        return await findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
            minimumNumberOfBedrooms: filter.minimumNumberOfBedrooms,
            minimumNumberOfBathrooms: filter.minimumNumberOfBathrooms,
            maximumNumberOfResults: filter.maximumNumberOfResults
        });
    } catch (exception) {
        console.log(exception);
    } finally {
        console.log("Closing connection..");
        await client.close();
    }

    return undefined;
}

// update listing by name
async function updateByName(name, listing): Promise<boolean> {
    try {
        await client.connect();
        await updateListingByName(client, name, listing);
    } catch (exception) {
        console.log(exception);
        return false;
    } finally {
        console.log("Closing connection..");
        await client.close();
    }

    return true;
}

// update listing by name
async function updateAllToHavePropertyValue(value): Promise<any> {
    try {
        await client.connect();
        await updateAllListingsToHavePropertyType(client, value);
    } catch (exception) {
        console.log(exception);
        return false;
    } finally {
        console.log("Closing connection..");
        await client.close();
    }

    return true;
}

// upsert by name
async function upsertByName(name, listing): Promise<any> {
    try {
        await client.connect();
        return await upsertListingByName(client, name, listing);
    } catch (exception) {
        console.log(exception);
    } finally {
        console.log("Closing connection..");
        await client.close();
    }

    return undefined;
}

//delete by name
async function deleteByName(name): Promise<any> {
    try {
        await client.connect();
        await deleteListingByName(client, name);
    } catch (exception) {
        console.log(exception);
        return false;
    } finally {
        console.log("Closing connection..");
        await client.close();
    }

    return true;
}

//delete by name
async function deleteAllBeforeDate(date): Promise<any> {
    try {
        await client.connect();
        await deleteListingsScrapedBeforeDate(client, date);
    } catch (exception) {
        console.log(exception);
        return false;
    } finally {
        console.log("Closing connection..");
        await client.close();
    }

    return true;
}

export {
    run,
    create, createMultiple,
    getByName, getAll,
    updateByName, upsertByName, updateAllToHavePropertyValue,
    deleteByName, deleteAllBeforeDate
};