import { Component, EventEmitter, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { pipe, } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: "autocomplete-input",
  template: `
    <div class="wrapper">
      <div class="control" [ngClass]="{ 'is-loading': isLoading }">
        <input type="text" class="input" (input)="onInput($event.target.value)" />
      </div>
      <div class="list is-hoverable" *ngIf="list.length > 0">
        <a class="list-item" *ngFor="let item of list" (click)="select(item)">{{ item }}</a>
      </div>
    </div>
  `,
})
export class AutocompleteComponent {
  @Output() public onSelect = new EventEmitter();
  
  list: string[] = [];
  isLoading = false;  

  constructor(private http: HttpClient) {}
  ngOnInit() {  

  }

  ngAfterViewInit() {

  }

  fetchData(query: string) {
    const apiUrl = `https://example.com/api/items?q=${query}`;
    return this.http.get<string[]>(apiUrl);
  }

  onInput(query: string) {
    if(!query) {
      this.list = [];
      return;
    }

    this.isLoading = true;
    this.fetchData(query)
    .pipe(debounceTime(500))
    .subscribe((items) => {
      this.list = items;
      this.isLoading = false;
    });
  }

  select(item: string) {
    this.onSelect.emit(item);
  }
}

