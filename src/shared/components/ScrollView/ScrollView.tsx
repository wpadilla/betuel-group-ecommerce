import styles from './ScrollView.module.scss'
import { useEffect, useRef } from 'react'
import { PostEntity } from '@shared/entities/PostEntity'
import { Image } from 'antd'

export interface IScrollViewProps {
  products?: PostEntity[]
  title: string
}

export const ScrollView = ({ products, title }: IScrollViewProps) => {
  const preview = (back?: boolean) => () => {
    const scrollView = scrollViewRef.current as HTMLDivElement
    const progress = 200

    if (scrollView) {
      scrollView.scrollTo({
        left: back
          ? scrollView.scrollLeft - progress
          : scrollView.scrollLeft + progress,
        behavior: 'smooth',
      })
    }
  }

  const scrollViewRef = useRef({} as any)

  return (
    <div className={styles.ScrollViewContainer}>
      <span className="subtitle">{title}</span>
      <div className={styles.ScrollViewWrapper}>
        <i
          className={`bi bi-chevron-left ${styles.ScrollViewLeftArrow}`}
          onClick={preview(true)}
        />
        <div className={styles.ScrollView} ref={scrollViewRef}>
          {(products || []).map((item, i) => (
            <div className={styles.ScrollViewItem} key={i}>
              <Image
                preview={false}
                className={styles.ScrollViewItemImage}
                src={item.images[0]}
              />
            </div>
          ))}
        </div>
        <i
          className={`bi bi-chevron-right ${styles.ScrollViewRightArrow}`}
          onClick={preview(false)}
        />
      </div>
    </div>
  )
}
