import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { id } from 'date-fns/locale';
import { take } from 'rxjs/operators';
import { StockService } from 'src/app/core/service/stock.service';
import { PaginationControlsDirective} from 'ngx-pagination';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {

  @ViewChild('p', { static: true}) pa: PaginationControlsDirective;

  articles: any = [];
  showAddNewArticle = false;
  quantity: string;
  price: string;
  addArticleToCourseForm: FormGroup;
  addCourseForm: FormGroup;
  id: string;
  Course:any;
  inputData:any;
  inputData2:any;
  totalPrice: number = 0;
  addedArticles: any = [];
  showOldPrice = true;
  priceUpdated : any;
  ListArticles: any = [];
  searchArticles!: any[];
  totalLength:any;
  page:number = 1;
  article:any;
  oldListArticles: any;
/* /////////// start custom pagination ///////// */

config = {
  id: 'custom',
  itemsPerPage: 3,
  currentPage: 1,
  totalItems: 0
};

 
/* /////////// end custom pagination ///////// */



  constructor(
    private route: ActivatedRoute, 
    private fb: FormBuilder,
    private service: StockService,
    private snackBar: MatSnackBar,
    public router: Router,
    ) 
    {
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
    if(this.article == undefined){
      this.article = '';
   }
    this.addArticleToCourseForm = this.createAddArticleToCourseForm();
    this.addCourseForm = this.createAddCourseForm();
    console.log("id>>>", this.id);
    this.getCourseById();
    this.getListOfArticles();
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


  getCourseById(){
    this.service.getCourseById(this.id).pipe(take(1)).subscribe((data : any) => {
      this.oldListArticles = data;
      console.log("courses api>>>",data );
      this.Course = data;
      this.addedArticles = data.articleList;
      
      console.log("this.addedArticles>>>",this.addedArticles);
      console.log("old list >>>",this.oldListArticles);
  })
}




getListOfArticles(){
  this.service.getListOfArticles().pipe(take(1)).subscribe((data : any)=>{
    this.ListArticles = data;
    
    console.log("data>>>>", data);
    
  })
}



closeAddArticle = (id:string) =>{
  this.searchArticles.forEach((element, index) => {
    if (element._id === id) {
      this.searchArticles[index].isHide = false;
    }})
}

closeCourseArticle = (id:string) => {
  this.Course.articleList.forEach((element, index) => {
    if (element._id === id) {
      this.Course.articleList[index].isHide = true;
    }})
}




search(query:string){
   
  if(query == ''){
  }
   this.searchArticles = (query) ? this.ListArticles.filter( articles =>
       
     
     articles.name.toLowerCase().includes(query.toLowerCase()) 
     
     ) 
     : this.ListArticles;

    console.log(this.ListArticles);
    this.totalLength = this.searchArticles.length;
    this.config.totalItems = this.searchArticles.length;
    console.log("articles length>>>",this.totalLength);
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
    this.searchArticles.forEach((element, index) => {
      if (element._id === id) {
        this.searchArticles[index].isHide = true;
      } else {
        this.searchArticles[index].isHide = false;
      }
    });
  };

  addArticleToCourse = (item) => {
    if (this.addArticleToCourseForm.invalid) {
      return;
    }
    const article = {
      ...item,
      id: item._id,
      name: item.name,
      image: item.img,
      quantity: this.addArticleToCourseForm.get("quantity").value,
      price: this.addArticleToCourseForm.get("price").value,
      isHide:item.isHide,
      totalPrice:
        this.addArticleToCourseForm.get("quantity").value *
        this.addArticleToCourseForm.get("price").value,
    };
    this.addedArticles.push(article);
    const index =  this.searchArticles.splice(this.searchArticles.findIndex(a => a._id === item._id) , 1)
 
    console.log("index >>>", index);
     this.config.totalItems = this.searchArticles.length;
    this.price = "";
    this.quantity = "";
    this.addArticleToCourseForm.patchValue({
      quantity: ["", Validators.required,],
      price: ["", Validators.required],
    });
   // this.totalPrice += parseFloat(article.totalPrice);
    const totalprice = this.addedArticles.reduce((acc,cur) => {
      return acc + cur.totalPrice;
    },0)
    this.totalPrice = totalprice;
    this.showOldPrice = false;
    console.log("addedArticles>>>", this.addedArticles);
  };



  addCourse = () => {


    this.service.getCourseById(this.id).pipe(take(1)).subscribe((data : any) => {
      console.log("list log>>>>",data.articleList);



      
  /*  if (this.addCourseForm.invalid || !this.addedArticles.length) {
      this.showNotification(
        'snackbar-danger',
         "formulaire invalid",
        'top',
        'end'
      );
        return;
      }*/
    console.log("add course", this.addCourseForm.get("date"));
    console.log(this.addCourseForm.get("date").value);

    if(this.showOldPrice == true){
        this.priceUpdated = this.Course.price;
    }else if(this.showOldPrice == false){
        this.priceUpdated = this.totalPrice;

    }
     //test pour ajouter le type des icons

     console.log("old list2 >>>",this.oldListArticles);
   const  objectTosent = {
    code: this.Course.code,
    date: this.Course.date,
    articleList: this.addedArticles,
    oldList: data.articleList,
    types: ["room"],
    price: this.priceUpdated,
    clientID: this.Course.clientID._id,
   
    
  }
   
  console.log("object to sent>>>", objectTosent);
  

   this.service.updateCourse(this.Course._id , objectTosent).subscribe((course :any ) => {
       console.log("resp>>>",course);
       this.showNotification(
        'snackbar-success',
         course.message,
        'top',
        'end'
      );
      this.router.navigate(['stock/courses']);
   },err => {
     console.log(err);
     
    this.showNotification(
      'snackbar-danger',
        err,
      'top',
      'end'
    );
   })
  
  })
  
 
  



 };

  removeArticle = (article) => {
    console.log("article",article);
    this.totalPrice = this.totalPrice - article.totalPrice;
    this.addedArticles.splice(this.addedArticles.findIndex(a => a.id === article._id) , 1)
    const totalprice = this.addedArticles.reduce((acc,cur) => {
      return acc + cur.totalPrice;
    },0)
    this.totalPrice = totalprice;
    this.showOldPrice = false;
  //  this.searchArticles.push(article);
   // this.config.totalItems = this.searchArticles.length;
  }


  checkInput(value){
    console.log("check 1",value);
    this.inputData = value;
  }

  checkInput2(value, price){
    console.log("input",value,price);
    
   this.inputData2 = value;
 }


 editArticle(article){
  console.log("edit article >>>", article);
  
  this.Course.articleList.forEach((element, index) => {
    if (element.id === article._id) {
      this.Course.articleList[index].isHide = false;
    
    }})
  
}

updateArticle(article){
  console.log("article>>>",article);
  console.log("update price>>>", this.inputData);
  console.log("update price>>>", this.inputData2);
  
  if(this.inputData == undefined || this.inputData == 0 ){
     this.inputData = article.quantity;
    
  }
  if(this.inputData2 == undefined || this.inputData2 == 0 ){
   
    this.inputData2 = article.price;
  }
  
  
  const objtosent = {
    ...article,
    id: article.id,
    name: article.name,
    image: article.image,
    quantity: +this.inputData,
    price: +this.inputData2,
    isHide: article.isHide,
    totalPrice:
    this.inputData *
    this.inputData2,
       
   };
   this.inputData = 0;
   this.inputData2 = 0;
  // this.addedArticles.push(objtosent);
  // console.log("addedArticles>>>",this.addedArticles);
   

  const targetIndex = this.addedArticles.findIndex(f=>f._id === article._id); 
  console.log("index>>>", targetIndex );
  
  this.addedArticles[targetIndex]  = objtosent;
  console.log("list>>>>", this.addedArticles);
   const totalprice = this.addedArticles.reduce((acc,cur) => {
     return acc + cur.totalPrice;
   },0)
   this.totalPrice = totalprice;
   this.showOldPrice = false;
   /* close update & supp */
   this.addedArticles.forEach((element, index) => {
    if (element._id === article._id) {
      this.addedArticles[index].isHide = true;
    
    }})
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