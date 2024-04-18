import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditorModule } from 'primeng/editor';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, ReactiveFormsModule, EditorModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  constructor(){}


  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      content: new FormControl('', [Validators.required])
  })

  
  handleClick() {

    if(this.form.value.content){
   
     let html = this.form.value.content;
   
     // Replace text-align classes with inline styles
     html = html.replace(/class="ql-align-(\w+)">([\s\S]*?)<\/p>/g, (match, p1, p2) => {
         return `style="text-align: ${p1};">${p2}</p>`;
     });
   
     // Replace font size classes with inline styles
     html = html.replace(/class="ql-size-(\w+)">([\s\S]*?)<\/p>/g, (match, p1, p2) => {
         let fontSize = '';
         switch (p1) {
             case 'small':
                 fontSize = '0.75em';
                 break;
             case 'normal':
                 fontSize = '1em';
                 break;
             case 'large':
                 fontSize = '1.5em';
                 break;
             case 'huge':
                 fontSize = '2.5em';
                 break;
             default:
                 break;
         }
         return `style="font-size: ${fontSize};">${p2}</p>`;
     });
   
     // Add font size to existing style or create new style
     html = html.replace(/style="(.*?)">([\s\S]*?)<\/p>/g, (match, p1, p2) => {
         let style = p1;
         if (!style.includes('font-size')) {
             style += ` font-size: 1em;`;
         }
         return `style="${style}">${p2}</p>`;
     });
   
     // Add text-align to existing style or create new style
     html = html.replace(/style="(.*?)">([\s\S]*?)<\/p>/g, (match, p1, p2) => {
         let style = p1;
         if (!style.includes('text-align')) {
             style += ` text-align: left;`;
         }
         return `style="${style}">${p2}</p>`;
     });
   
   
   
     const objeto = {
       email: this.form.value.email,
       name: this.form.value.name,
       content: html
     }
   
     console.log(objeto)
    }
   
   }


}
