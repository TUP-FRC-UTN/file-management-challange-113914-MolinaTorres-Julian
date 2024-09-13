import { Component, OnInit } from '@angular/core';
import { FILE_LIST } from '../../../data/file.storage';
import { CommonModule } from '@angular/common';
import { FileType } from '../../../models/file.item.model';
import { FormArchivoComponent } from '../form-archivo/form-archivo.component';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule, FormArchivoComponent],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent implements OnInit {
  fileList = FILE_LIST;
  FileType = FileType;
  selectedFiles: Set<string> = new Set();
  showForm = false;

  ngOnInit(): void {
    this.fileList.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === FileType.FOLDER ? -1 : 1;
      }

      return a.name.localeCompare(b.name);
    })
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  addFile(newFile: any): void {
    // console.log("Archivo recibido en el componente padre:", newFile);
    this.fileList.push(newFile);
    this.showForm = false;
  }

  toggleSelection(fileId: string): void {
    if (this.selectedFiles.has(fileId)) {
      this.selectedFiles.delete(fileId);
    } else {
      this.selectedFiles.add(fileId);
    }
  }

  deleteSelectedFiles(): void {
    if (this.selectedFiles.size === 0) {
      alert('No se seleccionó ningún archivo');
      return;
    }

    if (this.selectedFiles.size === 1) {
      this.deleteFiles(Array.from(this.selectedFiles));
    } else {
      if (confirm('¿Seguro desea eliminar los archivos seleccionados?')) {
        this.deleteFiles(Array.from(this.selectedFiles));
      }
    }
  }

  private deleteFiles(fileIds: string[]): void {
    this.fileList = this.fileList.filter(file => !fileIds.includes(file.id));
    this.selectedFiles.clear();
  }

}
