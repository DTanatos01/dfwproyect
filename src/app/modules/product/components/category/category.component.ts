import { Component, OnInit } from '@angular/core';
import { category } from '../../_models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {
  public categories: Array<category> = [];

  constructor() {}

  ngOnInit() {
      this.getCategories();
  }

  getCategories() {
    this.categories.push(new category(2, 'CP', 'Cuidado Personal', 'Activo'));
    this.categories.push(new category(7, 'JU', 'Jugueteria', 'Activo'));
    this.categories.push(new category(16, 'CJ', 'Centro de Jardineria', 'Error'));
  }

}
