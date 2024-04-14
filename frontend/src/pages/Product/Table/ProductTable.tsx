import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { Button, Modal, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import ProductServices from '../Service';
import { EditOutlined, DeleteOutlined, InfoOutlined, WarningOutlined } from '@ant-design/icons';
import AddProduct from '../AddProduct';
import FormInput from '@/shared/Form/FormInput';
import { categoriesOpts, typeOfProductOpts } from '../product.const';


export interface DataTypeProduct {
  id: number | string;
  product_name: string;
  category: string;
  type_of_product: number;
  price: string;
}


const ProductTable: React.FC = () => {

  const [data, setData] = useState<DataTypeProduct[]>([])
  const [productAction, setProductAction] = useState<DataTypeProduct | null>(null)
  const [typeModelOpen, setTypeModelOpen] = useState<string>('')
  const typingTimeOutRef = useRef<any>(null);
  const [valueSearch, setValueSearch] = useState('')

  const columns: TableProps<DataTypeProduct>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'product_name',
      key: 'product_name',
      render: (product_name, record) => <a>{`${product_name} - [${record?.id}]`}</a>,
    },
    {
      title: 'Category',
      dataIndex: 'category_id',
      key: 'category_id',
      render: (category_id) => {
        const category: any = categoriesOpts.find((item) => category_id === item?.value)
        return (
          <a>{category?.label}</a>
        )
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Type Product',
      dataIndex: 'type_of_product',
      key: 'type_of_product',
      render: (type_of_product) => {
        const typeOfProduct: any = typeOfProductOpts.find((item) => type_of_product === item?.value)
        return (
          <a>{typeOfProduct?.label}</a>
        )
      },
    },

    {
      title: 'Action',
      key: 'action',
      align: 'end',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleClickAction("infor", record)} style={{ backgroundColor: "blue" }} type="primary" icon={<InfoOutlined />} size={'large'} />
          <Button onClick={() => handleClickAction("edit", record)} style={{ backgroundColor: "orange" }} type="primary" icon={<EditOutlined />} size={'large'} />
          <Button onClick={() => handleClickAction('delete', record)} style={{ backgroundColor: "red" }} type="primary" icon={<DeleteOutlined />} size={'large'} />
        </Space>
      ),
    },
  ];

  const fetchDataProductList = useCallback(async (query?: any) => {

    try {

      const res: any = await ProductServices.getProductList(query)

      if (res?.statusCode === 200) {

        const { productLists = [] } = res?.data
        setTypeModelOpen("")
        setData(productLists)

      }

    } catch (error) {

    }
  }, [])

  useEffect(() => {

    fetchDataProductList()

  }, [])

  const handleClickAction = (type: string, record?: DataTypeProduct) => {

    if (record) {
      setProductAction(record)
    }
    setTypeModelOpen(type)
  }


  const handleDeleteProduct = async () => {

    try {

      const res = await ProductServices.delProduct(productAction?.id)

      const { affected = 0 } = res?.data
      if (affected) {

        fetchDataProductList()

      }

    } catch (error) {

    }
  }

  const SearchProduct = (value) => {


    setValueSearch(value)

    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    };
    typingTimeOutRef.current = setTimeout(() => {

      const newQuery = { product_name: value }
      fetchDataProductList(newQuery)

    }, 500);

  }

  return (

    <Fragment>

      <div className='h-[100px] mb-[16px] flex items-center'>

        <FormInput placeholder="Search" className='w-[400px]' onChange={({ target: { value } }) => SearchProduct(value)} value={valueSearch} />

        <div className='w-full flex justify-end'>
          <Button onClick={() => handleClickAction('add')} style={{ backgroundColor: "green", color: "white" }} type="default" icon={<InfoOutlined />} size={'large'}>Add new Product</Button>
        </div>

      </div>
      <Table columns={columns} dataSource={data} pagination={false} rowKey={row => row.id} />

      <Modal title="" open={typeModelOpen === 'infor'} width={700} footer={false} onCancel={() => setTypeModelOpen('')}>
        <AddProduct productId={productAction?.id} onCancle={() => setTypeModelOpen("")} isEdit={false} />
      </Modal>

      <Modal title="" open={typeModelOpen === 'add'} width={700} footer={false} onCancel={() => setTypeModelOpen('')}>
        <AddProduct onCancle={() => setTypeModelOpen("")} isEdit={true} onReload={() => fetchDataProductList()} />
      </Modal>

      <Modal title="" open={typeModelOpen === 'edit'} width={700} footer={false} onCancel={() => setTypeModelOpen('')}>
        <AddProduct productId={productAction?.id} onCancle={() => setTypeModelOpen("")} isEdit={true} onReload={() => fetchDataProductList()} />
      </Modal>

      <Modal title="" open={typeModelOpen === 'delete'} footer={false} onCancel={() => setTypeModelOpen('')}>

        <div className='h-[200px] w-[100%] flex justify-center' >
          <div className='flex items-center justify-center flex-col '>
            <WarningOutlined style={{ fontSize: 40, color: "red" }} />
            <span className='mt-[10px] font-bold text-[25px]'> Xác nhận</span>
            <span className='font-semibold text-[15px]'>Sản phẩm của bạn sẽ bị xoá và những dữ liệu liên quan sẽ bị mất.</span>
          </div>
        </div>

        <div className='flex justify-end'>
          <Space size="middle">

            <Button onClick={() => setTypeModelOpen("")} style={{ backgroundColor: "orange" }} type="primary" size={'large'} > Huỷ</Button>
            <Button onClick={handleDeleteProduct} style={{ backgroundColor: "white" }} type="dashed" icon={<InfoOutlined />} size={'large'} danger>Xác nhận</Button>

          </Space>
        </div>

      </Modal>

    </Fragment>
  )

};

export default ProductTable;