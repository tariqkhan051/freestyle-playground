import { Request, Response } from 'express';
import { ListingInput } from '../models/listing.model';
import {
    create, createMultiple,
    getByName, getAll,
    updateByName, upsertByName, updateAllToHavePropertyValue,
    deleteByName, deleteAllBeforeDate
} from '../database-connection';

const createListing = async (req: Request, res: Response) => {
    const { name, summary, bedrooms, bathrooms, } = req.body;

    if (!name || !summary) {
        return res.status(422).json({ message: 'The fields name and summary are required' });
    }

    const listingInput: ListingInput = {
        name,
        summary,
        bedrooms,
        bathrooms,
    };

    const result = await create(listingInput);

    return result ?
        res.status(201).json({ data: listingInput }) :
        res.status(500).json({ message: 'Unable to create listing. Please try again later.' });
};

const createMultipleListings = async (req: Request, res: Response) => {
    //const { name, summary, bedrooms, bathrooms, } = req.body;

    //validate and create array
    const listings: Array<ListingInput> = [];

    for (const key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            const { name, summary, bedrooms, bathrooms, beds, last_review, property_type } = req.body[key];
            if (!name) {
                return res.status(422).json({ message: 'The field name is required' });
            }

            const listingInput: ListingInput = {
                name,
                summary,
                bedrooms,
                bathrooms,
                beds,
                last_review,
                property_type
            };

            listings.push(listingInput);
        }
    }

    const result = await createMultiple(listings);

    return result ?
        res.status(201).json({ data: listings }) :
        res.status(500).json({ message: 'Unable to create listings. Please try again later.' });
};

const getAllListings = async (req: Request, res: Response) => {

    const { minimumNumberOfBedrooms, minimumNumberOfBathrooms, maximumNumberOfResults } = req.query;
    const filter = {
        minimumNumberOfBedrooms: +(minimumNumberOfBedrooms || 1),
        minimumNumberOfBathrooms: +(minimumNumberOfBathrooms || 1),
        maximumNumberOfResults: +(maximumNumberOfResults || 1)
    }
    const result = await getAll(filter);

    return result ?
        res.status(200).json({ data: result }) :
        res.status(500).json({ message: 'Unable to find listings. Please try again later.' });
};

const getListingByName = async (req: Request, res: Response) => {
    const { name } = req.params;

    const result = await getByName(name);

    return result ?
        res.status(200).json({ data: result }) :
        res.status(500).json({ message: 'Unable to find listings. Please try again later.' });
};

const updateListing = async (req: Request, res: Response) => {
    const { currentName } = req.params;
    const { name, bedrooms, beds } = req.body;
    const { upsert } = req.query;

    const listing = await getByName(currentName);

    const updatedName = (name ? name : currentName);

    if (!listing) {
        if (!upsert || upsert === "false") {
            return res.status(404).json({ message: `Listing with id "${name}" not found.` });
        }
        const newListing = { updatedName, bedrooms, beds };
        const result = await upsertByName(currentName, newListing);

        return result ?
            res.status(200).json({ message: "Upserted successfully." }) :
            res.status(500).json({ message: "Unable to upsert. Please try again later." });

    }

    const result = await updateByName(currentName, { updatedName, bedrooms, beds });

    return result ?
        res.status(200).json({ message: "Updated successfully." }) :
        res.status(500).json({ message: "Unable to update. Please try again later." });



};

const updateAllListing = async (req: Request, res: Response) => {
    const { property_type } = req.body;

    const result = await updateAllToHavePropertyValue(property_type);

    return result ?
        res.status(200).json({ message: "Updated successfully." }) :
        res.status(500).json({ message: "Unable to updated. Please try again later." });
};

const deleteListing = async (req: Request, res: Response) => {
    const { name } = req.params;

    const result = await deleteByName(name);

    return result ?
        res.status(200).json({ message: "Listing deleted successfully." }) :
        res.status(500).json({ message: 'Unable to delete listing. Please try again later.' });
};

const deleteListingsScrapedBeforeDate = async (req: Request, res: Response) => {
    const { date } = req.body;

    if (!date) {
        return res.status(400).json({ message: 'The field date is required.' });
    }

    const result = await deleteAllBeforeDate(date);

    return result ?
        res.status(200).json({ message: "Listing deleted successfully." }) :
        res.status(500).json({ message: 'Unable to delete listing. Please try again later.' });
};


export {
    createListing, createMultipleListings,
    getAllListings, getListingByName,
    updateListing, updateAllListing,
    deleteListing, deleteListingsScrapedBeforeDate
};