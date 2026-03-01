import ListGenerator from "../shared/ListGenerator/ListGenerator";
import useCustomer from "../store/customers/useCustomer";

function Customers() {

  let customerColumns = [
    { key: 'id', title: 'ID', dataIndex: 'id' },
    { key: 'name', title: 'Name', dataIndex: 'name' },
    { key: 'father_name', title: 'Father Name', dataIndex: 'father_name' },
    { key: 'gender', title: 'Gender', dataIndex: 'gender' },
    { key: 'age', title: 'Age', dataIndex: 'age' },
    { key: 'job', title: 'Job', dataIndex: 'job' },
    { key: 'photo', title: 'Photo', dataIndex: 'photo', render: (src) => <img src={src} className="rounded-xl w-20 shadow-xl" /> },
  ]

  const { customers, addCustomer, deleteCustomer, updateCustomer } = useCustomer()


  const fields = [
    {
      label: 'Name',
      name: 'name',
      type: 'text'
    },
    {
      label: 'Father Name',
      name: 'father_name',
      type: 'text'
    },
    {
      label: 'Gender',
      name: 'gender',
      type: 'select',
      options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]
    },
    {
      label: 'Age',
      name: 'age',
      type: 'number'
    },
    {
      label: 'Job',
      name: 'job',
      type: 'text'
    },
    {
      label: 'Photo',
      name: 'photo',
      type: 'text'
    },
  ]


  return (
    <ListGenerator
      title='Customers'
      columns={customerColumns}
      data={customers}
      fields={fields}
      initialValues={{
        name: '',
        age: '',
        gender: 'male'
      }}
      add={addCustomer}
      remove={deleteCustomer}
      update={updateCustomer}
    />
  )
}

export default Customers