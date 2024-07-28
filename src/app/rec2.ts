import { Company } from './company';

export interface Rec2 {
    id?: string;//MONGOID OBIEKTU
    _id?: string;
    recName: string;
    maker?: Company; //prod name
    clS: string;
    con: string;
    clW: string;
    clF: string;
    cert: boolean;
    agTime: number;
    clX: string[];
    clN:string;
    comments: string;
}
