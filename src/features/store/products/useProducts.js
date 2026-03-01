import { create } from 'zustand'

let products = [
    {
        id: 1,
        title: 'Joystick Black',
        price: 300,
        quantity: 100,
        category: 'Gaming',
        image: 'images/products/joystick1.jpg'
    }, 
    {
        id: 2,
        title: 'Old Keyboard',
        price: 1500,
        quantity: 50,
        category: 'Keyboard',
        image: 'images/products/keyboard.jpg'
    },
    {
        id: 3,
        title: 'Monitor',
        price: 5000,
        quantity: 20,
        category: 'Monitor',
        image: 'images/products/monitor.jpg'
    }
]


const useProducts = create((set) => ({
    products: products,
    addProduct: (newProduct) => {
        newProduct.id = Math.round(Math.random() * 10000)
        set((state) => ({products: [...state.products, newProduct]})) 
    },
    updateProduct: (id, editedProduct) => set((state) => {
        const myIndex = state.products.findIndex((product) => product.id == id)
        state.products[myIndex] = editedProduct
        return state
    }),
    deleteProduct: (id) => set((state) => {
        const index = state.products.findIndex((product) => product.id == id)
        state.products.splice(index, 1)
        return state
    })
}))

export default useProducts