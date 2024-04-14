import {
    VideoCameraOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'

const MenuLayout = () => {
    return (
        <Menu

            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100vh' }}
            items={[
                {
                    key: '1',
                    icon: <VideoCameraOutlined />,
                    label: 'Product',
                },
                
            ]}
        />
    )
}

export default MenuLayout