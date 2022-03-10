import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { Router } from "@angular/router";
import { take } from "rxjs/operators";
import { StockService } from "src/app/core/service/stock.service";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: "app-add-course",
  templateUrl: "./add-course.component.html",
  styleUrls: ["./add-course.component.scss", "../courses.component.scss"],
})
export class AddCourseComponent implements OnInit {
 // articles: any = [];
  addedArticles: any = [];
  showAddNewArticle = false;
  quantity: string;
  price: string;
  totalPrice: number = 0;
  addArticleToCourseForm: FormGroup;
  addCourseForm: FormGroup;
  isActive = false;
  ListArticles: any = [];

  searchuser!: any[];
  articles!: any[];
  article:any;
  Articles:any;
  CureentUser:any;

  constructor(
     private fb: FormBuilder,
     public router: Router,
     private service: StockService,
     private snackBar: MatSnackBar,
    ) {}

  ngOnInit(): void {
    if(this.article == undefined){
      this.article = '';
   }
    this.addArticleToCourseForm = this.createAddArticleToCourseForm();
    this.addCourseForm = this.createAddCourseForm();
    this.getListOfArticlesByAllDepot();
    this.CureentUser = localStorage.getItem('currentUser')
    console.log(JSON.parse(this.CureentUser).user);
    
    
    
  }


  getListOfArticlesByAllDepot(){
    this.service.getListOfArticlesByAllDepot().pipe(take(1)).subscribe((data : any)=>{
     // this.DepotArticles = data;
        data.map(item => {
          console.log("items>>>", item.listCategorys);
          item.listCategorys.map(item => {
            
            console.log("items2>>>", item.listFamily);
            item.listFamily.map(item => {
              
              console.log("items3>>>", item.listType);
               item.listType.map(item => {
              
                console.log("items4>>>", item.listArticle);
                  item.listArticle.map(item => {
                    console.log("items5>>>", item);
                    this.ListArticles.push(item) ;
                  })
               })
            })
          })
        })


      console.log("list articles>>>", this.ListArticles);
      this.searchuser =  this.ListArticles;
    })
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

  
  search(query:string)
  {
   
    if(query == ''){
    }
     this.searchuser = (query) ? this.ListArticles.filter( articles =>
      articles.name.toLowerCase().includes(query.toLowerCase()) 
    
       ) 
       : this.ListArticles;
  }

  displayFn(subject:any)
  {
    console.log("event",subject);
     return subject ? subject.name : undefined;
  }

  selected(event: MatAutocompleteSelectedEvent): void {
   
     console.log("event",event.option.value.name);
     
    this.article = event.option.value.name;

   this.service.getListOfArticlesByName(event.option.value.name).pipe(take(1)).subscribe((data : any) => {
       console.log("article api>>>",data );
      this.Articles = data;
   })
 
}




  addNewArticle = () => {
    this.showAddNewArticle = true;
  };


  hideNewArticle = () => {
    this.showAddNewArticle = false;
    this.articles = [];
  };


  showAddArticle = (id: string) => {
    this.isActive = !this.isActive;
  
   /* this.articles.forEach((element, index) => {
      if (element.id === id) {
        this.articles[index].isActive = true;
      } else {
        this.articles[index].isActive = false;
      }
    });*/
  };

  closeAddArticle = (id:string) =>{
   /* this.articles.forEach((element, index) => {
      if (element.id === id) {
        this.articles[index].isActive = false;
      }})*/
      this.isActive = !this.isActive;
  }


  addArticleToCourse = (item) => {
    console.log("articles>>>",item);
    
    if (this.addArticleToCourseForm.invalid) {
      return;
    }
    const article = {
      ...item,
      id: this.Articles.article[0]._id,
      name: this.Articles.article[0].name,
      image: this.Articles.article[0].img,
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
    console.log("addedArticles>>>", this.addedArticles);
    
  };


  addCourse = () => {

  /*  JSON.parse(this.CureentUser).user
    console.log("add course",formatDate(this.addCourseForm.get("date").value, 'yyyy-MM-dd', 'en') );
    console.log(this.addCourseForm.get("date").value);
    console.log("list>>>>",this.addedArticles);*/

   if (this.addCourseForm.invalid || !this.addedArticles.length) {
    this.showNotification(
      'snackbar-danger',
       "formulaire invalid",
      'top',
      'end'
    );
      return;
    }

    //test pour ajouter le type des icons
   const  objectTosent = {
      code: "123",
      date: formatDate(this.addCourseForm.get("date").value, 'yyyy-MM-dd', 'en'),
      articleList: this.addedArticles,
      types: ["room"],
      price: this.totalPrice,
      clientID: JSON.parse(this.CureentUser).user,
    }
     
     this.service.CreateNewCourse(objectTosent).subscribe(course => {
         console.log("resp>>>",course);
         this.showNotification(
          'snackbar-success',
           "course ajouter avec succes",
          'top',
          'end'
        );
     })
    this.router.navigate(['stock/courses']);
  };

  removeArticle = (article) => {
    console.log("article",article);
    this.totalPrice = this.totalPrice - article.totalPrice;
    this.addedArticles.splice(this.addedArticles.findIndex(a => a.id === article._id) , 1)

  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}