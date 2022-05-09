import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { take } from "rxjs";
import { StockService } from "src/app/core/service/stock.service";

@Component({
  selector: "app-add-article",
  templateUrl: "./add-article.component.html",
  styleUrls: ["./add-article.component.scss"],
})
export class AddArticleComponent implements OnInit {
  articles = [];
  addedArticles = [];
  depots = [];
  categories = [];
  families = [];
  types = [];

  chooseDepot: boolean = true;
  chooseCategory: boolean = false;
  chooseFamily: boolean = false;
  chooseType: boolean = false;
  addArticle: boolean = false;

  addArticleForm: FormGroup;
  addArticleToCourseForm: FormGroup;
  type: any;
  family: any;
  category: any;
  depot: any;
  imgFile: string;
  currentFile;
  unities: string[] = ["Kg", "L", "Pièce"];
  selectedUnity;
  submited = false;
  addNewArticle = false;
  add = false;
  isFromCourse = false;

  constructor(
    private route: ActivatedRoute,
    private stockService: StockService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.isFromCourse = navigation.extras.state
      ? navigation.extras.state.isFromCourse
      : false;
    console.log(this.isFromCourse);
  }

  ngOnInit(): void {
    this.getListArticlesOfAllDepots();
    this.addArticleForm = this.createAddArticleForm();
    this.addArticleToCourseForm = this.createAddArticleToCourseForm();
  }

  ngDoCheck(): void {
    if (this.add) {
      this.getListArticlesOfAllDepots();
    }
  }
  byId(index, item) {
    return item._id;
  }
  createAddArticleForm(): FormGroup {
    console.log(this.isFromCourse)
    if(this.isFromCourse){
      return this.fb.group({
        name: ["", Validators.required],
        description: [""],
        unity: [""],
        quantity: ["", Validators.required],
        marque: [""],
        file: [""],
      });
    }else{
      return this.fb.group({
        name: ["", Validators.required],
        description: [""],
        unity: [""],
        marque: [""],
        file: [""],
      });
    }

  }

  getQuantity = (article) => {
    const addArticles = localStorage.getItem("addedArticlesInStorage")
      ? JSON.parse(localStorage.getItem("addedArticlesInStorage"))
      : [];
    addArticles.forEach((item) => {
      if (item._id === article._id) {
        return item.quantity;
      }
    });
    return article.quantity;
  };

  createAddArticleToCourseForm(): FormGroup {
    return this.fb.group({
      quantity: ["", Validators.required],
      price: ["", Validators.required],
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
    this.depot = depot.name;
  };

  chooseCategoryAction = (category: any) => {
    this.chooseCategory = false;
    this.chooseFamily = true;
    this.families = category.listFamily;
    this.category = category.name;
  };

  chooseFamilyAction = (family: any) => {
    this.chooseFamily = false;
    this.chooseType = true;
    this.types = family.listType;
    this.family = family.name;
  };

  chooseTypeAction = (type: any) => {
    this.chooseType = false;
    this.addArticle = true;
    this.type = type;
    this.articles = this.type.listArticle;
  };

  selectUnity = (unity: any) => {
    this.selectedUnity = unity;
  };

  addArticleAction = () => {
    this.submited = true;
    console.log(this.addArticleForm)
    if (this.addArticleForm.invalid || !this.currentFile || !this.selectedUnity) {
      console.log("dzdzez")
      return;
    }
  
    const formData: FormData = new FormData();
    formData.append("file", this.currentFile ? this.currentFile[0] : null);
    formData.append("name", this.addArticleForm.get("name").value.trim());
    formData.append("marque", this.addArticleForm.get("marque").value.trim());
    formData.append("quantity", this.isFromCourse ? this.addArticleForm.get("quantity").value: 0);
    formData.append("unity", this.selectedUnity);
    formData.append(
      "description",
      this.addArticleForm.get("description").value
    );
    formData.append("idType", this.type._id);

    this.stockService.addArticle(formData).subscribe((article) => {
      this.articles.push(article);
      console.log("resp>>>", article);
      this.showNotification(
        "snackbar-success",
        "L'article a été ajouté avec succès",
        "top",
        "end"
      );
      this.addArticle = true;
      this.addNewArticle = false;
    });
  };

  addNewArticleAction = () => {
    this.addNewArticle = true;
    this.addArticle = false;
  };

  backButtonAction = () => {
    if (this.addArticle) {
      this.addArticle = false;
      this.chooseType = true;
    } else if (this.chooseType) {
      this.chooseType = false;
      this.chooseFamily = true;
    } else if (this.chooseFamily) {
      this.chooseFamily = false;
      this.chooseCategory = true;
    } else if (this.chooseCategory) {
      this.chooseCategory = false;
      this.chooseDepot = true;
    } else if (this.addNewArticle) {
      this.addArticle = true;
      this.addNewArticle = false;
    } else if (this.isFromCourse) {
      this.router.navigate(["stock/courses/add"]);
    } else{
      // back to list of articles
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

  addArticleToCourse = (item) => {
    const article = {
      ...item,
      quantity: this.addArticleToCourseForm.get("quantity").value,
      price: this.addArticleToCourseForm.get("price").value,
      isHide: true,
      totalPrice:
        this.addArticleToCourseForm.get("quantity").value *
        this.addArticleToCourseForm.get("price").value,
    };
    const addArticles = localStorage.getItem("addedArticlesInStorage")
      ? JSON.parse(localStorage.getItem("addedArticlesInStorage"))
      : [];
    addArticles.push(article);
    localStorage.setItem("addedArticlesInStorage", JSON.stringify(addArticles));
    item.quantity = this.addArticleToCourseForm.get("quantity").value;
    item.price = this.addArticleToCourseForm.get("price").value;
    item.isValid = true;
  };

  removeArticleFromCourse = (item) => {
    let addArticles = localStorage.getItem("addedArticlesInStorage")
      ? JSON.parse(localStorage.getItem("addedArticlesInStorage"))
      : [];
    addArticles = addArticles.filter((article) => article._id !== item._id);
    localStorage.setItem("addedArticlesInStorage", JSON.stringify(addArticles));
    item.quantity = "";
    item.price = "";
    item.isValid = false;
  };

  editArticle = (item) => {
    let addArticles = localStorage.getItem("addedArticlesInStorage")
      ? JSON.parse(localStorage.getItem("addedArticlesInStorage"))
      : [];
    addArticles = addArticles.forEach((element) => {
      if (element._id === item._id) {
        element.quantity = this.addArticleToCourseForm.get("quantity").value;
        element.price = this.addArticleToCourseForm.get("price").value;
        element.totalPrice =
          this.addArticleToCourseForm.get("quantity").value *
          this.addArticleToCourseForm.get("price").value;
      }
    });
    localStorage.setItem("addedArticlesInStorage", JSON.stringify(addArticles));
    item.quantity = this.addArticleToCourseForm.get("quantity").value;
    item.price = this.addArticleToCourseForm.get("price").value;
  };

  cancelAction = () => {
    if (this.isFromCourse) {
      this.router.navigate(["stock/courses/add"]);
    } else {
      // back to list of articles
    }
  };
}