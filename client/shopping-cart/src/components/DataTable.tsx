import React, { useState } from 'react';
import { Table, Modal, Form, Input, Space, Tag, Popconfirm, Button } from 'antd';
import type { TableProps } from 'antd';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import '../../public/table.css';

interface DataType {
  key: string;
  product_name: string;
  price: number;
  number: number;
  quantity: number;
}

const initialData: DataType[] = [
  {
    key: '1',
    product_name: 'Laptop',
    price: 32,
    number: 601,
    quantity: 0,
  },
  {
    key: '2',
    product_name: 'Desktop',
    price: 42,
    number: 602,
    quantity: 4,
  },
  {
    key: '3',
    product_name: 'Mac',
    price: 32,
    number: 603,
    quantity: 10,
  },
  {
    key: '4',
    product_name: 'Laptop',
    price: 32,
    number: 601,
    quantity: 0,
  },
  {
    key: '5',
    product_name: 'Desktop',
    price: 0,
    number: 602,
    quantity: 4,
  },
  {
    key: '6',
    product_name: 'Mac',
    price: 32,
    number: 603,
    quantity: 10,
  },
];


const DataTable: React.FC = () => {
    const [data, setData] = useState<DataType[]>(initialData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<DataType | null>(null);
  const [form] = Form.useForm();

  
  const handleEdit = (record: DataType) => {
    console.log(record,'record');
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (key: string) => {
    setData(data.filter(item => item.key !== key));
  };


const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Product Name',
    dataIndex: 'product_name',
    key: 'product_name',
    // render: (text) => <a>{text}</a>,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Product Number',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: 'Quantity',
    key: 'quantity',
    dataIndex: 'quantity',
    render: (_, { quantity }) => {
      let color = 'green';
      if (quantity == 0) {
        color = 'volcano';
      }
      return (
      <>
            <Tag color={color}>
              {quantity}
            </Tag>
      </>
    )},
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <div onClick={() => handleEdit(record)}><AiOutlineEdit /></div>
        <Popconfirm
          title="Are you sure to delete this record?"
          onConfirm={() => handleDelete(record.key)}
          okText="Yes"
          cancelText="No"
        >
          <div><AiOutlineDelete style={{ color: 'red' }} /></div>
        </Popconfirm>
      </Space>
    ),
  },
];

const handleOk = () => {
      form.validateFields().then(values => {
        setData(data.map(item => (item.key === editingRecord?.key ? { ...item, ...values } : item)));
        setIsModalVisible(false);
        setEditingRecord(null);
        form.resetFields();
      });
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
      setEditingRecord(null);
      form.resetFields();
    };

  return (
  <div className="data-table-container">
    <div className="data-table-title">Available Products</div>
    <Table
      columns={columns}
      dataSource={data}
      scroll={{ x: '100%' }}
      pagination={{ pageSize: 7 }}
    />
     <Modal
        title="Edit Record"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="product_name" label="Product Name" rules={[{ required: true, message: 'Please enter the name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter the age' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="number" label="Product Number" rules={[{ required: true, message: 'Please enter the address' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: 'Please enter the address' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
  </div>
)};

export default DataTable;
