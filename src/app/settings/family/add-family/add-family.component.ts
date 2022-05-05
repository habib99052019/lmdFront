import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { take } from "rxjs";
import { StockService } from "src/app/core/service/stock.service";

@Component({
  selector: "app-add-family",
  templateUrl: "./add-family.component.html",
  styleUrls: ["./add-family.component.scss"],
})
export class AddFamilyComponent implements OnInit {
  depots = [];
  categories = [];
  chooseDepot: boolean = true;
  chooseCategory: boolean = false;
  addFamily: boolean = false;
  category:any;

  addFamilyForm: FormGroup;
  imgFile: string;
  currentFile:any;

  constructor(
    private stockService: StockService,
    private fb: FormBuilder,
    public router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getListArticlesOfAllDepots();
    this.addFamilyForm = this.createAddFamilyForm();
  }

  createAddFamilyForm(): FormGroup {
    return this.fb.group({
      name: ["", Validators.required],
      description: [""],
      image: ["", Validators.required],
      file: [""],
    });
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
    this.chooseDepot = false;
    this.chooseCategory = true;
    this.categories = depot.listCategorys;
  };

  chooseCategoryAction = (category: any) => {
    this.chooseCategory = false;
    this.addFamily = true;
    this.category = category;
  };

  addFamilyAction = () => {

    const formData: FormData = new FormData();
    formData.append("file", this.currentFile ? this.currentFile[0] : null);
    formData.append("name", this.addFamilyForm.get("name").value);
    formData.append("description", this.addFamilyForm.get("description").value);
    formData.append("idCategory", this.category._id);

    this.stockService.addFamily(formData).subscribe(family => {
      console.log("resp>>>",family);
      this.showNotification(
       'snackbar-success',
        "La famille a été ajoutée avec succès",
       'top',
       'end'
     );
  })
  };

  backButtonAction = () => {
    if (this.addFamily) {
      this.addFamily = false;
      this.chooseCategory = true;
    } else if (this.chooseCategory) {
      this.chooseCategory = false;
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
