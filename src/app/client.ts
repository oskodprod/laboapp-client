export interface Client {
    id?: string; //MONGOID OBIEKTU
    _id?: string; //MONGOID OBIEKTU
    clName: string;
    clAddress: string;
    clCity: string;
    short: String;
    iniShort: string;
    cid: string;
    contactname: string;
    contactlastname: string;
    contactTelNo: string;
    user?: string; //MONGOID OBIEKTU
    company?: string; //MONGOID OBIEKTU

    email: string; //user email
    password: string; //user pass
    name: string //labo name
}
