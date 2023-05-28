import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

const isEmpty = (value: string) => value === '';
const isValidForm = (fields: ArticleData) => {
  return !!Object.values(fields)
      .filter((value) => Array.isArray(value) ?
          !!value.filter((value) => isEmpty(value)).length :
          isEmpty(value)
      ).length;
};

type ArticleData = {
  a_name: string,
  topic: string,
  keywords: Array<string>,
  content: string,
  link: string,
}

@Component({
  selector: 'app-definition-creation-page',
  templateUrl: './definition-creation-page.component.html',
  styleUrls: ['./definition-creation-page.component.scss']
})
export class DefinitionCreationPageComponent {
  articleFields: ArticleData = {
    a_name: '',
    topic: '',
    keywords: [''],
    content: '',
    link: ''
  }

  constructor(private http: HttpClient) { }

  createArticle() {
    if (!isValidForm(this.articleFields)) {
      return this.http.post('https://erin-zealous-cougar.cyclic.app/articles', this.articleFields).subscribe(response => {
        console.log(response);
      });
    }
    alert('Entry all value in fields');
    return;
  }

  changeField(nameField: keyof ArticleData, event: Event) {
    const value = (event.target as HTMLInputElement)?.value;
    if (nameField === 'keywords') {
      this.articleFields[nameField] = value.trim().split(/,+\s+|,/g);
    } else {
      this.articleFields[nameField] = value;
    }
  }
}
