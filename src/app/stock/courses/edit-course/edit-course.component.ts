import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { id } from 'date-fns/locale';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {

  articles: any = [];
  showAddNewArticle = false;
  quantity: string;
  price: string;
  addArticleToCourseForm: FormGroup;
  addCourseForm: FormGroup;
  id: string;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    this.id = this.route.snapshot.paramMap.get("id");
  }
  course = {
    code: id,
    date: new Date(),
    person: "Takwa",
    types: ["food"],
    price: 16,
    articles: [
      {
        id: "1",
        name: "piment rouge",
        image: "https://topribejaia.com/wp-content/uploads/2021/09/Piment-Rouge.jpg",
        unity: "kg",
        quantity: 4,
        price: 2,
        depot: "",
        category: "",
        family: "",
        type: "",
      },
      {
        id: "2",
        name: "piment rouge",
        image: "https://topribejaia.com/wp-content/uploads/2021/09/Piment-Rouge.jpg",
        unity: "kg",
        quantity: 4,
        price: 2,
        depot: "",
        category: "",
        family: "",
        type: "",
      },
    ]

  }
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

  addArticleToCourse = (item) => {
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
    this.course.articles.push(article)
    this.price = "";
    this.quantity = "";
  };

  addCourse = () => {
    if (this.addCourseForm.invalid || !this.course.articles.length) {
      return;
    }
    console.log("add course", this.addCourseForm.get("date"));
    console.log(this.addCourseForm.get("date").value);
  };

  removeArticle = (id: string) => {

  }
}