import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { InventaireService } from "src/app/core/service/inventaire.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-edit-inventaire",
  templateUrl: "./edit-inventaire.component.html",
  styleUrls: ["./edit-inventaire.component.scss"],
})
export class EditInventaireComponent implements OnInit {
  all: boolean;
  byDepot: boolean;
  byCategory: boolean;

  depots = [];
  families = [];
  categories = [];
  depotName: any;
  categoryName: any;

  back: any;
  isDraft: any = false;

  editInventaireForm: FormGroup;
  editArticleForm: FormGroup;
  id:any;

  inventory:any;
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    centerMode: true,
    infinite: false,
  };
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    public readonly inventaireService: InventaireService,
    private snackBar: MatSnackBar
  ) {
    this.editInventaireForm = this.createEditInventaireForm();
    this.editArticleForm = this.createEditArticleForm();
    this.id = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.getInventaireAction(this.id)
    console.log(this.inventory)
    
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
  getInventaireAction = (id: string) => {
    this.inventaireService.getInventaire(id).subscribe(
      (res) => {
        if (res) {
          this.inventory = res;
          if(this.inventory.depot && this.inventory.category){
            this.families = this.inventory.articleList;
            this.byCategory = true;
            this.categoryName = this.inventory.category;
            this.depotName = this.inventory.depot;
          } else if(this.inventory.depot && !this.inventory.category){
            this.categories = this.inventory.articleList;
            this.byDepot = true;
            this.categoryName = "";
            this.depotName = this.inventory.depot;
          } else if(!this.inventory.depot && !this.inventory.category){
            this.depots = this.inventory.articleList;
            this.all = true;
            this.categoryName = "";
            this.depotName = "";
          }
        } else {
        }
        console.log(res);
      },
      (error) => {
        console.log("getInventaireAction error", error);
      }
    );
  };
  createEditInventaireForm(): FormGroup {
    return this.fb.group({
      name: ["", Validators.required],
    });
  }
  createEditArticleForm(): FormGroup {
    return this.fb.group({
      quantity: ["", Validators.required],
      difference: ["", Validators.required],
      realQuantity: ["", Validators.required],
    });
  }
  changeRealQuantity = (realQuantity, article) => {
    article.realQuantity = parseFloat(realQuantity);
    article.difference = realQuantity - article.quantity;
    if (realQuantity) {
      article.isValid = true;
    } else {
      article.difference = NaN;
      article.isValid = false;
    }
  };
  editInventaire = () => {
    if (this.editInventaireForm.invalid) {
      return;
    }
    if(this.byCategory){
      let test = true;
      this.inventory.articleList.forEach((family) => {
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
    }
    if(this.byDepot){
      let test = true;
      this.inventory.articleList.forEach((category) => {
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
    }
    if(this.all){
      let test = true;
      this.inventory.articleList.forEach((depot) => {
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
    }
    this.inventory.isDraft = false;
    this.inventaireService.updateInventaire(this.id, this.inventory).subscribe(
      (res) => {
        if (res) {
          this.showNotification(
            "snackbar-success",
            "L'inventaire a été modifié avec succès",
            "top",
            "end"
          );
        } 
        this.router.navigate(["stock/inventaires"]);
      },
      (error) => {
        console.log("removeInventaireAction error", error);
      }
    );

  };
  saveAsDraft = () => {
   
    this.inventory.isDraft = true;

    this.inventaireService.updateInventaire(this.id, this.inventory).subscribe(
      (res) => {
        if (res) {
          this.showNotification(
            "snackbar-success",
            "L'inventaire a été enregistré en tant que brouillon",
            "top",
            "end"
          );
        }
        this.router.navigate(["stock/inventaires"]);
      },
      (error) => {
        console.log("removeInventaireAction error", error);
      }
    );

  };
  backAction = () => {
    this.router.navigate(["stock/inventaires"]);
  };
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
