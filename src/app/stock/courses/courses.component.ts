import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
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
  ListCourses:any;


  constructor(
      private fb: FormBuilder,
      private service: StockService,
    ) {}

  ngOnInit(): void {
    this.coursesFilterForm = this.createContactForm();
    this.getListCourse();
  }

  
  createContactForm(): FormGroup {
    return this.fb.group({
      from: [""],
      to: [""],
      price: [""],
      person: [""],
    });
  }

  getListCourse(){
    this.service.getListCourse().pipe(take(1)).subscribe((data : any) => {
      console.log("courses api>>>",data );
      this.ListCourses = data;
  })
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
}