import captainModel from "../model/captain.model.js";

export const createCaptain = async({firstname , lastname , email , password , color , plate , vehicleType , capacity})=>{

 if(!firstname || !lastname || !email || !password || !color || !plate || !vehicleType ||!capacity){
  return res.status(400).json({message:"All fields are required"});
 }

 const captain = captainModel.create({
    fullname:{
        firstname,
        lastname,
    },
    email,
    password,
    vehicles:{
        color,
        plate,
        vehicleType,
        capacity,
    }
 });

 console.log(captain);
 return captain;
}