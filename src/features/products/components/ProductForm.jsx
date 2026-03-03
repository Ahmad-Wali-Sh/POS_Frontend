import { Button, Form, Input, Popconfirm, Select } from 'antd'
import useProducts from '../../store/products/useProducts'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import axios from 'axios'
import API from '../../shared/utils/apiConfig'

function ProductForm({ tabChange, editProduct, setEditProduct, tabState, get }) {

    const [form] = Form.useForm()

    useEffect(() => {
        if (tabState == 'edit' && editProduct?.id) {
            form.setFieldsValue(editProduct)

        }
    }, [editProduct])

    useEffect(() => {
        if (tabState == 'new') {
            form.setFieldsValue({
                title: '',
                price: '',
                quantity: '',
                category: '',
                image: ''
            })
            setEditProduct({})
        }
    }, [tabState])
    const [categories, setCategories] = useState([])
    useEffect(() => {
        axios.get(API.categories)
            .then((res) => {
                const options = res.data.map((option, index) => {
                    return {
                        value: option.id,
                        label: `${index + 1}.${option.name} - ${option.description}`
                    }
                })
                setCategories(options)
            })
    }, [])
    const deleteProduct = (id) => {
        axios
            .delete(`${API.products}/${id}`)
            .then(() => {
                toast.success('Data Has Been Deleted Succesfully.')
                tabChange('list')
            })
    }
    const updateProduct = (id, data) => {
        axios
            .put(`${API.products}/${id}`, data)
            .then((res) => {
                console.log(res.data)
                toast.info('Data Has been Updated')
                tabChange('list')
            })
            .catch((error) => {
                toast.error('Cruption on Edit... Server Error')
            })
    }

    const addProduct = (data) => {
        axios
            .post(API.products, data)
            .then(() => {
                toast.success('New Data Has Been Submited')
                tabChange('list')
            })
            .catch((err) => {
                console.log(err)
                toast.error(err)
            })
    }
    return (
        <Form
            form={form}
            name='product'
            onFinish={(data) => {
                if (tabState == 'new') {
                    addProduct(data)
                }
                else if (tabState == 'edit') {
                    data.id = editProduct.id
                    updateProduct(editProduct?.id, data)
                }
            }}
        >
            <main>
                <div className='grid grid-cols-3 gap-4 bg-[#5858581a] p-4 rounded-xl'>
                    <Form.Item
                        label='Title'
                        name='title'
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='Price'
                        name='price'
                    >
                        <Input type={'number'} />
                    </Form.Item>
                    <Form.Item
                        label='Category'
                        name='category_id'
                    >
                        <Select showSearch options={categories}>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label='Quantity'
                        name='quantity'
                    >
                        <Input type={'number'} />
                    </Form.Item>
                    <Form.Item
                        label='Image'
                        name='image'
                    >
                        <Input />
                    </Form.Item>
                    {/* <Form.Item
                        label='Image'
                        name='image'
                    >
                        <Input type={'file'}/>
                    </Form.Item> */}
                </div>
                <div className='flex w-full justify-end p-4 gap-4'>
                    {tabState == 'edit' && <Form.Item label={null}>
                        <Popconfirm
                            title='Attention!'
                            description='Are You Sure You Want to Delete This Product?'
                            onConfirm={() => {
                                deleteProduct(editProduct?.id)
                                tabChange('list')
                            }}
                        >
                            <Button type='primary' danger>
                                Delete
                            </Button>
                        </Popconfirm>
                    </Form.Item>}
                    <Form.Item label={null}>
                        <Button variant='outlined' onClick={() => {
                            if (tabState == 'new') {
                                form.setFieldsValue({
                                    title: '',
                                    price: '',
                                    quantity: '',
                                    category_id: '',
                                    image: ''
                                })
                            } else if (tabState == 'edit') {
                                form.setFieldsValue(editProduct)
                            }
                        }}>Reset</Button>
                    </Form.Item>
                    <Form.Item label={null} >
                        <Button type='primary' htmlType='submit'>{tabState == 'new' ? 'Add' : 'Update'}</Button>
                    </Form.Item>
                </div>
            </main>
        </Form >
    )
}

export default ProductForm