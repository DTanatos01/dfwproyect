import { Component, OnInit } from '@angular/core';
import { Category } from '../../_models/category';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";
import { CategoryService } from '../../_services/category.service';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'


/**
 * Se declara para el uso de Jquery
 */
declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {
  public categories: Array<Category> = [];  
  //Variable para el formulario
  formularioCategorias : FormGroup;
  private nuevoedita : boolean = false;
  private idetitado : number = -1;


  constructor(private formBuilder: FormBuilder, private categoryService : CategoryService) {
    this.formularioCategorias = this.formBuilder.group({
      category: ['', Validators.required],
      code: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    const result = this.categoryService.getCategorys();
    result.subscribe(
      res => {
        this.categories = res;
      },
      err => {
        Swal.fire({
          title: 'Error!',
          text: 'No se logro obtener la información de las Categorias, favor de comunicarse con un administrador',
          icon: 'error',
          confirmButtonText: 'Continuar'
        })
        console.log(err.error);
      }
    );
  }

  onSubmit() {
    if (this.formularioCategorias.valid) {
      const formData = this.formularioCategorias.value;
      if (this.nuevoedita) {
        const result = this.categoryService.updateCategory(formData, this.idetitado);
        result.subscribe(
          res => {
            this.getCategories();
            Swal.fire({
              title: 'Success!',
              text: 'Se actualizo la categoria correctamente',
              icon: 'success',
              confirmButtonText: 'Continuar'
            })
          },
          err => {
            Swal.fire({
              title: 'Error!',
              text: 'No se logro actualizar la categoria, favor de comunicarse con en administrador',
              icon: 'error',
              confirmButtonText: 'Continuar'
            })
            console.log(err.error);
          }
        );
        this.nuevoedita = false;
        this.idetitado = -1;
      } else {
        const result = this.categoryService.createCategory(formData);
        result.subscribe(
          res => {
            this.getCategories();
            Swal.fire({
              title: 'Success!',
              text: 'Se creo la categoria sin problemas',
              icon: 'success',
              confirmButtonText: 'Continuar'
            })
          },
          err => {
            Swal.fire({
              title: 'Error!',
              text: 'No se logro crear la categoria, favor de comunicarse con un administrador',
              icon: 'error',
              confirmButtonText: 'Continuar'
            })
            console.log(err.error);
          }
        );
      }
      $('#modalCategory').modal('hide');
      this.resetModal();
    } else {
    }
  }
  
  activate(id: number) {
    const result = this.categoryService.enableCategory(id);
    result.subscribe(
      res => {
        this.getCategories();
        Swal.fire({
          title: 'Success!',
          text: 'Se activo la categoria sin problemas',
          icon: 'success',
          confirmButtonText: 'Continuar'
        })
      },
      err => {
        Swal.fire({
          title: 'Error!',
          text: 'No se logro activar la categoria, favor de comunicarse con un administrador',
          icon: 'error',
          confirmButtonText: 'Continuar'
        })
        console.log(err.error);
      }
    );
  }

  desactivate(id: number) {
    const result = this.categoryService.disableCategory(id);
    result.subscribe(
      res => {
        this.getCategories();
        Swal.fire({
          title: 'Success!',
          text: 'Se desactivo la categoria sin problemas',
          icon: 'success',
          confirmButtonText: 'Continuar'
        })
      },
      err => {
        Swal.fire({
          title: 'Error!',
          text: 'No se logro desactivar la categoria, favor de comunicarse con un administrador',
          icon: 'error',
          confirmButtonText: 'Continuar'
        })
        console.log(err.error);
      }
    );
  }

  editModal(categoria: Category) {
    this.nuevoedita = true;
    this.idetitado = categoria.category_id;
    this.formularioCategorias.setValue({category: categoria.category, code: categoria.code});
    $('#modalCategory .modal-title').text("Editar Categoria");
    $('#modalCategory').modal('show');
  }

  resetModal() {
    $('#modalCategory .modal-title').text("Nueva Categoria");
    this.formularioCategorias.reset();
  }

}
