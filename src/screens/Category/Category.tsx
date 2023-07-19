import styles from './Category.module.scss'
import { getAuthData } from 'src/utils/auth.utils'
import { ClientEntity } from '@shared/entities/ClientEntity'
import {
  LandingCarousel,
  MainContentModal,
  ProductCard,
  ScrollView,
} from '@shared/components'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { handleEntityHook } from '@shared/hooks/handleEntityHook'
import { ProductEntity } from '@shared/entities/ProductEntity'
import { useEffect, useState, useMemo, ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import { EndpointsAndEntityStateKeys } from '@shared/enums/endpoints.enum'
import { useContextualRouting } from 'next-use-contextual-routing'
import { DetailView } from '@components/DetailView'
import { deepMatch } from '../../utils/matching.util'

export interface CategoryProps {}
export type ProductPerCategoryType = {
  [N in string]: {
    products: ProductEntity[]
    title: string
  }
}

export const Category = ({}: CategoryProps) => {
  const authClient = getAuthData('all') as ClientEntity
  const router = useRouter()
  const { makeContextualHref, returnHref } = useContextualRouting()
  const [companyName, setCompanyName] = useState<string>()
  const [categoryProducts, setCategoryProducts] = useState<ProductEntity[]>([])
  const [showContextProductDetailModal, setShowContextProductDetailModal] =
    useState<boolean>()
  const {
    data: allCategories,
    get: getProducts,
    [EndpointsAndEntityStateKeys.BY_CATEGORY]: categoryProductsData,
  } = handleEntityHook<ProductEntity>('products')

  useEffect(() => {
    const category = router.query.category as string
    const productId = router.query.productId as string
    if (category) {
      getProducts({
        endpoint: EndpointsAndEntityStateKeys.BY_CATEGORY,
        slug: category,
      })
      setCompanyName(category)
    }

    setShowContextProductDetailModal(!!productId)
  }, [router.query])

  useEffect(() => {
    setCategoryProducts(categoryProductsData?.data || [])
  }, [categoryProductsData?.data])

  const goToProductDetail = (product: ProductEntity) => {
    router.push(
      makeContextualHref({ productId: product._id }),
      `/detail/${product._id}`,
      {
        shallow: true,
      }
    )
  }

  const onSearch = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    const results = deepMatch<ProductEntity>(
      value,
      categoryProductsData?.data || []
    )
    setCategoryProducts([...results])
  }

  return (
    <div className={styles.CategoryWrapper}>
      <MainContentModal show={showContextProductDetailModal}>
        <DetailView returnHref={returnHref}></DetailView>
      </MainContentModal>
      <div className={styles.CategoryContent}>
        <div className={styles.CategorySearchWrapper}>
          <Input
            className={styles.CategoryInputSearch}
            placeholder="Buscar"
            suffix={<SearchOutlined className="site-form-item-icon" />}
            bordered={false}
            onChange={onSearch}
            size="large"
          />
        </div>
        {categoryProducts.length > 0 ? (
          <div className={styles.CategoryContentProducts}>
            <h2 className="mb-xx-l title">
              {categoryProducts[0].category.title}
            </h2>
            <div className={styles.CategoryCardsGrid}>
              {categoryProducts.map((item, i) => (
                <ProductCard
                  key={`product-${i}`}
                  onClick={goToProductDetail}
                  product={item}
                />
              ))}
            </div>
          </div>
        ) : (
          <h2>No hay resultados!</h2>
        )}
      </div>
    </div>
  )
}
