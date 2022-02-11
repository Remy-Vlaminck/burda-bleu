import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RegionService } from '../../services/region/region.service';
import { RegionI } from '../../interfaces';
import { UserInfo } from 'src/app/models/user-info/user-info.model';
import { UserInfoService } from 'src/app/services/user-info/user-info.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  private regionSubscription!: Subscription; // initialized in initRegionList()
  regionList: RegionI[] = [];
  appForm!: FormGroup;  // initialized in initForm()
  isAdded!: boolean; // initialized in ngOnInit()

  constructor(private regionService: RegionService, private userInfoService: UserInfoService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.initRegionList();
    this.isAdded = false;
  }

  private initForm(): void {
    const regexDigitsOnly = '^[0-9]\\d*$';
    this.appForm = new FormGroup({
      lastName: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      telephone: new FormControl(null, [
        Validators.required, Validators.minLength(10), Validators.pattern(regexDigitsOnly)
      ]),
      region: new FormControl(null, Validators.required)
    });
  }

  private initRegionList(): void {
    this.regionSubscription = this.regionService.getRegionListFromApi().subscribe(data => {
      this.regionList = data;
    });;
  }

  onSubmit(): void {
    const formValue = this.appForm.value;
    const newUserInfo: UserInfo = new UserInfo(
      formValue['lastName'],
      formValue['firstName'],
      formValue['telephone'],
      formValue['region']
    );
    this.isAdded = this.userInfoService.addUserInfo(newUserInfo);
  }

  ngOnDestroy() {
    this.regionSubscription.unsubscribe();
  }

}
