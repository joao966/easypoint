import {
  Injectable,
  Logger,
  MethodNotAllowedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Role } from '../model/role.entity';


@Injectable()
export class RoleService {
  private readonly logger = new Logger(RoleService.name);

  private defaultPermissions = [
    {
      name: 'usuario',
      label: 'Usuários',
      actions: [
        { label: 'Visualizar', action: 'ver', permitted: false },
        { label: 'Criar', action: 'criar', permitted: false },
        { label: 'Editar', action: 'editar', permitted: false },
        { label: 'Remover', action: 'excluir', permitted: false },
      ],
      isActive: false,
    },
    {
      name: 'perfil',
      label: 'Gestão de Perfis',
      actions: [
        { label: 'Visualizar', action: 'ver', permitted: false },
        { label: 'Criar', action: 'criar', permitted: false },
        { label: 'Editar', action: 'editar', permitted: false },
        { label: 'Remover', action: 'excluir', permitted: false },
      ],
      isActive: false,
    },
  ];

  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) { }

  async create(name: string, permission: any, description: string, isActive: boolean) {
    const nRole = { name, permission, description, isActive };
    const role = await this.roleRepository.save(nRole);

    return role;
  }

  async permissions() {
    return this.defaultPermissions;
  }

  async findPermissions(id: string) {
    const role = await this.roleRepository.findOne(id);
    // const permissions = await this.convertPermissions(
    //   await this.permissions(),
    //   role.permission,
    // );
    // return permissions;
  }

  findAll(options?: any): Promise<Role[]> {
    return this.roleRepository.find(options);
  }

  findOne(id: string): Promise<Role> {
    return this.roleRepository.findOne(id);
  }

  async delete(id: string): Promise<any> {
    const role = await this.findOne(id);

    if (role.isDefault)
      throw new MethodNotAllowedException('Esse perfil não pode ser excluido!');

    return this.roleRepository.delete(id);
  }

  async getList(options?: any, currentUser?: any): Promise<Role[]> {
    const { userType, partnerId } = options;

    const query = this.roleRepository
      .createQueryBuilder()
      .select('role')
      .from(Role, 'role');

    if (userType) {
      query.orWhere(
        new Brackets((qb) => {
          qb.where('role.type = :type AND role.isDefault = :isDefault', {
            type: userType,
            isDefault: true,
          });
        }),
      );
    }

    if (!options?.includeInactive) {
      query.andWhere('role.isActive = :isActive', { isActive: true });
    }

    return await query.getMany();
  }

  async update(
    id: string,
    modifications: { permission?: Record<string, string>; isActive?: boolean },
  ) {
    const { permission, isActive } = modifications;
    const serializedModifications = {};

    permission !== undefined &&
      (serializedModifications['permission'] = permission);
    isActive !== undefined && (serializedModifications['isActive'] = isActive);

    return await this.roleRepository.update(id, serializedModifications);
  }

  async convertPermissions(defaultList, currentList) {
    if (Object.keys(currentList).length == 0) {
      return await this.permissions();
    }
    const permissions = [];
    defaultList.forEach((permission) => {
      const actions = [];
      permission.actions.forEach((action) => {
        const permitted = currentList.filter((element) => {
          return (
            permission.name === element.name &&
            element.actions.includes(action.action) &&
            element.isActive
          );
        });
        if (permitted.length > 0) {
          actions.push({
            label: action.label,
            action: action.action,
            permitted: true,
          });
        } else {
          actions.push(action);
        }
      });

      if (actions.length > 0) {
        permissions.push({
          name: permission.name,
          label: permission.label,
          actions: actions,
          isActive: true,
        });
      } else {
        permissions.push(permission);
      }
    });
    return permissions;
  }
}
