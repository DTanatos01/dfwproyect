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
      category: ['', Validators.required],
      code: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categories.push(new category(this.lastid++, 'CP', 'Cuidado Personal', 'Activo'));
    this.categories.push(new category(this.lastid++, 'JU', 'Jugueteria', 'Activo'));
    this.categories.push(new category(this.lastid++, 'CJ', 'Centro de Jardineria', 'Error'));
  }

  onSubmit() {
    if (this.formularioCategorias.valid) {
      const formData = this.formularioCategorias.value;
      const nuevaCategoria = new category(this.lastid++, formData.code, formData.category, 'Procesando');

      this.categories.push(nuevaCategoria);

      $('#modalCategory').modal('hide');
      this.formularioCategorias.reset();
    } else {
    }
  }

}
