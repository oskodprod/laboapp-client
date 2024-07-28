export interface Sampling {
    id?: string; //MONGOID OBIEKTU
    _id?: string; //MONGOID OBIEKTU
    docDate: Date;
    sid?: string;
    labrat?: string; //MONGOID OBIEKTU
    client: string; //nazwa
    rec: string; //nazwa
    sidHead: string;
    sidLP?: Number;
    comments?: string;
    samples?: string[]; //MONGOID OBIEKTU
    loc?: string[];
    locDesc?: string;
    mak?: string; //metoda zagęszzenia
    sxMak?: string;
}
