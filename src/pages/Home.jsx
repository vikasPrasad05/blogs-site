import React, { useState } from 'react'
import { useEffect } from 'react';
import {collection , query , orderBy , limit , getDocs , where} from "firebase/firestore"
import {db} from "../firebase";
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import ListingItem from '../components/ListingItem';


function Home() {
const [listings , setListings] = useState(null);
const [loading , setLoading] = useState(true)

   //Offers
   const [offerListings , setOfferListings] = useState(null);

   useEffect(() => {
     async function fetchListings(){
      try{
       const listingsRef = collection(db , "listings");
       const q = query(listingsRef , orderBy("timestamp" , "desc"), limit(10));
       const querySnap = await getDocs(q);
       let listings = [];
       querySnap.forEach((doc) => {
         return listings.push({
           id: doc.id,
           data: doc.data(),
         });
       });
       setOfferListings(listings);
       setLoading(false);
       console.log(listings)
      }catch(error){
       console.log(error)
      }
     }
     fetchListings();
   } , [])
   
  //Places for rent
  const [rentListings , setRentListings] = useState(null);

  useEffect(() => {
    async function fetchListings(){
     try{
      const listingsRef = collection(db , "listings");
      const q = query(listingsRef , orderBy("timestamp" , "desc"), limit(10));
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setRentListings(listings);
      setLoading(false);
      console.log(listings)
     }catch(error){
      console.log(error)
     }
    }
    fetchListings();
  } , []) 

  //Offers
  const [sellListings , setSellListings] = useState(null);

  useEffect(() => {
    async function fetchListings(){
     try{
      // get Reference 
      const listingsRef = collection(db , "listings");
      const q = query(listingsRef , orderBy("timestamp" , "desc"), limit(10));
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setSellListings(listings);
      setLoading(false);
      console.log(listings)
     }catch(error){
      console.log(error)
     }
    }
    fetchListings();
  } , [])

  if(loading) {
    return <Spinner />
  }

  

  return (

    
    <div>
      <div className='max-w-6xl mx-auto pt-4 space-y-6  '>

      <button
            type="submit"
            className="w-full bg-gray-700 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-black transition duration-150 ease-in-out hover:shadow-lg active:bg-black"
          >
            <Link
              to="/create-listing"
              className="flex justify-center items-center"
            >
              
              create your Blogs
            </Link>
        </button>
      
        {sellListings && sellListings.length > 0 && (
          <div className='m-2 mb-6'>
            <h2 className='px-3 font-semibold items-center justify-center flex mt-7 mb-10 text-4xl'> Aur blogs</h2>
            
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {sellListings.map((listing)=>(
                <ListingItem key={listing.id} listing={listing.data} id={listing.id}/>
              ))}
            </ul>
          </div>
        )}
        {/* {offerListings && offerListings.length > 0 && (
          <div className='m-2 mb-6'>
            
            
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {offerListings.map((listing)=>(
                <ListingItem key={listing.id} listing={listing.data} id={listing.id}/>
              ))}
            </ul>
          </div>
        )}

      {rentListings && rentListings.length > 0 && (
          <div className='m-2 mb-6'>
            
            
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {rentListings.map((listing)=>(
                <ListingItem key={listing.id} listing={listing.data} id={listing.id}/>
              ))}
            </ul>
          </div>
        )} */}
      </div>
    </div>
  )
}
export default Home