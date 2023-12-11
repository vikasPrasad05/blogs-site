import { doc } from 'firebase/firestore';
import { db } from '../firebase';
import { getDoc } from 'firebase/firestore';
import React from 'react'
import { useParams } from 'react-router-dom';
import { useState , useEffect } from 'react';
import Spinner from '../components/Spinner';

import { getAuth } from 'firebase/auth';



 function Listing() {

    //getting user info
    const auth = getAuth();

    const params = useParams();
    const [listing , setListing] = useState(true);
    const [loading , setLoading] = useState(true);
    
    useEffect(()=>{
        async function fetchListing(){
            const docRef = doc(db , "listings" , params.listingId);
            const docSnap  = await getDoc(docRef)
            if(docSnap.exists()){
                setListing(docSnap.data())
                setLoading(false);
                console.log(listing)
            }
        }
        fetchListing();
        
    },[params.listingId])

    if(loading){
        return <Spinner/>
    }

    console.log(listing);
    
  return (
    <main className=''>
        <div className='flex flex-col md:flex-row max-w-6xl lg:mx-auto m-4 p-8 rounded-lg border-3 shadow-lg bg-white'>
            
            <div className=' w-full  ' >
                
                <h2 className='text-xl font-semibold text-gray-700 mt-8'>Blog title - <span className='opacity-90 text-red-700'>{listing.blogs}</span></h2>

                <p className="mt-4 "><span className='opacity-70 '>{listing.address}</span></p>

                <div className='img-board mt-8'>
                    <img src={listing.imgUrls[0]} alt="" className='adsImages' />
                    <img src={listing.imgUrls[1]} alt="" className='adsImages'/>
                    <img src={listing.imgUrls[2]} alt="" className='adsImages'/>
                    <img src={listing.imgUrls[3]} alt="" className='adsImages'/>
                    <img src={listing.imgUrls[4]} alt="" className='adsImages'/>
                    <img src={listing.imgUrls[5]} alt="" className='adsImages'/>
                
               
                    
                </div>
                
            </div>
        </div>
       
    </main>
  )
}

export default Listing