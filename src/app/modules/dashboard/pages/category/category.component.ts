import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CategoryService } from '../../../../shared/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryForm: FormGroup;
  loading = false;
  submitted = false;
  allCategories: any = [];
  errMsg: any = '';
  
  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      category: new FormControl('', [Validators.required])
    });
    this.errMsg = '';
    this.getAllCategory();
  }

  // convenience getter for easy access to form fields
  get f() { return this.categoryForm.controls; }

  onAddCategory() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.categoryForm.invalid) {
        this.errMsg = "Please enter category name!"
        return;
    }
    this.errMsg = '';
    this.loading = true;
    this.categoryService.addCategory(this.f.category.value).pipe(first()).subscribe((res: any) => {
      if(res.success) {
        this.categoryForm.reset();
        this.submitted = false;  
        this.loading = false;
        this.allCategories = [res.new_category, ...this.allCategories]
      }
    },(error) => {
        this.errMsg = 'Something went wrong please try leter!';
        this.loading = false;
    });
            
  }

  getAllCategory() {
    this.errMsg = '';
    this.categoryService.getAllCategory().pipe(first()).subscribe((res: any) => {
      if(res.success) {
        this.allCategories = res.categories;
      }
    },(error) => {
        this.loading = false;
    });
  }

}
