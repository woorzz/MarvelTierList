import { Component, ElementRef, OnInit, QueryList, ViewChildren, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-tierlist',
  templateUrl: './tierlist.component.html',
  styleUrls: ['./tierlist.component.scss'],
})
export class TierlistComponent implements AfterViewInit {
  @ViewChildren('draggable', { read: ElementRef }) draggables!: QueryList<ElementRef>;
  @ViewChildren('dropzone', { read: ElementRef }) dropzones!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    console.log('Initialisation du glisser-déposer');
    this.initDragAndDrop();
  }

  initDragAndDrop(): void {
    this.draggables.forEach((draggable, index) => {
      const element = draggable.nativeElement;
      element.draggable = true;
      element.addEventListener('dragstart', this.onDragStart, false);
      console.log(`Élément glissable initialisé [${index}]`);
    });

    this.dropzones.forEach((dropzone, index) => {
      const element = dropzone.nativeElement;
      element.addEventListener('dragover', this.onDragOver, false);
      element.addEventListener('drop', this.onDrop, false);
      console.log(`Zone de dépôt initialisée [${index}]`);
    });
  }

  onDragStart(event: DragEvent): void {
    console.log('Début du glissement', event.target);
    const id = (event.target as HTMLElement).id; // Récupérer l'id de l'élément
    event.dataTransfer?.setData('text/plain', id);
  }
  

  onDragOver(event: DragEvent): void {
    event.preventDefault(); // Nécessaire pour permettre le dépôt
    console.log('Glissement sur une zone de dépôt');
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const draggableId = event.dataTransfer?.getData('text/plain');
    if (!draggableId) {
      console.log('Aucun ID glissable récupéré, annulation du dépôt');
      return;
    }
    const draggableElement = document.getElementById(draggableId);
    if (draggableElement && event.target instanceof HTMLElement) {
      // S'assurer que la cible du dépôt est une zone de dépôt
      const dropzone = event.target.closest('.dropzone');
      if (dropzone) {
        dropzone.appendChild(draggableElement);
        console.log(`Élément [${draggableId}] déplacé vers la nouvelle zone de dépôt`);
      } else {
        console.log('Déposé en dehors d\'une zone de dépôt valide, annulation du dépôt');
      }
    }
  }
  
}
