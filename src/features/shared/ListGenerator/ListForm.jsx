import { Button, Form, Input, Popconfirm, Select } from 'antd'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

function ListForm({ title, fields, tabChange, editObject, initialValues, setEditObject, tabState, add, remove, update }) {

    const [form] = Form.useForm()

    useEffect(() => {
        if (tabState == 'edit' && editObject?.id) {
            form.setFieldsValue(editObject)

        }
    }, [editObject])

    useEffect(() => {
        if (tabState == 'new') {
            form.setFieldsValue(initialValues)
            setEditObject({})
        }
    }, [tabState])


    return (
        <Form
            form={form}
            name={title}
            onFinish={(data) => {
                if (tabState == 'new') {
                    add(data)
                    toast.success('New Data Has Been Submited')
                    tabChange('list')
                }
                else if (tabState == 'edit') {
                    data.id = editObject.id
                    update(editObject?.id, data)
                    console.log(editObject)
                    toast.info('Data Has been Updated')
                    tabChange('list')
                }
            }}
        >
            <main>
                <div className='grid grid-cols-3 gap-4 bg-[#5858581a] p-4 rounded-xl'>
                    {fields.map((field) => (
                        <Form.Item
                            key={field.name}
                            label={field.label}
                            name={field.name}
                        >
                            {field.type == 'select' ?
                                <Select showSearch options={field.options} /> : <Input type={field.type} />}
                        </Form.Item>
                    ))}

                </div>
                <div className='flex w-full justify-end p-4 gap-4'>
                    {tabState == 'edit' && <Form.Item label={null}>
                        <Popconfirm
                            title='Attention!'
                            description='Are You Sure You Want to Delete This Product?'
                            onConfirm={() => {
                                remove(editObject?.id)
                                tabChange('list')
                            }}
                        >
                            <Button type='primary' danger>
                                Delete
                            </Button>
                        </Popconfirm>
                    </Form.Item>}
                    <Form.Item label={null}>
                        <Button  onClick={() => {
                            if (tabState == 'new') {
                                form.setFieldsValue(initialValues)
                            } else if (tabState == 'edit') {
                                form.setFieldsValue(editObject)
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

export default ListForm