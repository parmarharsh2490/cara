import Seller from "../model/Seller.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js"

export {
    getSellerDetails,
    updateSellerDetails,
    registerSeller
}

const getSellerDetails = asyncHandler(async(req,res) => {
    const user = req.user;
    if(!user){
        throw new ApiError(401,"User not found");
    }
    const seller = await Seller.find({user : user._id}).populate("bankAccountDetails"); 
    if(!seller){
        throw new ApiError(400,"Seller Details not found")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,seller,"Successfully get user")) 
})

const updateSellerDetails = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(401, "User not found");
  }
  const  {businessInformation,bankAccountDetails,legalInformation}  = req.body;
  if(!businessInformation && !legalInformation && !bankAccountDetails){
    throw new ApiError(401, "Updated Fields not found");
  }

  let seller = await Seller.findOne({ user: user._id }).populate("bankAccountDetails");
  if (!seller) {
    throw new ApiError(400, "Seller Details not found");
  }
  if(businessInformation){
    seller.businessInformation = {...businessInformation}
  }
  if(legalInformation){
    seller.legalInformation = {...legalInformation}
  }
  if(bankAccountDetails){
    seller.bankAccountDetails = {...bankAccountDetails}
  }    
    
  await seller.save({validationBeforeSave : false});
  return res
    .status(200)
    .json(new ApiResponse(200, seller, "Successfully updated seller details"));
});


const registerSeller = asyncHandler(async (req, res) => {
  const user = req.user;
  console.log(user);
  if (!user) {
    throw new ApiError(401, "User not found");
  }
  if(user.role === "admin"){
    throw new ApiError(401, "User is Already Admin");
  }
  const seller = await Seller.create({user : user._id})
  if (!seller) {
    throw new ApiError(400, "Seller Creation Failed");
  }
  user.role = "admin"
  user.save({validationBeforeSave : false})
  return res
    .status(200)
    .json(new ApiResponse(200, seller, "Successfully updated seller details"));
});
