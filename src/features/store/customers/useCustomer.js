import { create } from 'zustand'


const customers = [
    {
        id: '1',
        name: 'Ahmad',
        job: 'Freelancer',
        father_name: 'Mahmood',
        age: 25,
        photo: '',
        gender: 'male'
    },
    {
        id: '2',
        name: 'Yama',
        job: 'Freelancer',
        father_name: 'Kazemi',
        age: 25,
        photo: '',
        gender: 'male'
    },
    {
        id: '3',
        name: 'Rashid',
        job: 'React Developer',
        father_name: 'Moradi',
        age: 23,
        gender: 'male',
        photo: 'images/products/keyboard2.png'
    },
    {
        id: '4',
        name: 'Maryam',
        job: 'HouseWife',
        father_name: 'Akbar',
        age: 23,
        gender: 'female',
        photo: ''
    }
]

const useCustomer = create(set => ({
    customers: customers,
    addCustomer: (newCustomer) => {
        newCustomer.id = Math.round(Math.random() * 10000)
        set((state) => ({ customers: [...state.customers, newCustomer] }))
    },
    updateCustomer: (id, editCustomer) => set((state) => {
        const myIndex = state.customers.findIndex((customer) => customer.id == id)
        state.customers[myIndex] = editCustomer
        return state
    }),
    deleteCustomer: (id) => set((state) => {
        const index = state.customers.findIndex((customer) => customer.id == id)
        state.customers.splice(index, 1)
        return state
    })
}))

export default useCustomer