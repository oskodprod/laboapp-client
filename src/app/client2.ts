import { User } from './user';
import { Company } from './company';

export interface Client2 {
    id?: string; //MONGOID OBIEKTU
    _id?: string;
    clName: string;
    clAddress: string;
    clCity: string;
    short: String;
    iniShort: string;
    cid: string;
    contactname: string;
    contactlastname: string;
    contactTelNo: string;
    user?: User; //MONGOID OBIEKTU
    company?: Company; //MONGOID OBIEKTU

    email: string; //user email
    password: string; //user pass
    name: string //labo name
}