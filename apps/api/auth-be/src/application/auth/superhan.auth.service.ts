import { Injectable } from '@nestjs/common';
import { SuperhanUserService } from 'src/domain/superhan/superhan.user.service';
import { AuthInterface } from './auth.interface';

@Injectable()
export class SuperhanAuthService implements AuthInterface {
  constructor(private userService: SuperhanUserService) {}

  async validateUser(
    username: string,
    password: string,
    projectName: string
  ): Promise<any> {
    // password encrypt되어있는 것을 비교하는 로직

    // project 확인

    // 사용자 확인

    // 위 3가지를 하나의 쿼리로 묶어 비교할 수 있다.
    const user = await this.userService.findOne(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // async registerUser(username: string, password: string, projectName: string) {
  //   // 사용자가 등록될 때 salt와 암호화된 password가 등록된다.
  //   const { salt, hash } = hashPassword(password);
  // }

  // async registerProject(projectName: string) {
  //   // 사용자가 등록될 때 salt와 암호화된 password가 등록된다.
  // }
}
