import { Image, List, Space } from 'antd';
import React, { FC } from 'react';
import Title from 'antd/lib/typography/Title';
import { ISale } from '@shared/entities/OrderEntity';
import { ProductEntity } from '@shared/entities/ProductEntity';
import styles from './ShoppingCart.module.scss';

export interface IShoppingCartAction {
  key: string;
  icon: any;
  text: string;
  onClick: (product: ProductEntity) => void;
}
export interface IShoppingCartProps {
  itemActions: IShoppingCartAction[];
  // eslint-disable-next-line react/require-default-props
  submitButtonLabel?: string;
  // eslint-disable-next-line react/require-default-props
  sales?: ISale[];
}

const IconText: FC<IShoppingCartAction> = ({
  icon,
  text,
  onClick,
  key,
}: any) => (
  <Space
    key={`${key}-${Math.random()}`}
    className={styles.ShoppingCartListItemAction}
    onClick={onClick}
  >
    {React.createElement(icon)}
    {text}
  </Space>
);

export function ShoppingCart({ itemActions, sales }: IShoppingCartProps) {
  return (
    <List
      className={styles.ShoppingCartList}
      itemLayout="vertical"
      size="large"
      locale={{
        emptyText: 'No hay productos en el carrito',
      }}
      dataSource={sales}
      renderItem={(sale, i) => (
        <List.Item
          className={styles.ShoppingCartListItem}
          key={`sale-${i}`}
          actions={itemActions.map((action) => (
            <IconText
              {...action}
              key={`action-${i}`}
              onClick={() => action.onClick && action.onClick(sale.product)}
            />
          ))}
          extra={<Image width={100} alt={sale.product.slug} src={sale.product.image} />}
        >
          <List.Item.Meta
            title={sale.product.name}
            description={`Cantidad: ${sale.quantity}`}
          />
          <Title level={3}>
            RD$
            {sale.product.price.toLocaleString()}
          </Title>
        </List.Item>
      )}
    />
  );
}
