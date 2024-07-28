
import { Client2 } from "./client2";
import { Rec2 } from "./rec2";
import { Company } from "./company";

export interface Sample2 {
    id?: string; //MONGOID OBIEKTU
    _id?: string;
    //INFORMACJE NA PROTOKOLE KARCIE I RAPORCIE
    date: Date; //timestamp próbki DATA
    chkDate: Date; //data ściskania DATA
    agTime: number; //czas dojrzewania(do wyliczenia czasu badania)
    sxid: string; //id próbki -> miesiąc/inicjał/numer
    sxHead: string;
    sxLP: number;
    rec?: Rec2; //receptura MONGOID
    client?: Client2;//budowa i kontakt do kierownika MONGOID
    formSize: string; //opis foremki, kształt-wymiar

    //INFORMACJE NA PROTOKOLE
    tLoad: string; //czas załadunku mieszanki
    tCheck: string; //godziny badania
    airTemp: number; //temperatura powietrza
    mixTemp: number; //temperatura mieszanki
    formNo: string; //numer foremki
    thermo: string; //termometr

    //INFORMACJE NA KARCIE BADAŃ
    laboTemp: number; //temperatura w laboratorium
    
    precForm: boolean; //precyzyjność foremek(false=nie true=tak)
    precSide: boolean; //tolerancja pow. bocznych
    precUpDown: boolean; //tolerancja góra-dół
    precFlat: boolean; //płaskość pow. dociskanych(tylko przy nieprec formie)
    precPerpSide: boolean; //prostopad. ścian bocznych(tylko przy nieprec formie)
    precComm: string; //uwagi do testu pomiarów
    
    wymComm: string; //uwagi do wymiarów próbki
    
    destSpeed: number; //prędkość obciążenia w MPa/s
    destSpeedCheck: boolean; //spełnia lub nie
    destComm: string; //uwagi do zniszczenia kostki

    comm1: string; //dodatkowe uwagi do badań
    testedBy: string; //badanie próbki wykonał

    //INFORMACJE NA PROTOKOLE I KARCIE
    testCon: string; //wartości stożka(protokół i karta) DATA
    airPRC: number; //zawartość powietrza w procentach(protokół i karta)

    //INFORMACJE NA SPRAWOZDANIU
                                //I PROTOKOLE
    user: Company; //{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' } firma wykonująca próbke
    WZ: string; //numer WZ
    sCategory: boolean; //rodzaj próbki(false = Z, true = P)
    loc: string; //{ type: mongoose.Schema.Types.ObjectId, ref: 'Formfield' }, miejsce betonowane
    locDesc: string;
                                //I KARCIE
    mass: number; //masa w kg
    wymA: number; //wymiar A w mm
    wymB: number; //wymiar B w mm
    wymC: number; //wymiar C w mm
    
    destForce: number; //siła niszcząca w kN
    destResult: number; //wytrzymałość próbki w MPa(na podst. siły i wymiarów)
    destType: string; //typ zniszczenia(prawidłowy lub nieprawidłowy(wg normy))
}
