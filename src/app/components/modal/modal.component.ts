import { ElementRef, Input, OnInit, OnDestroy, Component, AfterViewInit, Output, EventEmitter } from '@angular/core';

import { ModalService } from '../../services/modal.service';
import { comic } from 'src/app/models/comic.model';
import { MarvelService } from '../../services/marvel.service';
import { MarvelResponse } from '../../models/marvel.model';

@Component({
  selector: 'jw-modal',
  templateUrl:'modal.component.html',
  styleUrls: ['modal.component.css']
})


export class ModalComponent implements OnInit, OnDestroy {
  @Input() comics : comic[] =[]
  @Input() id: string;
  @Output() alAbrir = new EventEmitter(); // Evento generado al mostrar el popUp
  @Output() alCerrar = new EventEmitter(); // Evento generado al cerrar el popUp (oprimiendo la 'x' de la esquina superior)

    private element: any;
    public model : any[];
    

    constructor(private modalService: ModalService, private el: ElementRef, private marService : MarvelService) {
        this.element = el.nativeElement;
        
    }


  
    // este metodo se encarga de traer de la vista el modal por id y asignarle eventos 
    ngOnInit(): void {
        let modal = this;

        // ensure id attribute exists
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }

        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.element);

        // close modal on background click
        this.element.addEventListener('click', function (e: any) {
            if (e.target.className === 'jw-modal') {
                modal.close();
            }
        });


        modal.close();
        // add self (this modal instance) to the modal service so it's accessible from controllers
        
        this.modalService.add(this);
    }


    // remove self from modal service when directive is destroyed
    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

    // open modal
    open(addEventListener ,any ): void {
        
        this.element.style.display = 'block';
        
        document.body.classList.add('jw-modal-open');
    }

    // close modal
    close(): void {
        this.element.style.display = 'none';
        document.body.classList.remove('jw-modal-open');
    }


  
    
}





