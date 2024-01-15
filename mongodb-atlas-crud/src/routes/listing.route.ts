import { Router } from 'express';
import {
  createListing, createMultipleListings,
  getAllListings, getListingByName,
  deleteListing, deleteListingsScrapedBeforeDate,
  updateListing, updateAllListing
} from '../controllers/listing.controller';

const listingRoute = () => {
  const router = Router();

  router.post('/listing', createListing);

  router.post('/listings', createMultipleListings);

  router.get('/listings', getAllListings);

  router.get('/listing/:name', getListingByName);

  router.put('/listing/:name', updateListing);

  router.put('/listing/', updateAllListing);

  router.delete('/listing/:name', deleteListing);

  router.delete('/listing', deleteListingsScrapedBeforeDate);

  return router;
};

export { listingRoute };
