import { Controller, Get, Inject, Query, App } from '@midwayjs/decorator';
import { Application, Context } from '@midwayjs/koa';
import { UserService } from '../services/UserService';

@Controller('/')
export class UserController {
  @App()
  app: Application;

  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/insertUser')
  async insertUser(@Query('name') name: string) {
    try {
      await this.userService.insertUser([{ name }]);
    } catch(err) {
      return { data: false, message: err.message };
    }

    return { data: true, message: '插入成功' };
  }
  @Get('/viewTest')
  async renderReviewPage() {
    await this.ctx.render('view.ejs');
  }
}
