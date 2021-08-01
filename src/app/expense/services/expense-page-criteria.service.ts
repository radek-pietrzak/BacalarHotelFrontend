import {Injectable} from '@angular/core';
import {Page} from '../../model/page';

@Injectable({
  providedIn: 'root'
})
export class ExpensePageCriteriaService {

  constructor() {
  }

  private pageCriteria: Page = {
    number: 0,
    size: 10
  };

  get page(): Page {
    return this.pageCriteria;
  }

  previousPage(): void {
    if (this.pageCriteria.number > 0) {
      this.pageCriteria.number = this.pageCriteria.number - 1;
    }
  }

  nextPage(): void {
    this.pageCriteria.number = this.pageCriteria.number + 1;
  }

  setPageSize10(): void {
    this.pageCriteria.size = 10;
    this.pageCriteria.number = 0;
  }

  setPageSize20(): void {
    this.pageCriteria.size = 20;
    this.pageCriteria.number = 0;
  }

  setPageSize50(): void {
    this.pageCriteria.size = 50;
    this.pageCriteria.number = 0;
  }

  getPageNumber(): number {
    return this.pageCriteria.number + 1;
  }

}
