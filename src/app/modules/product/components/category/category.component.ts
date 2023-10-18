import { Component, OnInit } from '@angular/core';
import { category } from '../../_models/category';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";

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
  public categories: Array<category> = [];  
  public lastid = 1;
  //Variable para el formulario
  formularioCategorias : FormGroup;


  constructor(private formBuilder: FormBuilder) {
    this.formularioCategorias = this.formBuilder.group({
      id: [null],
      category: ['', Validators.required],
      code: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categories.push(new category(this.lastid++, 'CP', 'Cuidado Personal', 1));
    this.categories.push(new category(this.lastid++, 'JU', 'Jugueteria', 1));
    this.categories.push(new category(this.lastid++, 'CJ', 'Centro de Jardineria', 0));
  }

  onSubmit() {
    if (this.formularioCategorias.valid) {
      const formData = this.formularioCategorias.value;
      console.log(formData);
      if (formData.id != null) {
        const temp = this.categories[formData.id-1];
        temp.category = formData.category;
        temp.code = formData.code;
        this.categories[formData.id-1] = temp;
      } else {
        const nuevaCategoria = new category(this.lastid++, formData.code, formData.category, 0);  
        this.categories.push(nuevaCategoria);
      }

      $('#modalCategory').modal('hide');
      this.resetModal();
    } else {
    }
  }
  
  activate(id:number, status:number) {
    const temp = this.categories[id-1];
    temp.status = status;
    this.categories[id-1] = temp;
  }

  editModal(editid:number, editcode:string, editcategory:string) {
    this.formularioCategorias.setValue({id: editid, category: editcategory, code:editcode});
    $('#modalCategory .modal-title').text("Editar Categoria");
    $('#modalCategory').modal('show');
  }

  resetModal() {
    $('#modalCategory .modal-title').text("Nueva Categoria");
    this.formularioCategorias.reset();
  }

}
