import { Request, Response , NextFunction } from "express";
import { UserLoginInput } from "../dto";
import { FindUser } from "./AdminController";
import { ValidatePassword } from "../utility/PasswordUtility";

export const UserLogin =async (req: Request, res: Response, next: NextFunction) => {
    const  {email , password} = <UserLoginInput>req.body;

    const existingUser =  await FindUser('', email);
    if(existingUser !== null){
        // validate the user so that they see they profile
        const validation = await ValidatePassword(password, existingUser.password, existingUser.salt);
        if(validation){
            return res.json(existingUser);
        }else{
            return res.json({message: "Password not valid"});
        }
    }
    return res.json({message: "You are not allowed to login, you can go on and sign-up "})
}