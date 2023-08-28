import { Component, EventEmitter, Output, ElementRef, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { fromEvent } from 'rxjs';
import {
  filter,
  map,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';

@Component({
  selector: "autocomplete-input",
  template: `
    <div class="wrapper">
      <div class="control" [ngClass]="{ 'is-loading': isLoading }">
        <input #input type="text" class="input" />
      </div>
      <div class="list is-hoverable" *ngIf="list.length > 0">
        <a (click)="selectItem(item)" class="list-item" *ngFor="let item of list">{{ item }}</a>
      </div>
    </div>
  `,
})
export class AutocompleteComponent {
  @ViewChild('input', { static: true }) inputSearch!: ElementRef;
  @Output() public onSelect = new EventEmitter();
  isLoading: boolean = false;
  list: string[] = [];

  constructor(private http: HttpClient) {}
  ngOnInit() {
    fromEvent(this.inputSearch.nativeElement, 'keyup')
    .pipe(
      map((event: any) => {
        const value: string = event.target.value;
        return value;
      }),      
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((query) => {
      this.isLoading = true;

      this.fetchData(query).subscribe((items) => {
        this.list = items;
        this.isLoading = false;
      })
    })
  }

  fetchData(query: string) {    
    const apiUrl = `https://example.com/api/items?q=${query}`;
    return this.http.get<string[]>(apiUrl);
  }

  selectItem(item: string) {
    this.onSelect.emit(item);
  }
}
