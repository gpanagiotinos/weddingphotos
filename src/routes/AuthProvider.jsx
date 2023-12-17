import React, {
    useState,
    useMemo,
    useContext,
    createContext,
} from 'react'
import { useNavigate } from 'react-router-dom'

const useLocalStorage = (keyName, defaultValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = window.localStorage.getItem(keyName)
            if (value) {
                return JSON.parse(value)
            } else {
                window.localStorage.setItem(
                    keyName,
                    JSON.stringify(defaultValue)
                )
                return defaultValue
            }
        } catch (err) {
            return defaultValue
        }
    })
    const setValue = (newValue) => {
        try {
            window.localStorage.setItem(keyName, JSON.stringify(newValue))
        } catch (err) {}
        setStoredValue(newValue)
    }
    return [storedValue, setValue]
}
const useAuthValue = (login, logout, user) => {
    return useMemo(
        () => ({
            user,
            login,
            logout,
        }),
        [login, logout, user]
    )
}
const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('user', null)
    const navigate = useNavigate()

    // call this function when you want to authenticate the user
    const login = async (data) => {
        setUser(data)
        navigate('/library')
    }

    // call this function to sign out logged in user
    const logout = () => {
        setUser(null)
        navigate('/', { replace: true })
    }

    const value = useAuthValue(login, logout, user)
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthProvider