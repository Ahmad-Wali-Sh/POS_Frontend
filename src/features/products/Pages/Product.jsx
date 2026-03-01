import { Tabs } from 'antd'
import { useEffect, useState } from 'react'
import ProductTable from '../components/ProductTable'
import ProductForm from '../components/ProductForm'
import axios from 'axios'
import API from '../../shared/utils/apiConfig'

function Product() {
    
    const [tabState, setTabState] = useState('list')
    const [editProduct, setEditProduct] = useState({})
    const [products, setProducts] = useState([])

    const getProducts = () => {
        axios
            .get(API.products)
            .then((res) => {
                setProducts(res.data)
            })
    }

    useEffect(() => {
        getProducts()
    }, [])

    const tabChange = (tab) => {
        setTabState(tab)
        getProducts()
    }
    const items = [
        {
            key: 'list',
            label: 'List',
            children: <ProductTable products={products}  setEditProduct={setEditProduct} tabChange={tabChange} />
        }, 
        {
            key: 'new',
            label: 'New',
            children: <ProductForm get={getProducts} tabState={tabState} editProduct={editProduct} setEditProduct={setEditProduct} tabChange={tabChange}/>
        } ,
        {
            key: 'edit',
            label: 'Edit',
            children:<ProductForm get={getProducts} tabState={tabState} editProduct={editProduct} setEditProduct={setEditProduct} tabChange={tabChange} />,
            disabled: true
        }
    ]


  return (
    <main className='h-full bg-rose-50 p-4'>
    <h1 className='text-2xl text-slate-900'>Products</h1>
    <Tabs type='card' color='primary' activeKey={tabState} onTabClick={(tab) => {
        setTabState(tab)
    }} items={items} />
    </main>
  )
}

export default Product