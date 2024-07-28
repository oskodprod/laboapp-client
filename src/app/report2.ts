import { Sample2 } from "./sample2";
import { Sampling2 } from "./sampling2";

export interface Report {
    id?: string; //MONGOID OBIEKTU
    _id?: string;
    docDate: Date;
    rid: string;
    sampling?: Sampling2;
    samples?: Sample2[]; //MONGOID OBIEKTU
    avgEnd: number;
    //critAvgFck: number;
    fckEnd: number;
    minEnd: number;
    odchStd: number;
    niepewnosc: number;
    createdBy: string;
}
