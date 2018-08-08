import { Injectable } from '@angular/core';
import { MarvelService } from './marvel.service'
import { comic } from '../models/comic.model';

@Injectable()
export class ModalService {
  private modals: any[] = [];
  public comics : comic[] = [];

  constructor(){

  }

  add(modal: any) {
      // add modal to array of active modals
      this.modals.push(modal);
  }

  remove(id: string) {
      // remove modal from array of active modals
      this.modals = this.modals.filter(x => x.id !== id);
  }

  open(id: string, comicid:number, comics: comic[]) {  
    
      // open modal specified by id
      let modal: any = this.modals.filter(x => x.id === id)[0];
       
       modal.comics = comics;
       modal.open();
  }

  close(id: string) {
      // close modal specified by id
      let modal: any = this.modals.filter(x => x.id === id)[0];
      modal.close();
  }

  

}