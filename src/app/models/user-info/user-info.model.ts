import { RegionI } from '../../interfaces';

export class UserInfo {

	constructor(public lastName: string,
              public firstName: string,
              public telephone: string,
              public region: RegionI) {
		//
	}
}