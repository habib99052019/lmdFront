import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-course",
  templateUrl: "./add-course.component.html",
  styleUrls: ["./add-course.component.scss", "../courses.component.scss"],
})
export class AddCourseComponent implements OnInit {
  articles: any = [];
  addedArticles: any = [];
  showAddNewArticle = false;
  quantity: string;
  price: string;
  totalPrice: number = 0;
  addArticleToCourseForm: FormGroup;
  addCourseForm: FormGroup;
  isActive = false;
  constructor(
     private fb: FormBuilder,
     public router: Router,
    ) {}

  ngOnInit(): void {
    this.addArticleToCourseForm = this.createAddArticleToCourseForm();
    this.addCourseForm = this.createAddCourseForm();
    
  }


  createAddArticleToCourseForm(): FormGroup {
    return this.fb.group({
      quantity: ["", Validators.required,],
      price: ["", Validators.required],
    });
  }


  createAddCourseForm(): FormGroup {
    return this.fb.group({
      date: ["", Validators.required],
    });
  }


  searchForArticles = (query: string) => {
    console.log(query);
    this.articles = [
      {
        id: "123",
        name: "piment rouge fort",
        image:
          "https://topribejaia.com/wp-content/uploads/2021/09/Piment-Rouge.jpg",
        depot: "Economat",
        category: "Alimentaire",
        family: "Légumes",
        type: "Piment",
        unity: "kg",
        isActive: false,
      },
      {
        id: "100",
        name: "piment vert",
        image:
          "https://topribejaia.com/wp-content/uploads/2021/09/Piment-Rouge.jpg",
        depot: "Economat",
        category: "Alimentaire",
        family: "Légumes",
        type: "Piment",
        unity: "kg",
        isActive: false,
      },
      {
        id: "130",
        name: "piment vert",
        image:
          "https://topribejaia.com/wp-content/uploads/2021/09/Piment-Rouge.jpg",
        depot: "Economat",
        category: "Alimentaire",
        family: "Légumes",
        type: "Piment",
        unity: "kg",
        isActive: false,
      },
      {
        id: "120",
        name: "piment vert",
        image:
          "https://topribejaia.com/wp-content/uploads/2021/09/Piment-Rouge.jpg",
        depot: "Economat",
        category: "Alimentaire",
        family: "Légumes",
        type: "Piment",
        unity: "kg",
        isActive: false,
      },
    ];
  };


  addNewArticle = () => {
    this.showAddNewArticle = true;
  };


  hideNewArticle = () => {
    this.showAddNewArticle = false;
    this.articles = [];
  };


  showAddArticle = (id: string) => {
  
    this.articles.forEach((element, index) => {
      if (element.id === id) {
        this.articles[index].isActive = true;
      } else {
        this.articles[index].isActive = false;
      }
    });
  };

  closeAddArticle = (id:string) =>{
    this.articles.forEach((element, index) => {
      if (element.id === id) {
        this.articles[index].isActive = false;
      }})
  }


  addArticleToCourse = (item) => {
    console.log("articles>>>",item);
    
    if (this.addArticleToCourseForm.invalid) {
      return;
    }
    const article = {
      ...item,
      quantity: this.addArticleToCourseForm.get("quantity").value,
      price: this.addArticleToCourseForm.get("price").value,
      totalPrice:
        this.addArticleToCourseForm.get("quantity").value *
        this.addArticleToCourseForm.get("price").value,
    };
    this.addedArticles.push(article);
    this.price = "";
    this.quantity = "";
    this.totalPrice += parseFloat(article.totalPrice);
  };


  addCourse = () => {
   /* if (this.addCourseForm.invalid || !this.addedArticles.length) {
      return;
    }*/
    console.log("add course", this.addCourseForm.get("date"));
    console.log(this.addCourseForm.get("date").value);
    console.log(this.addedArticles);
    this.router.navigate(['stock/courses']);
  };

  removeArticle = (id: string) => {
    console.log("id",id);
    this.addedArticles.splice(this.addedArticles.findIndex(a => a.id === id) , 1)
  }
}