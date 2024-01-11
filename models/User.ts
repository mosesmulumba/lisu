import mongoose , {Schema , Document , Model} from 'mongoose';

interface UserDoc extends Document{
    email: string;
    name: string;
    password: string;
    salt: string;
    serviceAvailable: string;
    coverImages:  [string];
};

const UserSchema = new Schema({
    email: {type: String , required: true},
    name: {type: String},
    password: {type: String , required: true},
    salt: {type:String , required: true},
    serviceAvailable: {type: Boolean},
    coverImages: {type: [String]},
},{
    timestamps: true
});

const User = mongoose.model <UserDoc>('user' , UserSchema);

export {User};