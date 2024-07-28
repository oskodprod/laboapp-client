import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  error: any = null;
  //constructor(private recS: RecipeService) { }

  ngOnInit(): void {
    this.error = null
    /*this.recS.err.subscribe(err => {
      this.error = err
    })*/
  }
  
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const recName: string = form.value.recname;
    const maker: string = form.value.maker;
    const cls: string = form.value.cls;
    const con: string = form.value.con;
    const clw: string = form.value.clw;
    const clf: string = form.value.clf;
    //const cert: boolean = form.value.cert;
    const agTime: string = form.value.agtime;
    //const clx: string[] = form.value.clx;
    const cln: string = form.value.cln;
    const comments: string = form.value.comments;

    //this.recS.addRecipe(recName, maker, cls, con, clw, clf, agTime, cln, comments) //cert, clx
      form.reset();
    }
}
