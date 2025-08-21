import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Checkbox, Label, Textarea, TextInput } from "flowbite-react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import EnquiryList from './Enquiry/EnquiryList.jsx';
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default function Enquiry() {
    
    let [enquiryList, setEnquiryList] = useState([]);
    let [formData,setFormData] = useState({
            name:'',
            email:'',
            phone:'',
            message:'',
            _id:''
        })

    let saveEnquiry = (e) =>{
        
        e.preventDefault();

        if(formData._id){
            axios.put(`http://localhost:8000/api/website/enquiry/updateRes/${formData._id}`,formData)
            .then((res)=>{
                console.log(res.data);
                toast.success("Enquiry updated successfully");
                setFormData({
                    name:'',
                    email:'',
                    phone:'',
                    message:'',
                    _id:''
                })
                getAllEnquiry() //for refreshing the list
            })
        }else{
            axios.post('http://localhost:8000/api/website/enquiry/insert',formData)
            .then((res)=>{
                console.log(res.data);
                toast.success("Enquiry saved successfully");
                setFormData({
                    name:'',
                    email:'',
                    phone:'',
                    message:''
                })
                getAllEnquiry() //for refreshing the list
            })
        }


        // let formData = {
        //     name:e.target.name.value,
        //     email:e.target.email.value,
        //     phone:e.target.phone.value,
        //     message:e.target.message.value
        // }
        

    }
    let getAllEnquiry = ()=>{
        axios.get('http://localhost:8000/api/website/enquiry/view')
        .then((res)=>{
            return res.data;
        })
        .then((finalData)=>{
            if(finalData.status){
                setEnquiryList(finalData.enquiryList)
            }
        })
    }
    useEffect(()=>{
        getAllEnquiry();
    },[])
    let getvalue = (e)=>{
        let inputName = e.target.name
        let inputValue = e.target.value
        let oldData = {...formData}
        oldData[inputName] = inputValue
        setFormData(oldData)

    }
  return (
    <div>
        <ToastContainer/>
        <h1 className='font-bold text-[20px]'>User Enquiry</h1>
        <div className='grid grid-cols-[30%_auto] gap-10'>
            <div className='bg-gray-200 p-4'>
                <h2 className='font-bold'>Enquiry form</h2>
                <form onSubmit={saveEnquiry} className="flex max-w-md flex-col gap-4">
                    <div className='py-3 text-start w-full '>
                        <Label htmlFor='name' value='Name'/>
                        <TextInput   name='name' type='text' value={formData.name} onChange={getvalue} placeholder='Enter your name' required />
                    </div>
                    <div className='py-3 text-start w-full '>
                        <Label htmlFor='email' value='Email'/>
                        <TextInput name='email' type='text' value={formData.email} onChange={getvalue} placeholder='Enter your email' required />
                    </div>
                    <div className='py-3 text-start w-full '>
                        <Label htmlFor='text' value='Phone'/>
                        <TextInput name='phone' type='text' value={formData.phone} onChange={getvalue} placeholder='Enter your phone' required />
                    </div>
                    <div className='py-3 text-start w-full '>
                        <Label htmlFor='message' value='message' />
                        <Textarea name='message' type='message' value={formData.message} onChange={getvalue} placeholder='Message' required rows={4} />
                    </div>
                    <div className='py-3 w-full '>
                        <Button type='submit' className='w-full text-black-800 bg-blue-500'>
                            {formData._id ? 'Update' : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>
            <EnquiryList data={enquiryList} getAllEnquiry={getAllEnquiry} Swal={Swal} setFormData={setFormData}/>
            {/* <div>
                <h2 className='bg-gray-200 p-4'>Enquiry List</h2>
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
                                 
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                1
                                </th>
                                <td className="px-6 py-4">vivek</td>
                                <td className="px-6 py-4">vivek@gmail.com</td>
                                <td className="px-6 py-4">+91</td>
                                <td className="px-6 py-4">message</td>
                                <td className="px-6 py-4">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                    Edit
                                </a>
                                </td>
                                <td className="px-6 py-4">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                    Delete
                                </a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>        
            </div> */}
            
        </div>
    </div>
  )
}
