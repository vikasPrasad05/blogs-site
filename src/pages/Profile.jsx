import {getAuth, updateProfile, } from "firebase/auth";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase";

import ListingItem from "../components/ListingItem";



function Profile() {

  const auth = getAuth();
  const Navigate = useNavigate();
  const [change, setchange] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const {name, email} = formData
  function onLogout(){
      auth.signOut();
      Navigate("/");

  }
  function onChange(e){
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,

    }))
  }


  async function onSubmit(){
    try {
      if(auth.currentUser.displayName !== name){
        //update display name in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        })
        //update name in the firestore

        const docRef = doc(db, "users", auth.currentUser.uid)
        await updateDoc(docRef, {
          name,
        })

      }
      toast.success('Profile details updated')
    } catch (error) {
      toast.error("could not update profile details")
    }
  }
  useEffect(() => {
    async function fetchUserListings() {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchUserListings();
  }, [auth.currentUser.uid]);

  async function onDelete(listingID) {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "listings", listingID));
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingID
      );
      setListings(updatedListings);
      toast.success("Successfully deleted the listing");
    }
  }
  function onEdit(listingID) {
    Navigate(`/edit-listing/${listingID}`);
  }


  return (
   <>
   <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
      <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
      <div className="w-full md:w-[50%] mt-6 px-3 ">
        <form>
          {/* {Name Input } */}

          <input type="text" id="name" value={name} 
          disabled={!change}
          onChange={onChange}
          className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out`}/>


          {/* Email Input  */}

          <input type="email" id="email" value={email} 
          disabled
          className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out $={ change && "bg-red-200 focus:bg-red-200"} `} />

          <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
            <p className="flex item-center ">Do you want to change your name?
              <span 
              onClick={() => {
                change && onSubmit()
                setchange((prevState) => !prevState)
              }}
              className="text-red-500 hover:text-red-700 ease-in-out duration-200 ml-1 cursor-pointer">
              
              
              {change ? "Apply change" : "Edit"}
              </span>
            </p>
            <p onClick={onLogout} className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer" >Log out</p>
          </div>



          
        </form>

        
            <button
            type="submit"
            className="w-full bg-gray-700 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-black transition duration-150 ease-in-out hover:shadow-lg active:bg-black"
          >
            <Link
              to="/create-listing"
              className="flex justify-center items-center"
            >
              
              Create your Blogs
            </Link>
        </button>
      </div>
      
      </section>

      <div className="max-w-screen-lg mx-auto">
  {!loading && listings.length > 0 && (
    <>
      <h2 className="text-3xl text-center mt-6 font-bold">My Blogs</h2>
      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <li key={listing.id}>
            <div className="">
              <ListingItem
                id={listing.id}
                listing={listing.data}
                onDelete={() => onDelete(listing.id)}
                onEdit={() => onEdit(listing.id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  )}
</div>


      
   </>
  )
}
export default Profile