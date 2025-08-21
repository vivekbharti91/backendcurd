import axios from "axios";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
 

export default function EnquiryList({data,getAllEnquiry,Swal,setFormData}) {
    let editRow = (editid)=>{
          axios.get(`http://localhost:8000/api/website/enquiry/update/${editid}`)
          .then((res)=>{
            let data = res.data
            setFormData(data.enquiry);
          })
    }
    let deleteRow = (delid) =>{
        Swal.fire({
            title: "Do you want to delete the data?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
             
            }).then((result) => {
             
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8000/api/website/enquiry/delete/${delid}`)
                .then((res)=>{
                    console.log(res.data);
                    toast.success("Enquiry deleted successfully");
                    getAllEnquiry() //for refreshing the list
                     
            })
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
        
         
    }
  return (
    <div className="bg-gray-200 p-4">
        {/* <ToastContainer/> */}
      <h2 className="bg-gray-200 p-4">Enquiry List</h2>
      <div className="overflow-x-auto">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">S.No.</th>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Phone</th>
                <th scope="col" className="px-6 py-3">Message</th>
                <th scope="col" className="px-6 py-3">Edit</th>
                <th scope="col" className="px-6 py-3">Delete</th>
              </tr>
            </thead>
            <tbody>
                {
                    data.length>0?
                        data.map((item,index)=>{
                            return(
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-4">{item.name}</td>
                                    <td className="px-6 py-4">{item.email}</td>
                                    <td className="px-6 py-4">{item.phone}</td>
                                    <td className="px-6 py-4">{item.message}</td>
                                    <td className="px-6 py-4">
                                        <a href="#"  onClick={()=>editRow(item._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href="#" onClick={()=>deleteRow(item._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
                                    </td>
                                </tr>
                            )
                        })

                    :
                        <tr className="bg-white border-b dark:bg-gray-500 dark:border-gray-800">
                            <td colSpan={7} className="text-center py-4">No data found</td>
                        </tr>
                }
            </tbody>
            {/* <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  1
                </th>
                <td className="px-6 py-4">vivek</td>
                <td className="px-6 py-4">vivek@gmail.com</td>
                <td className="px-6 py-4">+91</td>
                <td className="px-6 py-4">message</td>
                <td className="px-6 py-4">
                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
                <td className="px-6 py-4">
                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
                </td>
              </tr>
            </tbody> */}
          </table>
        </div>
      </div>
    </div>
  );
}
