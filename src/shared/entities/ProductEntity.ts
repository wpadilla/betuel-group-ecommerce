import { BaseEntity } from './/BaseEntity'
import { CategoryEntity } from '@shared/entities/CategoryEntity'

export class ProductEntity extends BaseEntity {
  name: string = ''
  price: number = ''
  wholeSale?: string = ''
  cost?: number = ''
  commission?: number = 0
  image: string = ''
  images: string[] = []
  flyerOptions?: string = ''
  GodWord?: string = ''
  productImage?: string = ''
  description: string = ''
  company: string = ''
  stock: number = 0
  productParams: IProductParam[] = []
  category: CategoryEntity = new CategoryEntity()
}

export type ProductParamTypes = 'color' | 'size'
export interface IProductParam {
  _id: string
  quantity?: number
  value?: string
  label?: string
  type: ProductParamTypes
  productId?: string
  isRelated?: boolean
  relatedParams?: IProductParam[]
}
