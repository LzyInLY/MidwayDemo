import { Provide, Scope, ScopeEnum, Inject, TaskLocal, FORMAT, App } from '@midwayjs/decorator';
import { ILogger } from '@midwayjs/logger';
import { HttpService } from '@midwayjs/axios';
import { Application } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';

import * as moment from 'moment';
import { IUser, User } from '../entities/User';

@Provide()
@Scope(ScopeEnum.Request, { allowDowngrade: true })
export class UserService {
  @InjectEntityModel(User)
  userRepository: Repository<User>;

  @Inject()
  httpService: HttpService;

  @App()
  app: Application;

  @Inject()
  logger: ILogger;

  /**
   * 添加用户信息
   * @param user
   */
  async insertUser(user: IUser[]): Promise<void> {
    await this.userRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(user)
        .orUpdate(['name'], ['phone'])
        .updateEntity(false)
        .execute();
  }


  /**
   * 定时任务
   */
  @TaskLocal(FORMAT.CRONTAB.EVERY_DAY_ONE_FIFTEEN)
  async taskTest(){
    const lastTaskTime = this.app.getAttr('lastTaskTime')
    // 增量数据
    if (lastTaskTime) {
      const startTime = moment(lastTaskTime).format('YYYY-MM-DD');
      await Promise.resolve(startTime);
    } else {
      await Promise.resolve();
    }
    this.app.setAttr('lastTaskTime', Date.now());
  }
}
