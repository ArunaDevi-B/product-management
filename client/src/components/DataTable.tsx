import React, { useState, useEffect } from 'react';
import { Table, Modal, Form, Input, Space, Tag, Popconfirm, Button, message } from 'antd';
import type { TableProps } from 'antd';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';
import '../../public/table.css';

interface DataType {
  key: string;
  product_name: string;
  price: number;
  number: number;
  quantity: number;
}

const DataTable: React.FC = () => {
    const [data, setData] = useState<DataType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<DataType | null>(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();

  useEffect(() => {
    fetchData()
  }, []);
  const fetchData = () => {
        // Fetch data from API when component mounts
        axios.get('http://localhost:9000/products')
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          message.error('Error deleting record');
          console.error('Error fetching data:', error);
        });
  }

  const handleAddProduct = () => {
    addForm.validateFields().then(values => {
      axios.post('http://localhost:9000/products', values)
        .then(response => {
          if(response?.data?.message){
            message.error(response?.data?.message);
          }else{
            message.success('Product added successfully');
            addForm.resetFields();
            console.log('Product added successfully:', response.data);
          }
          fetchData();
        })
        .catch(error => {
          message.error('Error adding product');
          console.error('Error adding product:', error);
        });
      setIsAddModalVisible(false);
    });
  };
  
  const handleAddCancel = () => {
    setIsAddModalVisible(false);
    addForm.resetFields();
  };

  const handleEdit = (record: DataType) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (number: number) => {
    axios.delete(`http://localhost:9000/products/${number}`)
    .then(response => {
      console.log('Record deleted successfully:', response.data);
      message.success('Record deleted successfully');
      fetchData();
    })
    .catch(error => {
      message.error('Error deleting record');
      console.error('Error deleting record:', error);
    });
  };


const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Product Name',
    dataIndex: 'product_name',
    key: 'product_name',
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
          onConfirm={() => handleDelete(record.number)}
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
        axios.put(`http://localhost:9000/products/${values.number}`, values)
        .then(response => {
          message.success('Product updated successfully');
          console.log('Product updated successfully:', response.data);
          fetchData(); // Fetch updated data after successful update
        })
        .catch(error => {
          message.error('Error updating data');
          console.error('Error updating data:', error);
        });
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

    const positiveNumberRule = {
      validator: (_: any, value: number) => {
        if (value <= 0) {
          return Promise.reject(new Error('Value cannot be less than zero'));
        }
        return Promise.resolve();
      },
    };

  return (
  <div className="data-table-container">
    <div className="data-table-title">Available Products<Button type="primary" onClick={() => setIsAddModalVisible(true)} style={{ float: 'right', backgroundColor: '#fafafa', borderColor: 'black', color: 'black' }}>
         + Add New
        </Button></div>
    <Table
      columns={columns}
      dataSource={data}
      scroll={{ x: '100%' }}
      pagination={{ pageSize: 7 }}
    />
     <Modal
        title="Edit Product"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="product_name" label="Product Name" rules={[{ required: true, message: 'Please enter the Product name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter the Price' }, positiveNumberRule]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="number" label="Product Number" rules={[{ required: true, message: 'Please enter the product number' }, positiveNumberRule]}>
            <Input disabled  type="number"/>
          </Form.Item>
          <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: 'Please enter the quantity' }, positiveNumberRule]}>
            <Input  type="number"/>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Add New Product"
        visible={isAddModalVisible}
        onOk={handleAddProduct}
        onCancel={handleAddCancel}
      >
        <Form form={addForm} layout="vertical">
          <Form.Item name="product_name" label="Product Name" rules={[{ required: true, message: 'Please enter the Product name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter the price' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="number" label="Product Number" rules={[{ required: true, message: 'Please enter the product number' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: 'Please enter the quantity' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
  </div>
)};

export default DataTable;
