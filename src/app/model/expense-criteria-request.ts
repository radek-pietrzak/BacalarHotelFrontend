import {Page} from './page';
import {SearchSortCriterion} from './search-sort-criterion';
import {SearchSpecCriterion} from './search-spec-criterion';

export class ExpenseCriteriaRequest {
  page: Page;
  searchSortCriteria: SearchSortCriterion [];
  searchSpecCriteria: SearchSpecCriterion [];

}
