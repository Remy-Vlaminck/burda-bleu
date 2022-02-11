import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserInfo } from 'src/app/models/user-info/user-info.model';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  private list: UserInfo[];
  private withoutFilterList: UserInfo[];
  userInfoSubject: Subject<UserInfo[]>;

  constructor() {
    this.list = [];
    this.withoutFilterList = [];
    this.userInfoSubject = new Subject<UserInfo[]>();
  }

  emitList(): void {
    this.userInfoSubject.next(this.list.slice());
    localStorage.setItem('userInfoList', JSON.stringify(this.withoutFilterList.length ? this.withoutFilterList : this.list));
  }

  getLocalStorageUserInfo() {
    const localList = localStorage.getItem('userInfoList');
    this.list = localList ? JSON.parse(localList) : this.list;
    this.emitList();
  }

  addUserInfo(userInfo: UserInfo): boolean {
    if (this.validUserInfo(userInfo)) {
      this.list.push(userInfo);
      this.withoutFilterList.length && this.withoutFilterList.push(userInfo);
      this.emitList();
      return true;
    }
    return false;
  }

  private validUserInfo(userInfo: UserInfo): boolean {
    let isValid = true;
    for (const userInfoOfList of this.list) {
      if ((userInfoOfList.lastName === userInfo.lastName && userInfoOfList.firstName === userInfo.firstName) || userInfoOfList.telephone === userInfo.telephone) {
        isValid = false;
        break;
      }
    }
    return isValid;
  }

  removeUserInfo(userInfoIndex: number): void {
    this.list.splice(userInfoIndex, 1);
    this.withoutFilterList.length && this.withoutFilterList.splice(userInfoIndex, 1);
    this.emitList();
  }

  searchWord(word: string): void {
    this.withoutFilterList = this.list;
    this.list = this.list.filter((userInfo) => {
      const userInfoValues = Object.values(userInfo);
      const wordIndex = userInfoValues.indexOf(word);
      return wordIndex > -1;
    })
    this.emitList();
  }

  withoutFilter(): void {
    this.list = this.withoutFilterList;
    this.withoutFilterList = [];
    this.emitList();
  }
}
