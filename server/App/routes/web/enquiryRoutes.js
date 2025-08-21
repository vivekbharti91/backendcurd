let express = require('express');
const { enquiryInsert, enquiryList, enquiryDelete, enquiryUpdate, enquiryUpdateData } = require('../../controller/web/enquiryContoller');
let enquiryRouter = express.Router();

enquiryRouter.post("/insert",enquiryInsert)
//http://localhost:8000/api/website/enquiry/insert

enquiryRouter.get("/view",enquiryList)
//http://localhost:8000/api/website/enquiry/view

enquiryRouter.delete("/delete/:id",enquiryDelete)
//http://localhost:8000/api/website/enquiry/delete

enquiryRouter.get("/update/:id",enquiryUpdate)
//http://localhost:8000/api/website/enquiry/update/:id

enquiryRouter.put("/updateRes/:id",enquiryUpdateData)

module.exports = enquiryRouter;