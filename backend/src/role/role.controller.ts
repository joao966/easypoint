import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../model/role.entity';
import { RoleService } from './role.service';

@Controller()
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get('roles')
  @UseGuards(JwtAuthGuard)
  getList(
    @Query('userType') userType: string,
    @Query('partnerId') partnerId: string,
    @Query('includeInactive') includeInactive: string,
    @Query('companyId') companyId: string,
    @Request() request: any,
  ): Promise<Role[]> {
    return this.roleService.getList(
      { userType, partnerId, includeInactive, companyId },
      request.user,
    );
  }

  @Get('roles/my')
  @UseGuards(JwtAuthGuard)
  getMy(
    @Query('userType') userType: string,
    @Query('partnerId') partnerId: string,
    @Query('companyId') companyId: string,
    @Request() request: any,
  ): Promise<Role[]> {
    return this.roleService.getList(
      { userType, partnerId, active: true, companyId },
      request.user,
    );
  }

  @Get('roles/permissions/default')
  @UseGuards(JwtAuthGuard)
  permissions() {
    return this.roleService.permissions();
  }

  @Get('roles/permissions/selected/:id')
  @UseGuards(JwtAuthGuard)
  findPermissions(@Param('id') id: string) {
    return this.roleService.findPermissions(id);
  }

  @Get('roles/:id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string): Promise<Role> {
    return this.roleService.findOne(id);
  }

  @Post('roles')
  @UseGuards(JwtAuthGuard)
  async create(
    @Body('name') name,
    @Body('permission') permission,
    @Body('description') description,
    @Body('isActive') isActive,
    @Request() request: any,
  ) {
    return await this.roleService.create(
      name,
      permission,
      description,
      isActive,
    );
  }

  @Put('roles')
  @UseGuards(JwtAuthGuard)
  async update(@Body('id') id, @Body('permission') permission) {
    return await this.roleService.update(id, { permission });
  }

  @Put('roles/:id/block')
  @UseGuards(JwtAuthGuard)
  block(@Param('id') id): Promise<any> {
    return this.roleService.update(id, { isActive: false });
  }

  @Put('roles/:id/unblock')
  @UseGuards(JwtAuthGuard)
  unblock(@Param('id') id): Promise<any> {
    return this.roleService.update(id, { isActive: true });
  }

  @Delete('roles/:id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id): Promise<any> {
    return this.roleService.delete(id);
  }
}
