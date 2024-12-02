export class jewelleryType{
    id!:string;
    name!:string;
    imageDis!:string;
    imageHov!:string;
    description!:string;
    metalType?:string[];
    category?:string[];
    weight!:number;
    mc!:number;
    size?:number;
    stoneCarte?:number;
    stock!:number;
    wastage!:number;
    price!:number;
}
export class bannerType{
    id!:string;
    image!:string;
}
export class rates {
  id!: string;
  gold22!: number;
  gold24!: number;
  gold18!: number;
  silver!: number;
  gst!: number;
}
export class DC {
  id!: string;
  picode!:string;
  charge!:number;
}