import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  map,
} from 'rxjs/operators';

@Component({
  selector: 'app-person-autocomplete',
  templateUrl: './person-autocomplete.component.html',
  styleUrls: ['./person-autocomplete.component.scss'],
  exportAs: 'personAutoComplete',
})
export class PersonAutocompleteComponent implements OnInit {
  @Input()
  control: AbstractControl | any;

  @Input()
  people: any[];

  peopleBk: any[] = [];

  @Input()
  personListIsLoading: boolean;

  @ViewChild(MatAutocomplete, { static: true }) autocomplete: MatAutocomplete;
  btAdd = false;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _httpClient: HttpClient
  ) {
    this.people = [];
    this.get();
    this.personListIsLoading = false;
  }

  get(): void {
    this._httpClient.get('http://localhost:5000/people').subscribe({
      next: (p: any) => {
        this.people = p;
        this.peopleBk = p;
      },
    });
  }

  ngOnInit(): void {
    let _value: any = '';
    this.control.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((term: any) => !!term && term.length >= 2),
        // map((value: string) => {
        //   this._filter(value);
        //   if (!this.people.find((p) => p.name === value)) {
        //     this.btAdd = true;
        //   }
        // })
        switchMap((value: any) => {
          this.people = this._filter(value);
          _value = value;
          if (!this.people.find((p) => p.name === value)) {
            this.btAdd = true;
          }
          return of();
        })
      )
      .subscribe((response: any) => {
        this._changeDetectorRef.markForCheck();
      });
  }

  displayPersonFn(person: any): string {
    return person ? person.name : null;
  }

  addPerson(): void {
    this.personListIsLoading = true;
    const person = {
      name: this.control.value,
    };

    this._httpClient.post('http://localhost:5000/people', person).subscribe({
      next: (p) => {
        this.people.push(p);
        this.personListIsLoading = false;
      },
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.peopleBk.filter((p) =>
      p.name.toLowerCase().includes(filterValue)
    );
  }
}
