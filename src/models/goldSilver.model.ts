import { model, Schema } from "mongoose";

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
    gst: { type: Number },
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

export const GoldSilverModel = model<goldSilver>("G_S_GST", GSSchema);