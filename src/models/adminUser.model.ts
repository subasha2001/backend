import { model, Schema } from "mongoose";

export interface Admin{
    id:string;
    email:string;
    number:number;
    pincode:number;
    password:string;
    name:string;
    address:string;
    isAdmin:boolean;
}

export const AdminSchema = new Schema<Admin>(
  {
    name: { type: String, required: true },
    number: { type: Number, required: true },
    pincode: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
    address: { type: String}
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

export const AdminModel = model<Admin>("admin", AdminSchema);