import { Request, Response , NextFunction } from "express";
import { UserLoginInput, UserProfileEdit, UserSignupInput } from "../dto";
import { FindUser } from "./AdminController";
import { GenerateEncryptedPassword, GenerateSalt, GenerateSignature, ValidatePassword } from "../utility/PasswordUtility";
import { User } from "../models";

export const UserSignup = async(req:Request, res:Response, next:NextFunction)=>{
    const {name, email, password, phone, address} = <UserSignupInput>req.body;

      // const existingUser = await User.findOne({email: email});
    const existingUser1 = await FindUser('', email);
    if(existingUser1 !== null){
        return res.json({message: "There is a user with this email"});
    };

    // generate the password using the salt
    const salt =  await GenerateSalt();
    const UserPassword = await GenerateEncryptedPassword(password , salt);

    const createdUser = await User.create({
        email:email,
        name: name,
        password: UserPassword,
        phone: phone,
        address: address,
        salt:salt,
    });
    // console.log(createdUser);
    return res.json({"message": "You have successfully registered on the platform, please go on and login"});

}

export const UserLogin =async (req: Request, res: Response, next: NextFunction) => {
    const  {email , password} = <UserLoginInput>req.body;

    const existingUser =  await FindUser('', email);
    if(existingUser !== null){
        // validate the user so that they see they profile
        const validation = await ValidatePassword(password, existingUser.password, existingUser.salt);
        if(validation){

            const signature = GenerateSignature({
                _id: existingUser.id,
                email: existingUser.email,
                name: existingUser.name,
            })
            return res.json(signature);
        }else{
            return res.json({message: "Password not valid"});
        }
    }
    return res.json({message: "You are not allowed to login, you can go on and sign-up "})
}

export const GetUserProfile = async(req: Request, res: Response, next:NextFunction)=>{

    const user = req.user;
    if(user){
        const existingUser = await FindUser(user._id);
        return res.json(existingUser);
    }
    return res.json({"message": "User information not found!"});
    
}


export const UpdateUserProfile = async(req: Request , res: Response, next:NextFunction) =>{
    const { name, phone, password, address} = <UserProfileEdit>req.body;

    const user = req.user;
    if(user){
        const existingUser = await FindUser(user._id);
        if(existingUser !== null){

            existingUser.name = name;
            existingUser.phone = phone;
            existingUser.password = password;
            existingUser.address = address;

            const savedChanges = await existingUser.save();
            console.log(savedChanges);
            return res.json(savedChanges);
            
        }
        return res.json(existingUser);
    }
    return res.json({"message": "User information not found!"});

} 
