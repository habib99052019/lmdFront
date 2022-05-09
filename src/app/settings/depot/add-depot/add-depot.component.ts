import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { StockService } from "src/app/core/service/stock.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-add-depot",
  templateUrl: "./add-depot.component.html",
  styleUrls: ["./add-depot.component.scss"],
})
export class AddDepotComponent implements OnInit {
  addDepotForm: FormGroup;
  imgFile: string;
  currentFile: any;
  submited: boolean = false;
  isFromAddArticle = false;
  isFromAddType = false;
  isFromAddFamily = false;
  isFromAddCategory = false;

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
    this.isFromAddCategory = navigation.extras.state
      ? navigation.extras.state.isFromAddCategory
      : false;
  }

  ngOnInit(): void {
    this.addDepotForm = this.createAddDepotForm();
  }
  createAddDepotForm(): FormGroup {
    return this.fb.group({
      name: ["", Validators.required],
      description: [""],
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

  addDepot = () => {
    this.submited = true;
    if (this.addDepotForm.invalid || !this.currentFile) {
      return;
    }
    const formData: FormData = new FormData();
    formData.append("file", this.currentFile ? this.currentFile[0] : null);
    formData.append("name", this.addDepotForm.get("name").value.trim());
    formData.append("description", this.addDepotForm.get("description").value);

    this.stockService.addDepot(formData).subscribe((depot) => {
      console.log("resp>>>", depot);
      this.showNotification(
        "snackbar-success",
        "Le dépôt a été ajouté avec succès",
        "top",
        "end"
      );
    });
  };

  backButtonAction = () => {
    if (this.isFromAddArticle) {
      this.router.navigate(["settings/article/add"]);
    } else if (this.isFromAddType) {
      this.router.navigate(["settings/type/add"]);
    } else if (this.isFromAddFamily) {
      this.router.navigate(["settings/family/add"]);
    } else if (this.isFromAddCategory) {
      this.router.navigate(["settings/category/add"]);
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
    // back to list of depots
  };
}