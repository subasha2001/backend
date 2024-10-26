import { model, Schema } from "mongoose";

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

export const ProductSchema = new Schema<Jewellery>(
  {
    name: { type: String, required: true, minlength: 5 },
    imageDis: { type: String, required: true },
    imageHov: { type: String, required: true },
    description: { type: String },
    metalType: { type: [String], required: true },
    category: { type: [String], required: true },
    weight: { type: Number },
    mc: { type: Number },
    size: { type: Number},
    stock: { type: Number, required: true },
    wastage: { type: Number },
    price: { type: Number }
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

export interface goldSilver {
  id: string;
  gold22: number;
  gold24: number;
  gold18: number;
  silver: number;
  gst: number;
}
export const GSSchema = new Schema<goldSilver>(
  {
    gold22: { type: Number },
    gold24: { type: Number },
    gold18: { type: Number },
    silver: { type: Number },
    gst: { type: Number }
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

export const ProductsModel = model<Jewellery>("products", ProductSchema);
export const GoldSilverModel = model<goldSilver>("G_S_GST", GSSchema);