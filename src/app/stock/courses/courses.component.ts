import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  showFilters: boolean = false;
  coursesFilterForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.coursesFilterForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      from: [""],
      to: [""],
      price: [""],
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

  typeExist(types: string[], type: string) {
    return types.find((t) => t === type);
  }

  showFiltersHandler = () => {
    this.showFilters = !this.showFilters;
  };
}