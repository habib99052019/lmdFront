import { Component, OnInit } from "@angular/core";
import { StockService } from "src/app/core/service/stock.service";
import { take } from "rxjs/operators";
import { formatDate } from "@angular/common";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { InventaireService } from "src/app/core/service/inventaire.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-inventaire",
  templateUrl: "./add-inventaire.component.html",
  styleUrls: ["./add-inventaire.component.scss"],
})
export class AddInventaireComponent implements OnInit {
  showAddArticle: boolean = false;
  listArticles = [];
  searchArticles = [];
  addedArticles = [];
  addInventaireForm: FormGroup;
  addArticleForm: FormGroup;
  addByFamily: boolean = false;
  chooseFamily: boolean = false;
  families = [];
  allFamilies = [];
  articles = [];
  page: number = 1;
  familyName: string = "";
  currentUser: any;
  totalLength: any;
  check = false;

  constructor(
    private stockService: StockService,
    private inventaireService: InventaireService,
    private fb: FormBuilder,
    public router: Router,
    private snackBar: MatSnackBar
  ) {
    this.addInventaireForm = this.createAddInventaireForm();
    this.addArticleForm = this.createAddArticleForm();
  }

  ngOnInit(): void {
    this.getListOfArticles();
    this.currentUser = localStorage.getItem("currentUser");
  }
  //----------------------
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  addByFamilyAction = () => {
    this.addByFamily = true;
    this.getListAllFamiliesAction();
  };

  checkArticles = () => {
    if (this.addInventaireForm.invalid) {
      return;
    }
    if (!this.addedArticles.length) {
      this.showNotification(
        "snackbar-danger",
        "Aucun article n'a été ajouté",
        "top",
        "end"
      );
      return;
    }
    this.check = true;
    this.chooseFamily = false;
  }
  chooseFamilyAction = (family: any) => {
    console.log("eeeee");
    this.articles = [];
    this.stockService
      .getArticlesByFamily(family.name)
      .pipe(take(1))
      .subscribe((data: any) => {
        data[0].listType.forEach((element) => {
          this.articles.push(...element.listArticle);
        });
        console.log(this.articles);
        console.log("family articles>>>", data);
      });
    this.page = 1;
    this.familyName = family.name;
    this.chooseFamily = true;
    this.addByFamily = false;
  };

  getListAllFamiliesAction = () => {
    this.stockService
      .getListOfAllFamilies()
      .pipe(take(1))
      .subscribe((data: any) => {
        console.log("all families api>>>", data);
        this.allFamilies = data;
        this.families = data;
      });
  };

  addInventaire = () => {
    if (this.addInventaireForm.invalid) {
      return;
    }
    if (!this.addedArticles.length) {
      this.showNotification(
        "snackbar-danger",
        "Aucun article n'a été ajouté",
        "top",
        "end"
      );
      return;
    }
    const inventaire = {
      name: this.addInventaireForm.get("name").value,
      date: formatDate(
        this.addInventaireForm.get("date").value,
        "yyyy-MM-dd",
        "en"
      ),
      articleList: this.addedArticles,
      clientID: JSON.parse(this.currentUser).user,
    };

    this.inventaireService.addInventaire(inventaire).subscribe((data: any) => {
      console.log("added inventory: ", data);
      this.showNotification(
        "snackbar-success",
        "L'inventaire a été ajouté avec succès",
        "top",
        "end"
      );
    });

    this.router.navigate(["stock/inventaires"]);
  };

  //--------------------

  createAddInventaireForm(): FormGroup {
    return this.fb.group({
      date: ["", Validators.required],
      name: ["", Validators.required],
    });
  }
  createAddArticleForm(): FormGroup {
    return this.fb.group({
      quantity: ["", Validators.required],
      difference: ["", Validators.required],
      calculatedQuantity: ["", Validators.required],
    });
  }

  changeCalculatedQuantity = (calculatedQuantity, article) => {
    article.calculatedQuantity = parseFloat(calculatedQuantity);
    article.difference = calculatedQuantity - article.quantity;
    this.addedArticles = this.addedArticles.filter(
      (item) => item._id !== article._id
    );
    this.addedArticles.push(article);
    console.log(this.addedArticles);
  };

  changeDifference = (diff, article) => {
    article.difference = parseFloat(diff);
    article.calculatedQuantity =
      parseFloat(diff) + parseFloat(article.quantity);
    console.log("bbbb", this.addArticleForm.get("difference"));
    this.addedArticles = this.addedArticles.filter(
      (item) => item._id !== article._id
    );
    this.addedArticles.push(article);
    console.log(this.addedArticles);
  };

  showAddArticleAction = () => {
    this.showAddArticle = true;
  };
  backAction = () => {
    if (this.addByFamily) {
      this.addByFamily = false;
    } else if (this.chooseFamily) {
      this.chooseFamily = false;
      this.addByFamily = true;
    } else if(this.check){
      this.chooseFamily = true;
      this.addByFamily = false;
      this.check = false;
    }else{
      this.router.navigate(["stock/inventaires"]);
    }
  };
  getListOfArticles() {
    this.stockService
      .getListOfArticles()
      .pipe(take(1))
      .subscribe((data: any) => {
        this.listArticles = data;
        this.searchArticles = data;
        console.log("data>>>>", data.length);
      });
  }
  search(query: string) {
    this.families = query
      ? this.allFamilies.filter((family) =>
          family.name.toLowerCase().includes(query.toLowerCase())
        )
      : this.allFamilies;
    this.totalLength = this.families.length;
  }
}