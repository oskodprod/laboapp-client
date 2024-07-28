export interface Labrat {
    id?: string; //MONGOID OBIEKTU
    _id?: string; //MONGOID OBIEKTU
    pName: string;
    lastname: string;
    iniShort: string;
    isAdmin: boolean;
    user?: string; //MONGOID OBIEKTU
    labo?: string; //MONGOID OBIEKTU

    email: string; //user email
    password: string; //user pass
    name: string //labo name
}
