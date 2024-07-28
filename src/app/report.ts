export interface Report {
    id?: string; //MONGOID OBIEKTU
    _id?: string; //MONGOID OBIEKTU
    docDate: string;
    rid: string;
    samples?: string[]; //MONGOID OBIEKTU
    avgEnd: number;
    critAvgFck: number;
    fckEnd: number;
    minEnd: number;
    odchStd: number;
    niepewnosc: number;
    createdBy: string;
}
