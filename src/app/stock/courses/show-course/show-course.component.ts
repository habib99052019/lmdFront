import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { id } from 'date-fns/locale';

@Component({
  selector: 'app-show-course',
  templateUrl: './show-course.component.html',
  styleUrls: ['./show-course.component.scss']
})
export class ShowCourseComponent implements OnInit {

  editCourseForm: FormGroup;
  id: string;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
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


}