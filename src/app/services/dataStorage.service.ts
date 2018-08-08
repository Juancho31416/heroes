import {Injectable} from "@angular/core";
import {WebStorageUtility} from "../utility/webstorage.utility";

export class WebStorageService {
    constructor(private storage: Storage) {

    }

    // este metodo trae el localstorage
    get(key: string): any {
        return WebStorageUtility.get(this.storage, key);
    }

    //este metodo setea localstorage por key
    set(key: string, value: any): void {
        WebStorageUtility.set(this.storage, key, value);
    }

    //este metodo remueve de localstorage por key
    remove(key: string): void {
        WebStorageUtility.remove(this.storage, key);
    }

    // este metodo remueve el localstorage de la appp
    clear(): void {
        this.storage.clear();
    }
}

@Injectable()
export class LocalStorageService extends WebStorageService {
    constructor() {
        super(localStorage);
    }
}

@Injectable()
export class SessionStorageService extends WebStorageService {
    constructor() {
        super(sessionStorage);
}
}