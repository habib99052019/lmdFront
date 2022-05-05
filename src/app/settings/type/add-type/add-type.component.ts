import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { take } from "rxjs";
import { StockService } from "src/app/core/service/stock.service";

@Component({
  selector: "app-add-type",
  templateUrl: "./add-type.component.html",
  styleUrls: ["./add-type.component.scss"],
})
export class AddTypeComponent implements OnInit {
  depots = [];
  categories = [];
  families = [];
  chooseDepot: boolean = true;
  chooseCategory: boolean = false;
  chooseFamily: boolean = false;
  addType: boolean = false;
  addTypeForm: FormGroup;

  family:any;
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
    this.addTypeForm = this.createAddTypeForm();
  }

  createAddTypeForm(): FormGroup {
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
    this.chooseFamily = true;
    this.families = category.listFamily;
  };

  chooseFamilyAction = (family: any) => {
    this.chooseFamily = false;
    this.addType = true;
    this.family = family;
  };

  addTypeAction = () => {
    const formData: FormData = new FormData();
    formData.append("file", this.currentFile ? this.currentFile[0] : null);
    formData.append("name", this.addTypeForm.get("name").value);
    formData.append("description", this.addTypeForm.get("description").value);
    formData.append("idFamily", this.family._id);

    this.stockService.addType(formData).subscribe(type => {
      console.log("resp>>>",type);
      this.showNotification(
       'snackbar-success',
        "Le type a été ajouté avec succès",
       'top',
       'end'
     );
  })
  };

  backButtonAction = () => {
    if (this.addType) {
      this.addType = false;
      this.chooseFamily = true;
    } else if (this.chooseFamily) {
      this.chooseFamily = false;
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