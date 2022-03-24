import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { take } from "rxjs/operators";
import { StockService } from "src/app/core/service/stock.service";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
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

  constructor(
      private fb: FormBuilder,
      private service: StockService,
      private snackBar: MatSnackBar,
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
      this.ListCourses = data;
      this.filterData = data;
      this.totalLength = data.length;
     
          
  })
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
    this.totalLength = this.ListCourses.length;
    this.filteredActive = true;
  }

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
              this.totalLength = resp.length;
              this.filteredActive = true;
          })
         }
    
        else if(this.coursesFilterForm.get('from').value != "" && this.coursesFilterForm.get('to').value != ""){
                let from = formatDate(this.coursesFilterForm.get('from').value, 'yyyy-MM-dd', 'en');
                let to = formatDate(this.coursesFilterForm.get('to').value, 'yyyy-MM-dd', 'en') ;
              
                this.service.getListCourseByDateRange(from,to).subscribe((resp:any) => {
                            console.log("resp>>", resp);
                            this.ListCourses = resp;
                            this.totalLength = resp.length;
                            this.filteredActive = true;
                  })
        }else if(this.coursesFilterForm.get('priceMin').value != "" && this.coursesFilterForm.get('priceMax').value != "" ){
          console.log("testtt");
      
              let prixMin = this.coursesFilterForm.get('priceMin').value;
              let prixMax = this.coursesFilterForm.get('priceMax').value;

              this.service.getListCourseByPrice(prixMin,prixMax).subscribe((resp:any) => {
                          console.log("resp>>", resp);
                          this.ListCourses = resp;
                          this.totalLength = resp.length;
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




  initCourseList(){
     this.getListCourse();
     this.filteredActive = false;
     this.coursesFilterForm.patchValue({
      from: [""],
      to: [""],
      priceMin: [],
      priceMax: [],
      person: [],
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



  typeExist(types: string[], type: string) {
    return types.find((t) => t === type);
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