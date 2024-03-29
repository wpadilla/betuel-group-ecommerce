import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
// import dynamic from 'next/dynamic';
import Navbar from '@shared/layout/components/Navbar/Navbar';
import { Topbar } from '@shared/layout/components/Topbar/Topbar';
import styles from './layout.module.scss';
import { layoutId } from '../../utils/layout.utils';

// const DynamicNavbar = dynamic(
// () => import('@shared/layout/components/Navbar/Navbar'), { ssr: false });
export interface IAppLayoutProps {
  children: any
}
function AppLayout({ children }: IAppLayoutProps) {
  return (
    <Layout className={styles.Layout} id={layoutId}>
      <div className={styles.LayoutHeaderWrapper}>
        <Topbar />
        <Navbar />
      </div>
      <Layout>
        <Content className={styles.LayoutContent}>{children}</Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
