import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { take } from "rxjs";
import { StockService } from "src/app/core/service/stock.service";
import { MatSnackBar } from "@angular/material/snack-bar";

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
  submited: boolean = false;
  isFromAddArticle = false;
  isFromAddType = false;
  isFromAddFamily = false;

  constructor(
    private stockService: StockService,
    private fb: FormBuilder,
    public router: Router,
    private snackBar: MatSnackBar
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.isFromAddArticle = navigation.extras.state
      ? navigation.extras.state.isFromAddArticle
      : false;
    this.isFromAddType = navigation.extras.state
      ? navigation.extras.state.isFromAddType
      : false;
    this.isFromAddFamily = navigation.extras.state
      ? navigation.extras.state.isFromAddFamily
      : false;
  }

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
    this.submited = true;
    if (this.addCategoryForm.invalid || !this.currentFile) {
      return;
    }
    const formData: FormData = new FormData();
    formData.append("file", this.currentFile ? this.currentFile[0] : null);
    formData.append("name", this.addCategoryForm.get("name").value.trim());
    formData.append(
      "description",
      this.addCategoryForm.get("description").value
    );
    formData.append("idDepot", this.depot._id);

    this.stockService.addCategory(formData).subscribe((category) => {
      console.log("resp>>>", category);
      this.showNotification(
        "snackbar-success",
        "La catégorie a été ajoutée avec succès",
        "top",
        "end"
      );
    });
  };

  backButtonAction = () => {
    if (this.addCategory) {
      this.addCategory = false;
      this.chooseDepot = true;
    } else if (this.isFromAddArticle) {
      this.router.navigate(["settings/article/add"]);
    } else if (this.isFromAddType) {
      this.router.navigate(["settings/type/add"]);
    } else if (this.isFromAddFamily) {
      this.router.navigate(["settings/family/add"]);
    } else {
      // back to list of depots
    }
  };
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  cancelAction = () => {
    /*this.addCategory = false;
    this.chooseDepot = true;
    this.imgFile = "";
    this.addCategoryForm.reset()*/

    //back to list of categories
  }
}