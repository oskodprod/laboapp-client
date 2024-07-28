import { User } from './user';
import { Company } from './company';


export interface Labrat2 {
    id?: string; //MONGOID OBIEKTU
    _id?: string;
    pName: string;
    lastname: string;
    iniShort: string;
    isAdmin: boolean;
    user?: User; //MONGOID OBIEKTU
    labo?: Company; //MONGOID OBIEKTU

    email: string; //user email
    password: string; //user pass
    name: string //labo name
}
