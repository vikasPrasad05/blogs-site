import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spinner';
import {toast} from "react-toastify"
import {getStorage , ref , uploadBytesResumable , getDownloadURL} from "firebase/storage"
import {getAuth} from 'firebase/auth'
import {v4 as uuidv4} from "uuid";
import {addDoc, collection, doc, getDoc, serverTimestamp, updateDoc} from "firebase/firestore"
import {db} from "../firebase";
import { useNavigate, useParams } from 'react-router';


function EditListing() {

  const navigate = useNavigate();
  const auth = getAuth()
  const [Listing, setListings] = useState(null);
  

  //LOADING HOOK
  const [loading , setLoading] = useState(false);

  //USE STATE
  const [formData , setFormData]  = useState({
    
    blogs : '',
    address:'',
    images : {},

  });

  //DESTRUCTURING
  const { blogs , images, address} = formData;

  const params = useParams()


  useEffect(()=>{
    if(Listing && Listing.userRef !== auth.currentUser.uid){
        toast.error("you can't edit this")
        navigate("/")
    }
},[auth.currentUser.uid ,Listing, navigate])

  // Editlisting 
    useEffect(()=>{
    setLoading(true);
    async function fetchListing(){
        const docRef = doc(db, "listings", params.listingId)
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            setListings(docSnap.data());
            setFormData({...docSnap.data()})
            setLoading(false)

        }else{
            navigate("/")
            toast.error("listing does not exist")
        }
    }
    fetchListing();

}, [navigate, params.listingId]);




  //SOME COMPLEX LOGIC TO TOGGLE STATE
  async function onChange(e){
    let boolean = null;
    if(e.target.value === "true"){
      boolean = true;
    }

    if(e.target.value === "false"){
      boolean = false;
    }

    if(e.target.files){
      setFormData((prevState)=>({
        ...prevState,
        images : e.target.files
      }))
    }

    if(!e.target.files){
      setFormData((prevState)=>({
        ...prevState,
        [e.target.id] : boolean ?? e.target.value,
      }))
    }
  }


  //ON SUBIT FUNCTION
  async function onSubmit(e){
    e.preventDefault();
    setLoading(true);

   
    //maximum image quantity should be 2 check
    if(images.length > 2){
      setLoading(false);
      toast.error("maximum 2 images are allowed");
      return;
    }

 
    //UPLOADING IMAGES TO FIREBASE

    async function storeImage(image){
      return new Promise((resolve , reject)=>{
        const storage = getStorage()
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage , filename);
        const uploadTask = uploadBytesResumable(storageRef , image)
        uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
    reject(error)
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      resolve( downloadURL);
    });
  }
);
      })
    }

    
    const imgUrls = await Promise.all(
    [...images].map((image)=>storeImage(image))).catch((error)=>{
      setLoading(false);
      toast.error("Images not uploaded");
      return;
    }
  );

  const formDataCopy = {
    ...formData,
    imgUrls,
    timestamp : serverTimestamp(),
    userRef : auth.currentUser.uid,
  };

 // Remove empty fields
for (const key in formDataCopy) {
  if (formDataCopy[key] === '') {
    delete formDataCopy[key];
  }
}
  
  delete formDataCopy.images;
  !formDataCopy.offer && delete formDataCopy.discountedPrice;
  console.log(formDataCopy)

  const docRef = doc(db , "listings", params.listingId)
  await updateDoc( docRef,formDataCopy);

  setLoading(false);
  toast.success("Blog updated");
  navigate(`/category/${formDataCopy.type}/${docRef.id}`)
    }

  if(loading){
    return <Spinner/>;
  }

  return (

    <main className="flex items-center justify-center h-screen">
  <div className="bg-white p-8 rounded-lg shadow-md w-96">
    <h1 className="text-2xl font-bold mb-4">Edit a Blog</h1>
    <form onSubmit={onSubmit}>

      <div className="mb-4">
        <label htmlFor="blogs" className="block text-gray-700 text-sm font-bold mb-2">Write a Title</label>
        <textarea
          type="text"
          id="blogs"
          className="w-full border rounded-md p-2"
          placeholder="blog title"
          value={blogs}
          onChange={onChange}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Write a Blog</label>
        <textarea
          type="text"
          id="address"
          className="w-full border rounded-md p-2"
          placeholder="Write your blog here"
          value={address}
          onChange={onChange}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="images" className="block text-gray-700 text-sm font-bold mb-2">Upload Images</label>
        <input
          type="file"
          id="images"
          className="w-full border rounded-md p-2"
          onChange={onChange}
          accept=".jpg, .png, .jpeg"
          multiple
          required
        />
        <p className="text-gray-500 text-sm mt-2">
          Note: The first image will be the cover, and a maximum of 2 images are allowed.
        </p>
      </div>

      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Edit Blog</button>

    </form>
  </div>
</main>

  )
}

export default EditListing