import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../dto';
import { APP_SECRETS } from '../config/config';
import { Request } from 'express';
import { AuthPayLoad } from '../dto/Auth.dto';

export const GenerateSalt = async()=>{
    return await bcrypt.genSalt();
}

export const GenerateEncryptedPassword = async(password: string, salt: string)=>{
    return await bcrypt.hash(password , salt);
}


export const ValidatePassword = async(enteredPassword: string, savedPassword: string, salt: string)=>{
    return await GenerateEncryptedPassword(enteredPassword, salt) === savedPassword;
}

export const GenerateSignature = (payload: UserPayload) =>{
    return  jwt.sign(payload, APP_SECRETS, {expiresIn: "1h"})
}

export const ValidateSignature = async(req:Request) =>{
    const signature = req.get('Authorization');
    if(signature){
        const payload = await jwt.verify(signature.split(' ')[1] , APP_SECRETS) as AuthPayLoad;
        
        req.user = payload;

        return true;
    }
    return false;
}