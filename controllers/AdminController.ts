import { Request, Response , NextFunction } from "express";
import { CreateUserInput } from "../dto";
import { User } from "../models";
import { GenerateSalt , GenerateEncryptedPassword} from "../utility/PasswordUtility";


export const FindUser = async(id: string | undefined, email?: string)=>{
    if(email){
        return await User.findOne({email:email})
    }else{
        return await User.findById(id);
    }
}

export const CreateUser = async(req: Request, res: Response, next: NextFunction)=>{

    const {email , name , password } = <CreateUserInput>req.body;

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
        salt:salt,
    });
    // console.log(createdUser);
    return res.json(createdUser);

}


export const GetUsers = async(req: Request, res: Response, next: NextFunction)=>{
    const users =  await User.find();
    if(users !== null){
        return res.json(users);
    }
    return res.json({message: "There is no users' data found , please try again!"});
}



export const GetUserByID = async(req: Request, res: Response, next: NextFunction)=>{
    const userId = req.params.id;

    const user = await FindUser(userId);
    if (userId !== null){
        return res.json(user);
    }
    return res.json({message: "No user with this ID was found!"});
}