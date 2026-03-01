import { Tabs } from 'antd'
import { useState } from 'react'
import ListTable from './ListTable'
import ListForm from './ListForm'

function ListGenerator({ title, fields ,data, columns, initialValues, add, update, remove }) {

    const [tabState, setTabState] = useState('list')

    const [editObject, setEditObject] = useState({})

    const tabChange = (tab) => {
        setTabState(tab)
    }
    const items = [
        {
            key: 'list',
            label: 'List',
            children: <ListTable columns={columns} data={data} tabChange={tabChange} setEditObject={setEditObject} />
        },
        {
            key: 'new',
            label: 'New',
            children: <ListForm fields={fields} add={add} remove={remove} update={update} tabState={tabState} setEditObject={setEditObject} title={title} tabChange={tabChange} editObject={editObject} initialValues={initialValues} />
        },
        {
            key: 'edit',
            label: 'Edit',
            children: <ListForm fields={fields} add={add} remove={remove} update={update} tabState={tabState} setEditObject={setEditObject} title={title} tabChange={tabChange} editObject={editObject} initialValues={initialValues} />,
            disabled: true
        }
    ]


    return (
        <main className='h-full bg-rose-50 p-4'>
            <h1 className='text-2xl text-slate-900'>{title}</h1>
            <Tabs type='card' color='primary' activeKey={tabState} onTabClick={(tab) => {
                setTabState(tab)
            }} items={items} />
        </main>
    )
}

export default ListGenerator