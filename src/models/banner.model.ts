import { model, Schema } from "mongoose";

export interface banner{
    id:string;
    image:string;
}
export interface review{
    id:string;
    productName:string;
    imageDis:string;
    name:string;
    number:number;
    review:string;
}

export const BannerSchema = new Schema<banner>(
    {
        image:{type:String, required:true}
    },{
        toJSON:{
            virtuals:true
        },
        toObject:{
            virtuals:true
        },
        timestamps:true
    }
)
export const ReviewSchema = new Schema<review>(
    {
        productName:{type:String, required:true},
        imageDis:{type:String, required:true},
        name:{type:String, required:true},
        number:{type:Number, required:true},
        review:{type:String, required:true}
    },{
        toJSON:{
            virtuals:true
        },
        toObject:{
            virtuals:true
        },
        timestamps:true
    }
)

export const BannerModel = model<banner>('banner', BannerSchema);
export const ReviewModel = model<review>('reviews', ReviewSchema);