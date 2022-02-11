import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserInfoService } from 'src/app/services/user-info/user-info.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchForm!: FormGroup; // initialized in initForm()
  isFilterActive!: boolean; // initialized in ngOnInit()

  constructor(private userInfoService: UserInfoService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.isFilterActive = false;
  }

  private initForm(): void {
    this.searchForm = new FormGroup({
      'list-search': new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    const formValue = this.searchForm.value;
    this.userInfoService.searchWord(formValue['list-search']);
    this.isFilterActive = true;
  }

  onWithoutFilter() {
    this.userInfoService.withoutFilter();
    this.isFilterActive = false;
  }

}
