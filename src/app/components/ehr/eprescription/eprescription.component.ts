import { Component, ViewChild, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormControl, FormGroup } from '@angular/forms';
import { AutocompleteResultModel } from '../../../models/typings';
import { MatAutocompleteSelectedEvent, MatInput, MatChipSelectionChange, MatChip } from '@angular/material';
import { EhrService } from '../../../services/ehr.service';
import { concat } from 'rxjs/operator/concat';

@Component({
  templateUrl: './eprescription.component.html',
  styleUrls: ['./eprescription.component.css']
})
export class EprescriptionComponent implements OnInit {
  title = 'SmartHealth UI App';
  itemsAsObjects = [{value: 0, display: 'Angular'}, {value: 1, display: 'React'}];
  
  @ViewChild('chipPCInput') chipPCInput: MatInput;
  @ViewChild('chipGEInput') chipGEInput: MatInput;
  @ViewChild('chipFDInput') chipFDInput: MatInput;
  @ViewChild('chipPDInput') chipPDInput: MatInput;
  autocompleteResultModel: AutocompleteResultModel;

  selectedPCValues: AutocompleteResultModel[] = [];
  sourcePCData: AutocompleteResultModel[] = [];
  favListPC: AutocompleteResultModel[] = [];

  selectedGEValues: AutocompleteResultModel[] = [];
  sourceGEData: AutocompleteResultModel[] = [];
  favListGE: AutocompleteResultModel[] = [];

  selectedFDValues: AutocompleteResultModel[] = [];
  sourceFDData: AutocompleteResultModel[] = [];
  favListFD: AutocompleteResultModel[] = [];

  selectedPDValues: AutocompleteResultModel[] = [];
  sourcePDData: AutocompleteResultModel[] = [];
  favListPD: AutocompleteResultModel[] = [];

  get PCvalue(): AutocompleteResultModel[] { return this.selectedPCValues; }
  set PCvalue(v: AutocompleteResultModel[]) {
      this.selectedPCValues = v;
      // this.onChange(this._value);
  }
  get GEvalue(): AutocompleteResultModel[] { return this.selectedGEValues; }
  set GEvalue(v: AutocompleteResultModel[]) {
      this.selectedGEValues = v;
  }
  get FDvalue(): AutocompleteResultModel[] { return this.selectedFDValues; }
  set FDvalue(v: AutocompleteResultModel[]) {
      this.selectedFDValues = v;
  }
  get PDvalue(): AutocompleteResultModel[] { return this.selectedPDValues; }
  set PDvalue(v: AutocompleteResultModel[]) {
      this.selectedPDValues = v;
  }

  constructor(private ehrService: EhrService) {
    this.autocompleteResultModel = {
      id: '',
      text: ''
    };

  }

  ngOnInit() {
    this.ehrService.getFavoriteList('pc').subscribe((res: Response) => {
      this.favListPC = res.json().results;
      console.log(this.favListPC);
    });
    this.ehrService.getFavoriteList('ge').subscribe((res: Response) => {
      this.favListGE = res.json().results;
    });
    this.ehrService.getFavoriteList('fd').subscribe((res: Response) => {
      this.favListFD = res.json().results;
    });
    this.ehrService.getFavoriteList('pd').subscribe((res: Response) => {
      this.favListPD = res.json().results;
    });
  }

  getFilteredSource(type): AutocompleteResultModel[] {
    switch (type) {
      case 'pc':
        return this.filterAutocompleteSource(this.sourcePCData, this.selectedPCValues, 'id');
      case 'ge':
        return this.filterAutocompleteSource(this.sourceGEData, this.selectedGEValues, 'id');
      case 'fd':
        return this.filterAutocompleteSource(this.sourceFDData, this.selectedFDValues, 'id');
      case 'pd':
        return this.filterAutocompleteSource(this.sourcePDData, this.selectedPDValues, 'id');
    }
  }

  addSelectedOption(event: MatAutocompleteSelectedEvent, type): void {
    const t: AutocompleteResultModel = event.option.value;
    let index, FavIds;
    switch (type) {
      case 'pc':
        this.selectedPCValues.push(t);
        this.PCvalue = this.selectedPCValues;
        // this.chipPCInput['nativeElement'].blur();
        this.chipPCInput['nativeElement'].value = '';
        FavIds = this.favListPC.map((k) => k.id);
        index = FavIds.indexOf(t.id);
        if (index > -1) {
          this.favListPC.splice(index, 1);
        }
        break;
      case 'ge':
        this.selectedGEValues.push(t);
        this.GEvalue = this.selectedGEValues;
        // this.chipGEInput['nativeElement'].blur();
        this.chipGEInput['nativeElement'].value = '';
        FavIds = this.favListGE.map((k) => k.id);
        index = FavIds.indexOf(t.id);
        if (index > -1) {
          this.favListGE.splice(index, 1);
        }
        break;
      case 'fd':
        this.selectedFDValues.push(t);
        this.FDvalue = this.selectedFDValues;
        // this.chipFDInput['nativeElement'].blur();
        this.chipFDInput['nativeElement'].value = '';
        FavIds = this.favListFD.map((k) => k.id);
        index = FavIds.indexOf(t.id);
        if (index > -1) {
          this.favListFD.splice(index, 1);
        }
        break;
      case 'pd':
        this.selectedPDValues.push(t);
        this.PDvalue = this.selectedPDValues;
        // this.chipPDInput['nativeElement'].blur();
        this.chipPDInput['nativeElement'].value = '';
        FavIds = this.favListFD.map((k) => k.id);
        index = FavIds.indexOf(t.id);
        if (index > -1) {
          this.favListFD.splice(index, 1);
        }
        break;
    }
  }

  onChipClick(event, tag: AutocompleteResultModel, type) {
    switch (type) {
      case 'pc':
        const selectedPCIds = this.selectedPCValues.map((i) => i.id);
        if (selectedPCIds.indexOf(tag.id) === -1) {
          this.selectedPCValues.push(tag);
          this.PCvalue = this.selectedPCValues;
          this.chipPCInput['nativeElement'].blur();
          const index = this.favListPC.indexOf(tag);
          console.log('fav', index);
          console.log('fav', this.favListPC);
          console.log('fav', tag);
          if (index > -1) {
            this.favListPC.splice(index, 1);
          }
        }
        break;
      case 'ge':
        const selectedGEIds = this.selectedGEValues.map((i) => i.id);
        if (selectedGEIds.indexOf(tag.id) === -1) {
          this.selectedGEValues.push(tag);
          this.GEvalue = this.selectedGEValues;
          this.chipGEInput['nativeElement'].blur();
          const index = this.favListGE.indexOf(tag);
          if (index > -1) {
            this.favListGE.splice(index, 1);
          }
        }
        break;
      case 'fd':
        const selectedFDIds = this.selectedFDValues.map((i) => i.id);
        if (selectedFDIds.indexOf(tag.id) === -1) {
          this.selectedFDValues.push(tag);
          this.FDvalue = this.selectedFDValues;
          this.chipFDInput['nativeElement'].blur();
          const index = this.favListFD.indexOf(tag);
          if (index > -1) {
            this.favListFD.splice(index, 1);
          }
        }
        break;
      case 'pd':
        const selectedPDIds = this.selectedPDValues.map((i) => i.id);
        if (selectedPDIds.indexOf(tag.id) === -1) {
          this.selectedPDValues.push(tag);
          this.PDvalue = this.selectedPDValues;
          this.chipPDInput['nativeElement'].blur();
          const index = this.favListPD.indexOf(tag);
          if (index > -1) {
            this.favListPD.splice(index, 1);
          }
        }
        break;
    }
  }

  remove(tag: AutocompleteResultModel, type): void {
    switch (type) {
      case 'pc':
        this.selectedPCValues = this.selectedPCValues.filter((i: AutocompleteResultModel) => i.id !== tag.id);
        this.PCvalue = this.selectedPCValues;
        this.chipPCInput['nativeElement'].blur();
        break;
      case 'ge':
        this.selectedGEValues = this.selectedGEValues.filter((i: AutocompleteResultModel) => i.id !== tag.id);
        this.GEvalue = this.selectedGEValues;
        this.chipGEInput['nativeElement'].blur();
        break;
    case 'fd':
        this.selectedFDValues = this.selectedFDValues.filter((i: AutocompleteResultModel) => i.id !== tag.id);
        this.FDvalue = this.selectedFDValues;
        this.chipFDInput['nativeElement'].blur();
        break;
    case 'pd':
        this.selectedPDValues = this.selectedPDValues.filter((i: AutocompleteResultModel) => i.id !== tag.id);
        this.PDvalue = this.selectedPDValues;
        this.chipPDInput['nativeElement'].blur();
        break;
    }
  }

  getSmartSuggestions($event, type) {
    const inputValue = $event.srcElement.value;
    if (inputValue !== '' && inputValue.length > 2) {
      switch (type) {
        case 'pc':
          this.ehrService.getSmartSuggestions(inputValue, 'pc').subscribe((res: Response) => {
            this.sourcePCData = res.json().results;
            this.getFilteredSource('pc');
          });
          break;
        case 'ge':
          this.ehrService.getSmartSuggestions(inputValue, 'ge').subscribe((res: Response) => {
            this.sourceGEData = res.json().results;
            this.getFilteredSource('ge');
          });
          break;
        case 'fd':
          this.ehrService.getSmartSuggestions(inputValue, 'fd').subscribe((res: Response) => {
            this.sourceFDData = res.json().results;
            this.getFilteredSource('fd');
          });
          break;
        case 'pd':
          this.ehrService.getSmartSuggestions(inputValue, 'pd').subscribe((res: Response) => {
            this.sourcePDData = res.json().results;
            this.getFilteredSource('pd');
          });
          break;
      }
    }
  }

  filterAutocompleteSource(s: any[], v: any[], key: string) {
    const reducedIds = v.map((o) => o[key]);
    // console.log('filter_value', v);
    // console.log('filter_source', s.filter((obj: any) => reducedIds.indexOf(obj[key]) === -1));
    return s.filter((obj: any) => reducedIds.indexOf(obj[key]) === -1);
  }
}
