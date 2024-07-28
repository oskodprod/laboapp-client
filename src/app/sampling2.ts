import { Labrat2 } from "./labrat2";
import { Client2 } from "./client2";
import { Rec2 } from "./rec2";
import { Sample2 } from "./sample2";

export interface Sampling2 {
    id?: string; //MONGOID OBIEKTU
    _id?: string;
    docDate: Date;
    sid?: string;
    labrat?: Labrat2; //MONGOID OBIEKTU
    client?: Client2; //nazwa
    rec?: Rec2; //nazwa
    sidHead: string;
    sidLP?: Number;
    comments?: string;
    samples?: Sample2[]; //MONGOID OBIEKTU
    loc?: string[];
    locDesc?: string;
    sxMak?: string;
    mak?: string;
}
