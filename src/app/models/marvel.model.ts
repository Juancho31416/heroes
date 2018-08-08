import { Character } from './character.model';
import { comic } from './comic.model';

export abstract class MarvelResponse<T> {
    public code : number;
    public status : string;
    public attributionHTML : string;
    public data : MarvelList<T>;
}

export class MarvelList<T> {
    public offset : number;
    public limit : number;
    public total : number;
    public count : number;
    public results : T[];
}