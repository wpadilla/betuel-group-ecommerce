import { CategoryEntity } from '@shared/entities/CategoryEntity';
import { BaseEntity } from './BaseEntity';

export class ProductEntity extends BaseEntity {
  name: string = '';

  price: number = 0;

  wholeSale?: string = '';

  cost?: number = 0;

  commission?: number = 0;

  image: string = '';

  images: string[] = [];

  flyerOptions?: string = '';

  GodWord?: string = '';

  productImage?: string = '';

  description: string = '';

  company: string = '';

  stock: number = 0;

  productParams: IProductParam[] = [];

  category: CategoryEntity = new CategoryEntity();
}

export type ProductParamTypes = 'color' | 'size';
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