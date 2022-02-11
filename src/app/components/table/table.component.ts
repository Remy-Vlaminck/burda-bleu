import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserInfo } from 'src/app/models/user-info/user-info.model';
import { UserInfoService } from 'src/app/services/user-info/user-info.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  userInfoList: UserInfo[] = [];
  private userInfoSubscription!: Subscription; // initialized in initUserInfoList()
  
  constructor(private userInfoService: UserInfoService) {
  }

  ngOnInit(): void {
    this.initUserInfoList();
  }

  private initUserInfoList(): void {
    this.userInfoSubscription = this.userInfoService.userInfoSubject.subscribe(
      (userInfoList: UserInfo[]) => {
        this.sortUserInfoList(userInfoList);
        this.userInfoList = userInfoList;
      }
    )
    this.userInfoService.getLocalStorageUserInfo();
  }

  private sortUserInfoList(userInfoList: UserInfo[]): UserInfo[] {
      const userInfoListSorted = userInfoList.sort(this.compareLastNames);
      return userInfoListSorted;
  }

  private compareLastNames(a: UserInfo, b: UserInfo): number {
    const compare: number = a.lastName.localeCompare(b.lastName);
    return compare;
  }

  onRemove(userInfoIndex: number): void {
    this.userInfoService.removeUserInfo(userInfoIndex);
  }

  ngOnDestroy(): void {
    this.userInfoSubscription.unsubscribe();
  }

}
