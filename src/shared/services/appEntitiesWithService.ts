import { StoreApi, UseBoundStore } from 'zustand'
import { IEntityStore } from '@services/store/entityStore'
import { PostEntity } from '@shared/entities/PostEntity'
import { BaseEntity } from '@shared/entities/BaseEntity'
import { BaseService } from '@services/BaseService'
import { ProductService } from '@services/productService'
import { UserEntity } from '@shared/entities/UserEntity'
import { UserService } from '@services/userService'
import { AuthUserEntity } from '@shared/entities/AuthEntity'
import { AuthService } from '@services/authService'
import { CategoryEntity } from '@shared/entities/CategoryEntity'
import { CategoryService } from '@services/categoryService'
import { ParamEntity } from '@shared/entities/ParamEntity'
import { ParamService } from '@services/paramService'

export type EntityNamesType =
  | 'posts'
  | 'users'
  | 'auth/login'
  | 'categories'
  | 'filter-params'

export type EntityPerServiceType = {
  [N in EntityNamesType]: {
    entity: BaseEntity | any
    service: BaseService<any>
  }
}

export const appEntitiesWithService: EntityPerServiceType = {
  posts: {
    entity: new PostEntity(),
    service: new ProductService(),
  },
  users: {
    entity: new UserEntity(),
    service: new UserService(),
  },
  'auth/login': {
    entity: new AuthUserEntity(),
    service: new AuthService(),
  },
  categories: {
    entity: new CategoryEntity(),
    service: new CategoryService(),
  },
  'filter-params': {
    entity: new ParamEntity(),
    service: new ParamService(),
  },
}

export type AppEntitiesStoreType = {
  [N in EntityNamesType]: UseBoundStore<
    StoreApi<IEntityStore<typeof appEntitiesWithService[N]['entity']>>
  >
}
