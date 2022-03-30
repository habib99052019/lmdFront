import { formatDate } from "@angular/common";
import { Component, OnInit,ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { take } from "rxjs/operators";
import { StockService } from "src/app/core/service/stock.service";

 /* /////////// start custom pagination ///////// */

 import { PaginationControlsDirective} from 'ngx-pagination';
import { Router } from "@angular/router";
import { ObjectUnsubscribedError } from "rxjs";



  

  /* /////////// end custom pagination ///////// */

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {


 @ViewChild('p', { static: true}) pa: PaginationControlsDirective;
 
  showFilters: boolean = false;
  coursesFilterForm: FormGroup;
  ListCourses!:any[];
  filterData:any;
  showSearhshButton = false;
  to:string;
  from:string;
  totalLength:any;
  page:number = 1;
  filteredActive = false;

 /* /////////// start custom pagination ///////// */

 config = {
  id: 'custom',
  itemsPerPage: 2,
  currentPage: 1,
  totalItems: 0
};

dataToSent:any;
 
/* /////////// end custom pagination ///////// */
 

months = ["hello","Janvier","Février","Mars","Avril","Mai","Juin", "Juillet","Aout","Septembre","Octobre","Novembre","Décembre"]

monthItem = [
  {name:"Janvier", number:1},
  {name:"Février", number:2},
  {name:"Mars", number:3},
  {name:"Avril", number:4},
  {name:"Mai", number:5},
  {name:"Juin", number:6},
  {name:"Juillet", number:7},
  {name:"Aout", number:8},
  {name:"Septembre", number:9},
  {name:"Octobre", number:10},
  {name:"Novembre", number:11},
  {name:"Décembre", number:12}
]

filtred = false;
canselFiltred = false;
showFiltred = true;

  constructor(
      private fb: FormBuilder,
      private service: StockService,
      private snackBar: MatSnackBar,
      private router: Router
    ) {
     
    }

  ngOnInit(): void {
    this.getListCourse();
    this.coursesFilterForm = this.createContactForm();
    
    
    
    
  }

  
  createContactForm(): FormGroup {
    return this.fb.group({
      from: [""],
      to: [""],
      priceMin: [""],
      priceMax: [""],
      person: [""],
    });
  }

  getListCourse(){
    this.service.getListCourse().pipe(take(1)).subscribe((data : any) => {
      console.log("courses api>>>",data );
     /* this.ListCourses = data;
      this.filterData = data;
      this.totalLength = data.length;
      this.config.totalItems = data.length;*/

      this.ListCourses = data;
      this.filterData = data;
      this.totalLength = data.length;
      this.config.totalItems = data.length;


     

/* get item by month */
  let obj = this.ListCourses.find(obj => obj._id.month == 5);
  console.log(obj);
      
  })
  }


  showFilter(){
     this.filtred = !this.filtred;
     this.showFiltred = !this.showFiltred;
     this.canselFiltred = !this.canselFiltred;
  }

  closeFilter(){
    this.filtred = !this.filtred;
     this.showFiltred = !this.showFiltred;
     this.canselFiltred = !this.canselFiltred;
     this.getListCourse();
  }


  /*
  searshMonth(month){
    console.log("month>>>",month);
   this.service.getCoursesByMonth(month.number).pipe(take(1)).subscribe((data : any) => {
     console.log("data api >>>>", data)
     this.ListCourses = data;
   })
  }
*/

  labelMonth ( m : number) {
    return this.months[m]
  }

  selectedMonth(){
  // console.log("month>>>>", month);
   let obj = this.ListCourses.find(obj => obj._id.month == 3);
    console.log("selected>>>",obj);
  }

  typeExist(types: string[], type: string) {
    return types.find((t) => t === type);
  }




  checkFromDate(date){
    if(date){
       this.showSearhshButton = true;
       console.log("date 1>>>",formatDate(date, 'yyyy-MM-dd', 'en'));
       this.from = formatDate(date, 'yyyy-MM-dd', 'en');
     
    }else{
      this.showSearhshButton = false;
    }
    
    
  }

  checkToDate(date){
    console.log("date 2>>>",formatDate(date, 'yyyy-MM-dd', 'en'));
    this.to = formatDate(date, 'yyyy-MM-dd', 'en');
  }


  search(term: string) {
     console.log("term>>>", term);
    this.ListCourses = this.filterData.filter(course => 
      course.clientID.first_name.trim().toLowerCase().includes(term.trim().toLowerCase()) ||
      course.price.toString().includes(term)  
    )
  //  this.totalLength = this.ListCourses.length;
    this.config.totalItems = this.ListCourses.length;
    this.filteredActive = true;
  }

 /* deepFilter(){
    
    console.log("date range>>>", this.coursesFilterForm.get('from').value,this.coursesFilterForm.get('to').value);
     console.log("price>>>", this.coursesFilterForm.get('priceMin').value,this.coursesFilterForm.get('priceMax').value);
   if( this.coursesFilterForm.get('from').value != "" || this.coursesFilterForm.get('to').value != ""  || this.coursesFilterForm.get('priceMax').value != ""  || this.coursesFilterForm.get('priceMin').value != ""  || this.coursesFilterForm.get('person').value){
     
      if((this.coursesFilterForm.get('from').value != "") && (this.coursesFilterForm.get('to').value != "") && (this.coursesFilterForm.get('priceMin').value != "") && (this.coursesFilterForm.get('priceMax').value != "") && (this.coursesFilterForm.get('person').value != "")){
        
        console.log("all>>>",this.coursesFilterForm.get('from').value, this.coursesFilterForm.get('to').value,this.coursesFilterForm.get('priceMax').value,this.coursesFilterForm.get('priceMin').value,this.coursesFilterForm.get('person').value);
            let from = formatDate(this.coursesFilterForm.get('from').value, 'yyyy-MM-dd', 'en');
            let to = formatDate(this.coursesFilterForm.get('to').value, 'yyyy-MM-dd', 'en') ;
            let prixMin = this.coursesFilterForm.get('priceMin').value;
            let prixMax = this.coursesFilterForm.get('priceMax').value;
            let person = this.coursesFilterForm.get('person').value;
          this.service.getListCourseByallOptions(prixMin, prixMax, from, to , person).subscribe((resp:any)=>{
              this.ListCourses = resp;
             // this.totalLength = resp.length;
              this.config.totalItems = resp.length;
              this.filteredActive = true;
          })
         }
    
        else if(this.coursesFilterForm.get('from').value != "" && this.coursesFilterForm.get('to').value != ""){
                let from = formatDate(this.coursesFilterForm.get('from').value, 'yyyy-MM-dd', 'en');
                let to = formatDate(this.coursesFilterForm.get('to').value, 'yyyy-MM-dd', 'en') ;
              
                this.service.getListCourseByDateRange(from,to).subscribe((resp:any) => {
                            console.log("resp>>", resp);
                            this.ListCourses = resp;
                            //this.totalLength = resp.length;
                            this.config.totalItems = resp.length;
                            this.filteredActive = true;
                  })
        }else if(this.coursesFilterForm.get('priceMin').value != "" && this.coursesFilterForm.get('priceMax').value != "" ){
          console.log("testtt");
      
              let prixMin = this.coursesFilterForm.get('priceMin').value;
              let prixMax = this.coursesFilterForm.get('priceMax').value;

              this.service.getListCourseByPrice(prixMin,prixMax).subscribe((resp:any) => {
                          console.log("resp>>", resp);
                          this.ListCourses = resp;
                         // this.totalLength = resp.length;
                          this.config.totalItems = resp.length;
                          this.filteredActive = true;
                })
            
        }else if(this.coursesFilterForm.get('person').value != ""){
            let name = this.coursesFilterForm.get('person').value;
            this.search(name)
          
        }
    
   }  else{
          this.showNotification(
            'snackbar-danger',
            "Formulaire invalide",
            'top',
            'end'
          );
        }
  }
*/






deepFilter(){
    
  console.log("date range>>>", this.coursesFilterForm.get('from').value,this.coursesFilterForm.get('to').value);
   console.log("price>>>", this.coursesFilterForm.get('priceMin').value,this.coursesFilterForm.get('priceMax').value);
 if( this.coursesFilterForm.get('from').value != "" || this.coursesFilterForm.get('to').value != ""  || this.coursesFilterForm.get('priceMax').value != ""  || this.coursesFilterForm.get('priceMin').value != ""  || this.coursesFilterForm.get('person').value){
   
    if((this.coursesFilterForm.get('from').value != "") && (this.coursesFilterForm.get('to').value != "") && (this.coursesFilterForm.get('priceMin').value != "") && (this.coursesFilterForm.get('priceMax').value != "") && (this.coursesFilterForm.get('person').value != "")){
      
      console.log("all>>>",this.coursesFilterForm.get('from').value, this.coursesFilterForm.get('to').value,this.coursesFilterForm.get('priceMax').value,this.coursesFilterForm.get('priceMin').value,this.coursesFilterForm.get('person').value);
          let from = formatDate(this.coursesFilterForm.get('from').value, 'yyyy-MM-dd', 'en');
          let to = formatDate(this.coursesFilterForm.get('to').value, 'yyyy-MM-dd', 'en') ;
          let prixMin = this.coursesFilterForm.get('priceMin').value;
          let prixMax = this.coursesFilterForm.get('priceMax').value;
          let person = this.coursesFilterForm.get('person').value;
        this.service.getListCourseByallOptions(prixMin, prixMax, from, to , person).subscribe((resp:any)=>{
            this.ListCourses = resp;
           // this.totalLength = resp.length;
            this.config.totalItems = resp.length;
            this.filteredActive = true;
        })
       }
  
      else if(this.coursesFilterForm.get('from').value != "" && this.coursesFilterForm.get('to').value != ""){
              let from = formatDate(this.coursesFilterForm.get('from').value, 'yyyy-MM-dd', 'en');
              let to = formatDate(this.coursesFilterForm.get('to').value, 'yyyy-MM-dd', 'en') ;
            
              this.service.getListCourseByDateRange(from,to).subscribe((resp:any) => {
                          console.log("resp>>", resp);
                          this.ListCourses = resp;
                          //this.totalLength = resp.length;
                          this.config.totalItems = resp.length;
                          this.filteredActive = true;
                })
      }else if(this.coursesFilterForm.get('priceMin').value != "" && this.coursesFilterForm.get('priceMax').value != "" ){
        console.log("testtt");
    
            let prixMin = this.coursesFilterForm.get('priceMin').value;
            let prixMax = this.coursesFilterForm.get('priceMax').value;

            this.service.getListCourseByPrice(prixMin,prixMax).subscribe((resp:any) => {
                        console.log("resp>>", resp);
                        this.ListCourses = resp;
                       // this.totalLength = resp.length;
                        this.config.totalItems = resp.length;
                        this.filteredActive = true;
              })
          
      }else if(this.coursesFilterForm.get('person').value != ""){
          let name = this.coursesFilterForm.get('person').value;
          /*this.search(name)*/

          this.service.getListCourseByPerson(name).subscribe((resp:any) => {
            console.log("resp>>", resp);
            this.ListCourses = resp;
           // this.totalLength = resp.length;
            this.config.totalItems = resp.length;
            this.filteredActive = true;
  })
        
      }
  
 }  else{
        this.showNotification(
          'snackbar-danger',
          "Formulaire invalide",
          'top',
          'end'
        );
      }
}



  initCourseList(){
     this.getListCourse();
     this.filteredActive = false;
     this.coursesFilterForm.patchValue({
      from: [""],
      to: [""],
      priceMin: [""],
      priceMax: [""],
      person: [""],
    });
  }

  courses = {
    "Février 2022": [
      {
        code: "ef5",
        person: "Takwa",
        date: new Date(),
        types: ["food"],
        price: "34.500",
      },
      {
        code: "ef5",
        person: "Takwa",
        date: new Date(),
        types: ["food"],
        price: "34.500",
      },
      {
        code: "ef5",
        person: "Takwa",
        date: new Date(),
        types: ["food"],
        price: "34.500",
      },
    ],
    "Mars 2022": [
      {
        code: "145",
        person: "Khouldoun",
        date: new Date(),
        types: ["room", "food"],
        price: "50.500",
      },
      {
        code: "140",
        person: "Khouldoun",
        date: new Date(),
        types: ["room"],
        price: "80.200",
      },
    ],
  };

  gotoDetail(obj){
    console.log("month>>>>",obj);
   // let obj = this.ListCourses.find(obj => obj._id.month == month);
  //  console.log("selected>>>",obj);
  this.router.navigate(['stock/courses/detail', obj.month],{state: obj})
   
 
   // [routerLink]="['detail',course._id.month]" 
  }

 

  showFiltersHandler = () => {
    this.showFilters = !this.showFilters;
  };

  selectedItem(id:string){
    console.log("item id >>>", id);
    
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