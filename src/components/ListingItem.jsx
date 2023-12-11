import { Link } from 'react-router-dom'
import {FaTrash} from "react-icons/fa";
import {MdEdit} from "react-icons/md";


function ListingItem({listing , id , onEdit , onDelete}) {
  return <li className='bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md transition m-[10px] overflow-hidden relative'>

    <Link to={`/category/${listing.type}/${id}`} className='contents'>

        <img src={listing.imgUrls[0]} alt="" className=' w-full h-full object-cover  transition ease-in-out' loading='lazy'/>

        <div className='w-full p-[20px]'>
        <div className='flex items-center space-x-1'>
    
         <p className='font-semibold text-sm mb-[2px] text-black '>{listing.address}</p>
        </div>

            <p className='font-bold mt-2 text-lg m-0 truncate '>{listing.title}</p>
           
        </div>
        
    </Link>
    {onDelete && (
        <FaTrash className='absolute bottom-2 right-2 h-6 cursor-pointer text-red-500' onClick={()=>onDelete(listing.id)}/>
    )}
     {onEdit && (
        <MdEdit className='absolute bottom-2 right-7 text-6xl h-6 cursor-pointer text-green-600 ' onClick={()=>onEdit(listing.id)}/>
    )}
   
  </li>
}

export default ListingItem