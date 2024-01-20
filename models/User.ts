import mongoose , {Schema , Document , Model} from 'mongoose';

interface UserDoc extends Document{
    email: string;
    name: string;
    password: string;
    address: string;
    phone: string;
    salt: string;
    serviceAvailable: string;
    coverImages:  [string];
};

const UserSchema = new Schema({
    email: {type: String , required: true},
    name: {type: String},
    password: {type: String},
    phone: {type: String},
    address: {type: String},
    salt: {type:String , required: true},
    serviceAvailable: {type: Boolean},
    coverImages: {type: [String]},
},{
    toJSON:{
      transform(doc,ret){
        delete ret.coverImages;
        delete ret.salt;
        delete ret.serviceAvailable;
        delete ret.__v;
      }
    },
    timestamps: true
});

const User = mongoose.model <UserDoc>('user' , UserSchema);

export {User};