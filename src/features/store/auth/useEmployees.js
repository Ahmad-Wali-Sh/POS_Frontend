import { create } from 'zustand'
const defaultEmployees = [
    {
        id: 1,
        username: 'admin',
        password: 'admin',
        fullname: 'Admin admin',
        position: 'admin',
        age: 25,
        photo: ''
    },
    {
        id: 2,
        username: 'milad',
        password: '123',
        fullname: 'Milad Azizani',
        position: 'admin',
        age: 19,
        photo: ''
    }
]
const useEmployees = create((set, get) => ({
    employees: defaultEmployees,
    validateUser: (username, password) => {
        const employeesState = get().employees
        const user = employeesState.find((employee) => {
            return (employee.username == username && employee.password == password)
        })
        if (user) {
            return user
        } else {
            return false
        }
    },
    addEmployee: (newEmployee) => {
        newEmployee.id = Math.round(Math.random() * 10000)
        set((state) => ({ employees: [...state.employees, newEmployee] }))
    },
    updateEmployee: (id, editedEmployee) =>
        set((state) => ({
            employees: state.employees.map((emp) =>
                emp.id === id ? editedEmployee : emp
            ),
        })),
    deleteEmployee: (id) => set((state) => {
        const index = state.employees.findIndex((employee) => employee.id == id)
        state.employees.splice(index, 1)
        return state
    })
}))
export default useEmployees