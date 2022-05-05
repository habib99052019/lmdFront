import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { take } from "rxjs";
import { StockService } from "src/app/core/service/stock.service";
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: "app-add-category",
  templateUrl: "./add-category.component.html",
  styleUrls: ["./add-category.component.scss"],
})
export class AddCategoryComponent implements OnInit {
  depots = [];
  depot: any;
  chooseDepot: boolean = true;
  addCategory: boolean = false;
  addCategoryForm: FormGroup;
  imgFile: string;
  currentFile: any;

  constructor(
    private stockService: StockService,
    private fb: FormBuilder,
    public router: Router,
    private snackBar: MatSnackBar,

  ) {}

  ngOnInit(): void {
    this.getListArticlesOfAllDepots();
    this.addCategoryForm = this.createAddCategoryForm();
  }

  openInput() {
    document.getElementById("fileInput").click();
  }
  onImageChange(e) {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      this.currentFile = e.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imgFile = reader.result as string;
      };
    }
  }

  createAddCategoryForm(): FormGroup {
    return this.fb.group({
      name: ["", Validators.required],
      description: [""],
      image: ["", Validators.required],
      file: [""],
    });
  }

  getListArticlesOfAllDepots() {
    this.stockService
      .getListOfArticlesByAllDepot()
      .pipe(take(1))
      .subscribe((data: any) => {
        this.depots = data;
        console.log("Result getListArticlesOfAllDepots : ", data);
      });
  }

  chooseDepotAction = (depot: any) => {
    this.depot = depot;
    this.chooseDepot = false;
    this.addCategory = true;
  };
  addCategoryAction = () => {
    console.log(this.depot)

    const formData: FormData = new FormData();
    formData.append("file", this.currentFile ? this.currentFile[0] : null);
    formData.append("name", this.addCategoryForm.get("name").value);
    formData.append("description", this.addCategoryForm.get("description").value);
    formData.append("idDepot", this.depot._id);

    this.stockService.addCategory(formData).subscribe(category => {
      console.log("resp>>>",category);
      this.showNotification(
       'snackbar-success',
        "La catégorie a été ajoutée avec succès",
       'top',
       'end'
     );
  })
  };

  backButtonAction = () => {
    if (this.addCategory) {
      this.addCategory = false;
      this.chooseDepot = true;
    } else {
      this.router.navigate(["settings/article/add"]);
    }
  };
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
}
}