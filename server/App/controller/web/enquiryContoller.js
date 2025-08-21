const enquiryModel = require("../../model/Enquiry.model");

let enquiryInsert = (req,res)=>{
    let {name,email,phone,message} = req.body;
    let enquiry = new enquiryModel({
        name,
        email,
        phone,
        message
    });
    enquiry.save().then(()=>{
        res.send({status:1,message:"Enquiry Inserted Successfully"})
    }).catch((err)=>{
        res.send({status:0,message:"Error in Inserting Enquiry",error:err});
    })
}

let enquiryList = async (req,res)=>{
    let enquiry = await enquiryModel.find();
    res.send({status:1,enquiryList:enquiry});
}

let enquiryDelete = async (req,res)=>{
    let enquiryId = req.params.id;
    let enquiry = await enquiryModel.deleteOne({_id:enquiryId});
    res.send({status:1,message:"Enquiry deleted successfully",enquiry});
}

let enquiryUpdate = async (req,res)=>{
    let enquiryId = req.params.id;
    let enquiry = await enquiryModel.findOne({_id:enquiryId});
    res.send({status:1,enquiry});
}

let enquiryUpdateData = async (req,res)=>{
    let enquiryId = req.params.id;
    let {name,email,phone,message} = req.body;
    let updateObj = {
        name,
        email,
        phone,
        message
    };
    let updateRes = await enquiryModel.updateOne({_id:enquiryId},{$set:updateObj});
    res.send({status:1,message:"Enquiry updated successfully",updateRes});
}
module.exports = {enquiryInsert,enquiryList,enquiryDelete,enquiryUpdate,enquiryUpdateData};