import mongoose, { Schema, Model, Document } from 'mongoose';

type ListingDocument = Document & {
    name: string,
    summary: string | null,
    bedrooms: number,
    bathrooms: number,
    beds?: number,
    last_review?: Date
    property_type?: string
};


type ListingInput = {
    name: ListingDocument['name'],
    summary: ListingDocument['summary'],
    bedrooms: ListingDocument['bedrooms'],
    bathrooms: ListingDocument['bathrooms'],
    beds?: ListingDocument['beds'],
    last_review?: ListingDocument['last_review'],
    property_type?: ListingDocument['property_type']
};

const listingSchema = new Schema(
    {
        name: {
            type: Schema.Types.String,
            required: true,
            unique: true
        },
        summary: {
            type: Schema.Types.String,
            default: null
        },
    },
    {
        collection: 'listings',
        timestamps: true
    }
)

const Listing: Model<ListingDocument> = mongoose.model<ListingDocument>('Listing', listingSchema);

export { Listing, ListingInput, ListingDocument };
