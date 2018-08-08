import { Component, OnInit, ViewChild , AfterViewInit } from '@angular/core';
import { MarvelService } from './services/marvel.service';
import { Character } from './models/character.model';
import { MarvelResponse } from './models/marvel.model';
import { ModalService} from './services/modal.service'
import {comic} from './models/comic.model'; 
import { ModalComponent } from './components/modal/modal.component';
import { LocalStorageService } from 'angular-2-local-storage';
import { empty } from '../../node_modules/rxjs';




@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [
    MarvelService,
    ModalService
  ]
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('custom-modal-1') adr : ModalComponent;

  private bodyText: string;
  attribution: string;
  characters: Character[] = [];
  comics: comic[] = [];
  favourites: comic[] =[];
  dataStorage: comic[]=[];
  shown = 10;
  total: number = null;
  filter = '';
  verified : any;


  constructor(private _marvelService: MarvelService, private ModalService: ModalService, private localStorageService:LocalStorageService ) { 
   
    
  }

  async ngAfterViewInit(){

     await this.getFavourites();
  }


  async ngOnInit() {
    await this.refreshList();
    
    
  }

  //este metodo refresca la lista de personajes 
  async refreshList() {
    const response: MarvelResponse<Character> = await this._marvelService.getCharacters(this.shown, this.filter);
    this.characters = response.data.results;

    this.attribution = response.attributionHTML;
  
  }

  // este metodo permite traer los comics relacionados con un personaje especifico
  async findcomics(id){
 
    const response = await this._marvelService.getComics(10, id)
    this.comics = response.data.results;
     
  
  }

  //este metodo ingresa a favoritos un nuevo comic 
  setFavourites(comic){
    
    let data = comic;


    //esto valida si existe en  favoritos

    if( this.favourites === null)
    {
    
      this.dataStorage.push(comic);
      
     
    
      this.localStorageService.set('favourites', this.dataStorage);

    } 

    if(  !this.favourites.some(x=> x.id == data.id ) ){
      
      this.favourites.push(comic);
          
      this.localStorageService.set('favourites', this.dataStorage);

    }
    
    this.getFavourites();
  }

  // este metodo trae los favoritos del localStorage
  async getFavourites(){
    
    this.dataStorage =  await <comic[]> this.localStorageService.get('favourites');

    
    this.favourites = this.dataStorage;    
  }

  //este metodo se encarga de borrar de la lista de favoritos 
  deleteFavourites(comic){

    const index: number = this.favourites.indexOf(comic);
    if (index !== -1) {
        this.favourites.splice(index, 1);
    }       

    this.localStorageService.set('favourites', this.favourites);

  }

  
//este metodo se encarga de abrir el popup de comics
  openModal(id: string,comicid:number) {

    this.findcomics(comicid);
    this.ModalService.open(id,comicid,this.comics);

  }

  closeModal(id: string) {
    this.ModalService.close(id);
  }

 
  // este metodo agrga de forma aleatoria tres comics del personaje selecionado 
  addRandomComic(){
    for(let i=1; i<4 ;) {
      if( !this.favourites.some(x=> x.id == this.comics[i].id )){

        
        this.favourites.push(this.comics[i]);
        

      
        this.localStorageService.set('favourites', this.favourites);
        
        i++
      }
    }
  }


}
