import { Component, EventEmitter, Output } from '@angular/core';
import { FileType } from '../../../models/file.item.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-archivo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-archivo.component.html',
  styleUrl: './form-archivo.component.css'
})
export class FormArchivoComponent {
  fileName: string = '';
  creationDate: Date = new Date();
  fileType: FileType = FileType.FILE;
  FileType = FileType;

  @Output() fileAdded = new EventEmitter<any>();
  @Output() formClosed = new EventEmitter<void>();

  onSubmit(): void {
    console.log("Nombre:", this.fileName);
    console.log("Fecha:", this.creationDate);
    console.log("Tipo de Archivo (Antes):", this.fileType);

    if (!this.fileName || !this.creationDate || this.fileType === undefined) {
      console.log("Formulario no válido.");
      return;
    }

    const fileTypeStr = this.fileType === FileType.FILE ? 'Archivo' : 'Carpeta';
    console.log("Tipo de Archivo (Como cadena):", fileTypeStr);

    const newFile = {
      id: (Math.random() * 1000).toString(),
      name: this.fileName,
      creation: this.creationDate,
      type: this.fileType,
      owners: []
    };

    this.fileAdded.emit(newFile);

    this.fileName = '';
    this.creationDate = new Date();
    this.fileType = FileType.FILE;
  }
}
