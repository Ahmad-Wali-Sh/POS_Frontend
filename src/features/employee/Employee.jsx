import ListGenerator from "../shared/ListGenerator/ListGenerator";
import useEmployees from "../store/auth/useEmployees";

function Employee() {

    let employeeColumns = [
        { key: 'id', title: 'ID', dataIndex: 'id' },
        { key: 'username', title: 'Usernmae', dataIndex: 'username' },
        { key: 'fullname', title: 'Full Name', dataIndex: 'fullname' },
        { key: 'position', title: 'Position', dataIndex: 'position' },
        { key: 'age', title: 'Age', dataIndex: 'age' },
        { key: 'photo', title: 'Photo', dataIndex: 'photo', render: (src) => <img src={src} className="rounded-xl w-20 shadow-xl" /> },
    ]

    const { employees, addEmployee, deleteEmployee, updateEmployee } = useEmployees()


    const fields = [
        {
            label: 'Username',
            name: 'username',
            type: 'text'
        },
        {
            label: 'Full Name',
            name: 'fullname',
            type: 'text'
        },
        {
            label: 'Position',
            name: 'position',
            type: 'select',
            options: [{ value: 'admin', label: 'Admin' }, { value: 'employee', label: 'Employee' }, { value: 'manager', label: 'Manager' }]
        },
        {
            label: 'Age',
            name: 'age',
            type: 'number'
        },
        {
            label: 'Password',
            name: 'password',
            type: 'password'
        },
        {
            label: 'Photo',
            name: 'photo',
            type: 'text'
        },
    ]

    const intialValues = {
        usernmae: '',
        password: '',
        age: '',
        position: '',
        photo:'',
        fullname: ''
    }

    return (
        <ListGenerator
            title='Employee'
            columns={employeeColumns}
            data={employees}
            fields={fields}
            initialValues={intialValues}
            add={addEmployee}
            remove={deleteEmployee}
            update={updateEmployee}
        />
    )
}

export default Employee