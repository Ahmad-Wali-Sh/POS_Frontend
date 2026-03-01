import { Table } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import API from '../../shared/utils/apiConfig'

function ProductTable({ tabChange, setEditProduct, products }) {

    const [categories, setCategories] = useState()
    useEffect(() => {
        axios.get(API.categories)
            .then((res) => {
                setCategories(res.data)
            })
    }, [])

    const columns = [
        {
            key: 'id',
            dataIndex: 'id',
            title: 'ID'
        },
        {
            key: 'title',
            dataIndex: 'title',
            title: 'Title'
        },
        {
            key: 'price',
            dataIndex: 'price',
            title: 'Price'
        },
        {
            key: 'category_id',
            dataIndex: 'category_id',
            title: 'Category',
            render: (category_id) => {
                let categoryFound = categories?.find((category) => {
                    return category.id == category_id
                })
                return <div className='rounded bg-blue-300 w-fit p-2'>{categoryFound?.name}</div>
            }
        },
        {
            key: 'quantity',
            dataIndex: 'quantity',
            title: 'Quantity',
            render: (quantity) => <h1 className={`rounded p-2 text-white w-fit ${quantity > 50 ? 'bg-green-600' : 'bg-red-600'}`}>{quantity}</h1>
        },
        {
            key: 'image',
            dataIndex: 'image',
            title: 'Image',
            render: (image) => <img src={image} className='w-20 rounded-xl shadow-2xl' />
        },
    ]




    return (
        <Table rowHoverable onRow={(record) => {
            return {
                onClick: () => {
                    tabChange('edit')
                    setEditProduct(record)
                }
            }
        }} columns={columns} dataSource={products} scroll={{ y: 350 }} size='medium' sticky />
    )
}

export default ProductTable