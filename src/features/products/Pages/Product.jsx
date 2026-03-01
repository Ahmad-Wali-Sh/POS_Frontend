import { Tabs } from 'antd'
import { useState } from 'react'
import ProductTable from '../components/ProductTable'
import ProductForm from '../components/ProductForm'

function Product() {
    
    const [tabState, setTabState] = useState('list')
    const [editProduct, setEditProduct] = useState({})

    const tabChange = (tab) => {
        setTabState(tab)
    }
    const items = [
        {
            key: 'list',
            label: 'List',
            children: <ProductTable setEditProduct={setEditProduct} tabChange={tabChange} />
        }, 
        {
            key: 'new',
            label: 'New',
            children: <ProductForm tabState={tabState} editProduct={editProduct} setEditProduct={setEditProduct} tabChange={tabChange}/>
        } ,
        {
            key: 'edit',
            label: 'Edit',
            children:<ProductForm  tabState={tabState} editProduct={editProduct} setEditProduct={setEditProduct} tabChange={tabChange} />,
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