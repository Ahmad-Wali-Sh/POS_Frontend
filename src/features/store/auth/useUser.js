import { create} from 'zustand'

const useUser = create((set,get) => ({
    user: {},
    setUser: (currentValue) => set(() => ({user: currentValue})),
    loggedUser: () => {
        const user = get().user
        if (user?.id) {
            return user
        } else {
            return false
        }
    }
}))

export default useUser