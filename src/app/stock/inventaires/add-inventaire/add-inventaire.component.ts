import { Component, OnInit } from "@angular/core";
import { StockService } from "src/app/core/service/stock.service";
import { take } from "rxjs/operators";
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
  depots = [];
  categories = [];
  families = [];
  depot: string;
  category: any;

  addedArticles = [];
  addInventaireForm: FormGroup;
  addArticleForm: FormGroup;
  date = new Date();
  currentUser: any;

  page: number = 1;
  secondStep: boolean = false;
  all: boolean = false;
  byCategory: boolean = false;
  byDepot: boolean = false;
  depotName: string = "";
  isDraft = false;
  back: any;
  loading: boolean = true;

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
    this.currentUser = localStorage.getItem("currentUser");
    this.getListArticlesOfAllDepots();
  }

  ngDoCheck(): void {
    if (this.byCategory) {
      this.families.forEach((family) => {
        let countValidTypes = 0;
        family.listType.forEach((type) => {
          if (type.isValid) {
            countValidTypes++;
          }
          let countValidArticles = 0;
          type.listArticle.forEach((article) => {
            if (article.isValid) {
              countValidArticles++;
            }
          });
          if (countValidArticles === type.listArticle.length) {
            type.isValid = true;
          } else {
            type.isValid = false;
          }
        });
        if (countValidTypes === family.listType.length) {
          family.isValid = true;
        } else {
          family.isValid = false;
        }
      });
    }

    if (this.byDepot) {
      this.categories.forEach((category) => {
        let countValidFamilies = 0;
        category.listFamily.forEach((family) => {
          if (family.isValid) {
            countValidFamilies++;
          }
          let countValidTypes = 0;
          family.listType.forEach((type) => {
            if (type.isValid) {
              countValidTypes++;
            }
            let countValidArticles = 0;
            type.listArticle.forEach((article) => {
              if (article.isValid) {
                countValidArticles++;
              }
            });
            if (countValidArticles === type.listArticle.length) {
              type.isValid = true;
            } else {
              type.isValid = false;
            }
          });
          if (countValidTypes === family.listType.length) {
            family.isValid = true;
          } else {
            family.isValid = false;
          }
        });
        if (countValidFamilies === category.listFamily.length) {
          category.isValid = true;
        } else {
          category.isValid = false;
        }
      });
    }

    if (this.all) {
      this.depots.forEach((depot) => {
        let countValidCategories = 0;
        depot.listCategorys.forEach((category) => {
          if (category.isValid) {
            countValidCategories++;
          }
          let countValidFamilies = 0;
          category.listFamily.forEach((family) => {
            if (family.isValid) {
              countValidFamilies++;
            }
            let countValidTypes = 0;
            family.listType.forEach((type) => {
              if (type.isValid) {
                countValidTypes++;
              }
              let countValidArticles = 0;
              type.listArticle.forEach((article) => {
                if (article.isValid) {
                  countValidArticles++;
                }
              });
              if (countValidArticles === type.listArticle.length) {
                type.isValid = true;
              } else {
                type.isValid = false;
              }
            });
            if (countValidTypes === family.listType.length) {
              family.isValid = true;
            } else {
              family.isValid = false;
            }
          });
          if (countValidFamilies === category.listFamily.length) {
            category.isValid = true;
          } else {
            category.isValid = false;
          }
        });
        if (countValidCategories === depot.listCategorys.length) {
          depot.isValid = true;
        } else {
          depot.isValid = false;
        }
      });
    }
  }
  getListArticlesOfAllDepots() {
    this.stockService
      .getListOfArticlesByAllDepot()
      .pipe(take(1))
      .subscribe((data: any) => {
        this.depots = data;
        console.log("Result getListArticlesOfAllDepots : ", data);
        this.loading = false;
      });
  }

  showSecondStep(depotName: string) {
    this.secondStep = true;
    if (depotName) {
      this.depots.forEach((element) => {
        if (element.name === depotName) {
          this.categories = element.listCategorys;
        }
      });
      this.depot = depotName;
    } else {
      this.depot = "";
    }
  }
  showThirdStep(depot: any, category: any) {
    this.secondStep = false;
    const depotName = depot ? depot.name : this.depot;
    this.depotName = depotName;
    this.category = category ? category : this.category;
    if (!depotName && !this.category) {
      this.all = true;
    } else if (depotName && !this.category) {
      this.byDepot = true;
      this.depots.forEach((element) => {
        if (element.name === depotName) {
          this.categories = element.listCategorys.sort(function (a, b) {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
        }
      });
    } else if (depotName && this.category) {
      this.byCategory = true;
      this.depots.forEach((depot) => {
        if (depot.name === depotName) {
          depot.listCategorys.forEach((category) => {
            if (category.name === this.category.name) {
              this.families = category.listFamily.sort(function (a, b) {
                if (a.name < b.name) {
                  return -1;
                }
                if (a.name > b.name) {
                  return 1;
                }
                return 0;
              });
            }
          });
        }
      });
    }
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  saveAsDraft = () => {
    let articleList = [];
    if (this.back === 1) {
      articleList = this.families;
    } else if (this.back === 2) {
      articleList = this.categories;
    } else if (this.back === 3) {
      articleList = this.depots;
    }
    const inventaire = {
      name: this.addInventaireForm.get("name").value,
      date: this.date,
      articleList: articleList,
      clientID: JSON.parse(this.currentUser).user,
      depot: this.depot ? this.depot : "",
      category: this.category ? this.category.name : "",
      isDraft: true,
    };

    this.inventaireService.addInventaire(inventaire).subscribe((data: any) => {
      this.showNotification(
        "snackbar-success",
        "L'inventaire a été ajouté en tant que brouillon",
        "top",
        "end"
      );
      this.router.navigate(["stock/inventaires"]);
    });
  };

  addInventaire = () => {
    if (this.addInventaireForm.invalid) {
      return;
    }

    let test = true;
    this.families.forEach((family) => {
      family.listType.forEach((type) => {
        type.listArticle.forEach((article) => {
          if (!article.isValid) {
            test = false;
          }
        });
      });
    });
    if (!test) {
      this.back = 1;
      this.byCategory = false;
      this.isDraft = true;
      return;
    }

    const inventaire = {
      name: this.addInventaireForm.get("name").value,
      date: this.date,
      articleList: this.families,
      clientID: JSON.parse(this.currentUser).user,
      depot: this.depot ? this.depot : "",
      category: this.category ? this.category.name : "",
      isDraft: false,
    };

    this.inventaireService.addInventaire(inventaire).subscribe((data: any) => {
      this.showNotification(
        "snackbar-success",
        "L'inventaire a été ajouté avec succès",
        "top",
        "end"
      );
      this.router.navigate(["stock/inventaires"]);
    });
  };

  addInventaireByDepot = () => {
    if (this.addInventaireForm.invalid) {
      return;
    }

    let test = true;
    this.categories.forEach((category) => {
      category.listFamily.forEach((family) => {
        family.listType.forEach((type) => {
          type.listArticle.forEach((article) => {
            if (!article.isValid) {
              test = false;
            }
          });
        });
      });
    });
    if (!test) {
      this.back = 2;
      this.byDepot = false;
      this.isDraft = true;
      return;
    }

    const inventaire = {
      name: this.addInventaireForm.get("name").value,
      date: this.date,
      articleList: this.categories,
      clientID: JSON.parse(this.currentUser).user,
      depot: this.depot ? this.depot : "",
      category: this.category ? this.category.name : "",
      isDraft: false,
    };

    this.inventaireService.addInventaire(inventaire).subscribe((data: any) => {
      this.showNotification(
        "snackbar-success",
        "L'inventaire a été ajouté avec succès",
        "top",
        "end"
      );
      this.router.navigate(["stock/inventaires"]);
    });
  };

  addInventaireForAll = () => {
    if (this.addInventaireForm.invalid) {
      return;
    }

    let test = true;
    this.depots.forEach((depot) => {
      depot.listCategorys.forEach((category) => {
        category.listFamily.forEach((family) => {
          family.listType.forEach((type) => {
            type.listArticle.forEach((article) => {
              if (!article.isValid) {
                test = false;
              }
            });
          });
        });
      });
    });

    if (!test) {
      this.back = 3;
      this.all = false;
      this.isDraft = true;
      return;
    }

    const inventaire = {
      name: this.addInventaireForm.get("name").value,
      date: this.date,
      articleList: this.categories,
      clientID: JSON.parse(this.currentUser).user,
      depot: this.depot ? this.depot : "",
      category: this.category ? this.category.name : "",
      isDraft: false,
    };

    this.inventaireService.addInventaire(inventaire).subscribe((data: any) => {
      this.showNotification(
        "snackbar-success",
        "L'inventaire a été ajouté avec succès",
        "top",
        "end"
      );
      this.router.navigate(["stock/inventaires"]);
    });
  };

  createAddInventaireForm(): FormGroup {
    return this.fb.group({
      name: ["", Validators.required],
    });
  }
  createAddArticleForm(): FormGroup {
    return this.fb.group({
      quantity: ["", Validators.required],
      difference: ["", Validators.required],
      realQuantity: ["", Validators.required],
    });
  }

  changeRealQuantity = (realQuantity, article) => {
    article.realQuantity = parseFloat(realQuantity);
    article.difference = realQuantity - article.quantity;

    this.addedArticles = this.addedArticles.filter(
      (item) => item._id !== article._id
    );
    this.addedArticles.push(article);
    if (realQuantity) {
      article.isValid = true;
    } else {
      article.difference = NaN;
      article.isValid = false;
    }
  };

  backAction = () => {
    if (this.secondStep) {
      this.secondStep = false;
    } else if (this.all) {
      this.all = false;
      this.secondStep = true;
    } else if (this.byCategory) {
      this.byCategory = false;
      this.secondStep = true;
      this.category = null;
      this.depot = "";
    } else if (this.byDepot) {
      this.byDepot = false;
      this.secondStep = true;
      this.depot = "";
    } else if (this.isDraft && this.back === 1) {
      this.isDraft = false;
      this.byCategory = true;
      this.back = null;
    } else if (this.isDraft && this.back === 2) {
      this.isDraft = false;
      this.byDepot = true;
      this.back = null;
    } else if (this.isDraft && this.back === 3) {
      this.isDraft = false;
      this.all = true;
      this.back = null;
    } else {
      this.router.navigate(["stock/inventaires"]);
    }
  };

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    centerMode: false,
    infinite: false,
    arrows: true,
  };
}