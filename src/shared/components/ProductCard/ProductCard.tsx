// import { Badge, Button, Card } from 'antd';
// import { ProductEntity } from '@shared/entities/ProductEntity';
// import { ProductsConstants } from '@shared/constants/products.constants';
// import { useCallback, useMemo } from 'react';
// import { useAppStore } from '@services/store';
// import { useOrderContext } from '@shared/contexts/OrderContext';
// import Image from 'next/image';
// import Link from 'next/link';
// import { WhatsAppOutlined } from '@ant-design/icons';
// import styles from './ProductCard.module.scss';
// import { getSaleDataFromProduct } from '../../../utils/objects.utils';
// import { contactUsByWhatsappLink } from '../../../utils/url.utils';
// import { orderMessageTexts } from '../../../utils/constants/order.constant';
// // import { contactUsByWhatsappLink } from '../../../utils/url.utils';
// // import { orderMessageTexts } from '../../../utils/constants/order.constant';
//
// export interface IProductProps {
//   product: ProductEntity;
//   onClick?: (post: ProductEntity) => void;
// }
//
// export function ProductCard({ product, onClick }: IProductProps) {
//   const order = useAppStore((state) => state.currentOrder);
//   const img = product && product.images ? product.images[0] : '';
//   const isAlmostSoldOut = product.stock <= ProductsConstants.ALMOST_SOLD_OUT_QUANTITY
//     && product.stock > 0;
//   const { orderService, toggleCart } = useOrderContext();
//   const handleProductAction = (ev: any) => {
//     ev.preventDefault();
//     ev.stopPropagation();
//     if (isOnCart) {
//       toggleCart();
//     } else if (!product.productParams.length) {
//       orderService.handleLocalOrderSales({
//         ...getSaleDataFromProduct(product),
//         quantity: 1,
//       });
//       toggleCart();
//     } else if (product.productParams.length) {
//       onClick && onClick(product);
//     }
//   };
//
//   const ribbonText = useMemo(() => {
//     if (product.newArrival) {
//       return ProductsConstants.NEW_ITEM;
//     }
//     if (isAlmostSoldOut) {
//       return ProductsConstants.ALMOST_SOLD_OUT;
//     }
//     if (!product.stock || product.stock === 0) {
//       return ProductsConstants.SOLD_OUT;
//     }
//     return '';
//   }, [product.stock]);
//
//   const isOnCart = useMemo(
//     () => order?.sales.some((sale) => sale.product?._id === product?._id),
//     [order?.sales],
//   );
//
//   const handleClick = (event: any) => {
//     if (event.ctrlKey || event.metaKey) return;
//     event.stopPropagation();
//     event.preventDefault();
//     onClick && onClick(product);
//   };
//
//   const getWhatsappLink = useCallback(
//     (p: ProductEntity) => contactUsByWhatsappLink(orderMessageTexts.orderItemByWhatsapp(p)),
//     [],
//   );
//
//   return (
//     <Badge.Ribbon
//       text={ribbonText}
//       style={{ display: ribbonText ? 'block' : 'none' }}
//       color={product.newArrival ? 'green' : isAlmostSoldOut ? 'gold' : 'red'}
//     >
//       <Link href={`/${product.company}/products/${product.slug}`}>
//         <a>
//           <Card
//             className={styles.ProductCard}
//             bodyStyle={{ padding: '10px 0' }}
//             cover={(
//               <Image
//                 src={img}
//                 className={styles.ProductImage}
//                 width="250px"
//                 height="250px"
//                 alt={product.slug}
//                 priority
//               />
//             )}
//             onClick={handleClick}
//           >
//             <div className={styles.ProductCardContent}>
//               <div className={styles.ProductCardContentHeader}>
//                 <span className={styles.ProductTitle}>{product.name}</span>
//                 <span className={styles.ProductPrice}>
//                   RD$
//                   {' '}
//                   {product.price.toLocaleString()}
//                 </span>
//               </div>
//               <div>
//                 {isAlmostSoldOut && (
//                   <span
//                     className={`text-red ${!isAlmostSoldOut ? 'v-hidden' : ''}`}
//                   >
//                     Solo quedan:
//                     {' '}
//                     {product.stock || 0}
//                   </span>
//                 )}
//               </div>
//               {/* {product.stock ? ( */}
//               <Button
//                 className={`mt-s ${product.stock ? '' : 'v-hidden'}`}
//                 onClick={handleProductAction}
//               >
//                 {isOnCart
//                   ? ProductsConstants.VIEW_CART
//                   : ProductsConstants.ADD_CART}
//               </Button>
//               {/* ) : null} */}
//               { !order?.sales?.length
//                 && (
//                 <Link href={getWhatsappLink(product)}>
//                   <a target="_blank" rel="noopener noreferrer">
//                     <Button
//                       type="primary"
//                       className="mt-s w-100"
//                       icon={<WhatsAppOutlined rev="" />}
//                       onClick={(ev) => ev.stopPropagation()}
//                     >
//                       {ProductsConstants.ORDER_BY_WHATSAPP}
//                     </Button>
//                   </a>
//                 </Link>
//                 )}
//             </div>
//           </Card>
//         </a>
//       </Link>
//     </Badge.Ribbon>
//   );
// }

import { Badge, Button, Card } from 'antd';
import { ProductEntity } from '@shared/entities/ProductEntity';
import { ProductsConstants } from '@shared/constants/products.constants';
import { useCallback, useMemo } from 'react';
import { useAppStore } from '@services/store';
import { useOrderContext } from '@shared/contexts/OrderContext';
import Image from 'next/image';
import Link from 'next/link';
import { WhatsAppOutlined } from '@ant-design/icons';
import styles from './ProductCard.module.scss';
import { getSaleDataFromProduct } from '../../../utils/objects.utils';
import { contactUsByWhatsappLink } from '../../../utils/url.utils';
import { orderMessageTexts } from '../../../utils/constants/order.constant';

export interface IProductProps {
  product: ProductEntity;
  onClick?: (post: ProductEntity) => void;
}

export function ProductCard({ product, onClick }: IProductProps) {
  const order = useAppStore((state) => state.currentOrder);
  const img = product?.images?.[0] || '';
  const isAlmostSoldOut = product.stock <= ProductsConstants.ALMOST_SOLD_OUT_QUANTITY
    && product.stock > 0;
  const { orderService, toggleCart } = useOrderContext();

  const isOnCart = useMemo(
    () => order?.sales.some((sale) => sale.product?._id === product?._id),
    [order, product],
  );

  const handleProductAction = useCallback(
    (ev: any) => {
      ev.preventDefault();
      ev.stopPropagation();
      if (isOnCart) {
        toggleCart();
      } else if (!product.productParams.length) {
        orderService.handleLocalOrderSales({
          ...getSaleDataFromProduct(product),
          quantity: 1,
        });
        toggleCart();
      } else if (product.productParams.length) {
        onClick && onClick(product);
      }
    },
    [isOnCart, onClick, orderService, product, toggleCart],
  );

  const ribbonText = useMemo(() => {
    if (product.newArrival) {
      return ProductsConstants.NEW_ITEM;
    }
    if (isAlmostSoldOut) {
      return `Solo quedan ${product.stock || 0}`;
    }
    if (!product.stock) {
      return ProductsConstants.SOLD_OUT;
    }
    return '';
  }, [product]);

  const handleClick = useCallback(
    (event: any) => {
      if (event.ctrlKey || event.metaKey) return;
      event.stopPropagation();
      event.preventDefault();
      onClick && onClick(product);
    },
    [onClick, product],
  );

  const getWhatsappLink = useCallback(
    (p: ProductEntity) => contactUsByWhatsappLink(orderMessageTexts.orderItemByWhatsapp(p)),
    [],
  );

  return (
    <Badge.Ribbon
      text={ribbonText}
      style={{ display: ribbonText ? 'block' : 'none' }}
      color={product.newArrival ? 'green' : isAlmostSoldOut ? 'gold' : 'red'}
    >
      <Link href={`/${product.company}/products/${product.slug}`}>
        {/* <a> */}
        <Card
          className={styles.ProductCard}
          bodyStyle={{ padding: '10px 0' }}
          onClick={handleClick}
        >
          <Image
            src={img}
            className={styles.ProductImage}
            width={225}
            height={225}
            alt={product.slug}
            loading="lazy"
          />
          <div className={styles.ProductCardContent}>
            <div className={styles.ProductCardContentHeader}>
              <span className={styles.ProductTitle}>{product.name}</span>
              <span className={styles.ProductPrice}>
                RD$
                {' '}
                {product.price.toLocaleString()}
              </span>
            </div>
            <div>
              {/* {isAlmostSoldOut && ( */}
              {/*  <span */}
              {/*    className={`text-red ${!isAlmostSoldOut ? 'v-hidden' : ''}`} */}
              {/*  > */}
              {/*   */}
              {/*  </span> */}
              {/* )} */}
            </div>
            <Button
              className={`mt-s ${product.stock ? '' : 'v-hidden'}`}
              onClick={handleProductAction}
            >
              {isOnCart
                ? ProductsConstants.VIEW_CART
                : ProductsConstants.ADD_CART}
            </Button>
            {!order?.sales?.length && (
              <Link href={getWhatsappLink(product)}>
                <a target="_blank" rel="noopener noreferrer">
                  <Button
                    type="primary"
                    className="mt-s w-100"
                    icon={<WhatsAppOutlined rev="" />}
                    onClick={(ev) => ev.stopPropagation()}
                  >
                    {ProductsConstants.ORDER_BY_WHATSAPP}
                  </Button>
                </a>
              </Link>
            )}
          </div>
        </Card>
        {/* </a> */}
      </Link>
    </Badge.Ribbon>
  );
}
