import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Rec } from '../../rec';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-filter-recipe',
  templateUrl: './filter-recipe.component.html',
  styleUrls: ['./filter-recipe.component.css']
})
export class FilterRecipeComponent implements OnInit, OnDestroy {

  recipeList: Rec[] = [];
  recipeListColumns: string[] = [ 'recName', 'maker', 'prop', 'cert', 'edit', 'delete'];
  recipeListShow: Rec[];
  private listSub: Subscription;
  error: any = null;
  constructor(private recService: RecipeService) { }

  ngOnInit(): void {
    this.error = null;
    this.recService.err.subscribe(err => { this.error = err })

    this.recService.getList();
    this.listSub = this.recService.getListUpdateListener()
    .subscribe((list: Rec[]) => { this.recipeList = list }, err => {this.error = err})
  }

  deleteRecipe(id: string) {
    this.recService.deleteRecipe(id);
    this.listSub = this.recService.getListUpdateListener()
    .subscribe((list: Rec[]) => {
      this.recipeList = list;
    },
    err => { this.error = err });
    
  }

  ngOnDestroy(): void{}
}
