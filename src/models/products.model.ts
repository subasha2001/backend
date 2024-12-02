import mongoose, { model, Schema } from "mongoose";

export interface Jewellery {
  id: string;
  name: string;
  imageDis: string;
  imageHov: string;
  description: string;
  metalType: string[];
  category: string[];
  weight: number;
  mc: number;
  size: number;
  stock: number;
  wastage: number;
  price: number;
}

export interface DeliveryCharge {
  id:string;
  pincode:string;
  charge:number;
}
export const DeliveryChargeSchema = new Schema<DeliveryCharge>({
  pincode: { type: String, required: true, unique: true },
  charge: { type: Number, required: true },
});

export const ProductSchema = new Schema<Jewellery>(
  {
    name: { type: String, required: true, minlength: 5 },
    imageDis: { type: String, required: true },
    imageHov: { type: String, required: true },
    description: { type: String },
    metalType: { type: [String], required: true },
    category: { type: [String], required: true },
    weight: { type: Number, min: 0 },
    mc: { type: Number, min: 0 },
    size: { type: Number, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    wastage: { type: Number, min: 0 },
    price: { type: Number, min: 0 },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);
export const ProductsModel = model<Jewellery>("products", ProductSchema)
export const DeliveryChargeModel = model<DeliveryCharge>("deliveryCharges", DeliveryChargeSchema)