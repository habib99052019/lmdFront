import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { StockService } from 'src/app/core/service/stock.service';
import { PaginationControlsDirective} from 'ngx-pagination';
import { formatDate } from "@angular/common";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detail-course',
  templateUrl: './detail-course.component.html',
  styleUrls: ['./detail-course.component.scss']
})
export class DetailCourseComponent implements OnInit {

  @ViewChild('p', { static: true}) pa: PaginationControlsDirective;
  ListCourses!:any[];
  month : any;
  showFilters: boolean = false;
  filteredActive = false;
  coursesFilterForm: FormGroup;
  showSearhshButton = false;
  from:string;
  to:string;
  filterData:any;
 config = {
  id: 'custom',
  itemsPerPage: 5,
  currentPage: 1,
  totalItems: 0
};

courses:any;
showMonth:any;
year:any;

months = ["hello","janvier","fevrier","mars","avril","mai","juin", "juillet","aout","september","october","november","december"]

object :any;

startDate:any;
startDate2:any;

  constructor(
    private route: ActivatedRoute, 
    private fb: FormBuilder,
    private service: StockService,
    private router: Router,
    private snackBar: MatSnackBar,
    ) {
      this.month = this.route.snapshot.paramMap.get("month");
      this.year = this.route.snapshot.paramMap.get("year");
     
      //this.object = this.router.getCurrentNavigation();
      console.log("month, year>>>", this.month, this.year);
      var d = new Date();
      var n = d.getUTCDate();
      console.log(" today>>>>",n);
      

       this.startDate = this.startDate2 = new Date(this.year,this.month - 1, n)
      
     }



     

  ngOnInit(): void {
    
   
   this.getCourseByMonth()
 // this.ListCourses = this.courses.extras.state.transactions;
  
    this.showMonth = this.month;
    //this.year = this.courses.extras.state._id.year;
    console.log("month>>",this.month);
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



 



  getCourseByMonth(){
    
   this.service.getCoursesByMonth(this.month, this.year).pipe(take(1)).subscribe((data : any) => {
  
    this.ListCourses = data;
     console.log("data api >>>>", data)
   })
  }


  
  showFiltersHandler = () => {
    this.showFilters = !this.showFilters;
  };


  
  initCourseList(){
   
    this.filteredActive = false;
    this.coursesFilterForm.patchValue({
     from: [""],
     to: [""],
     priceMin: [""],
     priceMax: [""],
     person: [""],
   });

   this.getCourseByMonth();
 }


 labelMonth ( m : number) {
  return this.months[m]
}


/*
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
}*/





deepFilter(){
  this.filteredActive = true;
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
          let obj = resp.find(obj => (obj._id.month == this.month && obj._id.year == this.year));
          console.log(obj);
          this.ListCourses = [obj];
           // this.ListCourses = resp;
           // this.totalLength = resp.length;
            this.config.totalItems = obj.length;
            this.filteredActive = true;
        })
       }
  
      else if(this.coursesFilterForm.get('from').value != "" && this.coursesFilterForm.get('to').value != ""){
              let from = formatDate(this.coursesFilterForm.get('from').value, 'yyyy-MM-dd', 'en');
              let to = formatDate(this.coursesFilterForm.get('to').value, 'yyyy-MM-dd', 'en') ;
            
              this.service.getListCourseByDateRange(from,to).subscribe((resp:any) => {
                          console.log("resp>>", resp);
                          let obj = resp.find(obj => ( obj._id.month == this.month && obj._id.year == this.year ));
                          console.log(obj);
                          this.ListCourses = [obj];
                          //this.totalLength = resp.length;
                          this.config.totalItems = obj.length;
                          this.filteredActive = true;
                })
      }else if(this.coursesFilterForm.get('priceMin').value != "" && this.coursesFilterForm.get('priceMax').value != "" ){
        console.log("testtt");
    
            let prixMin = this.coursesFilterForm.get('priceMin').value;
            let prixMax = this.coursesFilterForm.get('priceMax').value;

            this.service.getListCourseByPrice(prixMin,prixMax).subscribe((resp:any) => {
                        console.log("resp>>", resp);
                        let obj = resp.find(obj => ( obj._id.month == this.month && obj._id.year == this.year) );
                        console.log("price object>>",obj);
                        this.ListCourses = [obj];
                       // this.totalLength = resp.length;
                        this.config.totalItems = obj.length;
                        this.filteredActive = true;
              })
          
      }else if(this.coursesFilterForm.get('person').value != ""){
          let name = this.coursesFilterForm.get('person').value;
          /*this.search(name)*/

          this.service.getListCourseByPerson(name).subscribe((resp:any) => {
            console.log("resp>>", resp);
            let obj = resp.find(obj => ( obj._id.month == this.month && obj._id.year == this.year) );
            console.log(obj);
            this.ListCourses = [obj];
           // this.ListCourses = resp;
           // this.totalLength = resp.length;
            this.config.totalItems = obj.length;
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


showNotification(colorName, text, placementFrom, placementAlign) {
  this.snackBar.open(text, '', {
    duration: 3000,
    verticalPosition: placementFrom,
    horizontalPosition: placementAlign,
    panelClass: colorName,
  });
}

typeExist(types: string[], type: string) {
  return types.find((t) => t === type);
}

}
