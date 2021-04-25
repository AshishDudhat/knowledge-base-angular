import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CategoryService } from '../../../../../shared/services/category.service';
import { ContentService } from '../../../../../shared/services/content.service';

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.css']
})
export class AddContentComponent implements OnInit {

  contentForm: FormGroup;
  public allCategories: any = [];
  errMessage: any = '';
  loading = false;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService, public router: Router, private contentService: ContentService) { }

  ngOnInit() {
    this.contentForm = this.formBuilder.group({
      content: new FormControl(''),
      category: new FormControl(''),
      file: new FormControl(''),
      fileSource: new FormControl('')
    });
    this.getAllCategory();
  }

  get f(){
    return this.contentForm.controls;
  }

  getAllCategory() {
    this.categoryService.getAllCategory().pipe(first()).subscribe((res: any) => {
      if(res.success) {
        this.allCategories = res.categories;
      }
    },(error) => {
        console.log("error", error);
    });
  }

  onFileChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.contentForm.patchValue({
        fileSource: file
      });
    }
  }

  onCancel() {
    this.router.navigate(['/app/content']);
    this.contentForm.reset();
  }

  removeSelectedFile() {
    this.contentForm.patchValue({
      fileSource: '',
      file: ''
    });
  }

  addContent() {
    let currentUser: any = localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")).user : null;
    this.errMessage = '';

    if(!currentUser) {
      this.errMessage = "Invalid Request!"
      return;
    }

    if(!this.contentForm.get('category').value) {
      this.errMessage = "Please select category!"
      return;
    }

    if(!this.contentForm.get('content').value && !this.contentForm.get('fileSource').value) {
      this.errMessage = 'Please enter content or select file for content add!';
      return;
    }

    if(this.contentForm.get('content').value && this.contentForm.get('fileSource').value) {
      this.errMessage = 'Please add only one from file or content box!';
      return;
    }
    this.submitted = true;
    this.loading = true;
    let formData = new FormData();
    formData.append('user_id', currentUser._id)
    formData.append('category', this.contentForm.get('category').value);
    if(this.contentForm.get('content').value) {
      formData.append('content', this.contentForm.get('content').value);
    }
    if(this.contentForm.get('fileSource').value) {
      formData.append('file', this.contentForm.get('fileSource').value);
    }

    this.contentService.addContent(formData).pipe(first()).subscribe((res: any) => {
      if(res.success) {
        this.loading = false;
        this.router.navigate(['/app/content'])
      }
    },(error) => {
      console.log("error", error);
    });
  }

}
