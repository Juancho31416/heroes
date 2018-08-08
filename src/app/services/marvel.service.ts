// import 'rxjs/add/operator/toPromise';
import { Md5 } from 'ts-md5/dist/md5';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Character } from '../models/character.model';
import { MarvelResponse } from '../models/marvel.model';
import { comic } from '../models/comic.model';

@Injectable()
export class MarvelService {
    private _marvelCharacterUrl = 'https://gateway.marvel.com:443/v1/public/characters';
    private _publicKey = 'c4b5296bc35888971631d22848916410';
    private _privateKey = 'fddd97e16368b2fee706a1f6de69f30f191467d3';
    constructor(private _httpService: Http) { }
    private getHash(timeStamp: string): string {
        const hashGenerator: Md5 = new Md5();
        hashGenerator.appendStr(timeStamp);
        hashGenerator.appendStr(this._privateKey);
        hashGenerator.appendStr(this._publicKey);
        const hash: string = hashGenerator.end().toString();
        return hash;
    }

    //establece el timestamp dependiendo de la fecha
    private getTimeStamp(): string {
        return new Date().valueOf().toString();
    }

    //trae los personajes dependiendo del input de consulta
    public async getCharacters(limit: number = 10, prefix: string = null): Promise<MarvelResponse<Character>> {
        const timeStamp = this.getTimeStamp();
        const hash = this.getHash(timeStamp);
        let requestUrl = this._marvelCharacterUrl + '?limit=' + limit + '&ts=' + timeStamp + '&apikey=' + this._publicKey + '&hash=' + hash;
        if (prefix) {
            requestUrl += '&nameStartsWith=' + prefix;
        }
        const response = await this._httpService.get(requestUrl).toPromise();
        return response.json();
    }

    // Este metodo trae los comics asociados a un personaje por id
    public async getComics(limit: number = 10, id: number = null):Promise<MarvelResponse<comic>>
    {
        
        const timeStamp = this.getTimeStamp();
        const hash = this.getHash(timeStamp);
        let requestUrl = this._marvelCharacterUrl + '/' + id + '/'+'comics'+'?ts=' + timeStamp + '&apikey=' + this._publicKey + '&hash=' + hash;
        
        const response = await this._httpService.get(requestUrl).toPromise();
        const responsejson = response.json();
        
        return response.json();
    }

    
}
