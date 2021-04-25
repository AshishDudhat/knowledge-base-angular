import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CategoryService } from '../../../../shared/services/category.service';
import { ContentService } from '../../../../shared/services/content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  public allContents: any = [];
  public allCategories: any = [];
  selectedCategory: any = '';
  searchTxt: any = '';
  public url = "https://talktotucker-new-website.s3.us-east-2.amazonaws.com/";
  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService, private contentService: ContentService) { }

  ngOnInit() {
    this.getAllCategory();
    this.getAllContent(null);
  }

  getAllContent(cat_id) {
    this.contentService.getAllContent(cat_id).pipe(first()).subscribe((res: any) => {
      if(res.success) {
        this.allContents = res.contents;
      }
    },(error) => {
        console.log("error", error);
    });
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

  onChange(newVal) {
    this.selectedCategory = (newVal && newVal !== "All") ? newVal : null;
    if(this.searchTxt) {
      this.searchContent(this.searchTxt);
    } else {
      this.getAllContent(this.selectedCategory);
    }
    
  }

  goToLink(link: string){
    let fullUrl = this.url + link;
    window.open(fullUrl, "_blank");
  }
  
  searchContent(val) {
    this.searchTxt = val ? val : '';
    if(val){
			this.contentService.getFilteredContent(this.selectedCategory,  val).pipe(first()).subscribe((res: any) => {
        if(res.success) {
          this.allContents = res.contents;
        }
      },(error) => {
          console.log("error", error);
      });
		}else{
      this.getAllContent(this.selectedCategory)
		}
  }

}
