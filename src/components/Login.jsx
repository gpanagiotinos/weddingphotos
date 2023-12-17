import React, { useState, useMemo } from 'react'
import {
    CForm,
    CFormInput,
    CContainer,
    CCard,
    CCardBody,
    CButton,
    CCardFooter,
} from '@coreui/react'
import { useAuth } from 'routes/AuthProvider'


const useValidation = (email, password) => {
  return useMemo(() => Boolean(email && email.length > 0 && password && password.length > 0), [email, password])
}

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const validation = useValidation(email, password)
    const { login } = useAuth();
    const handleSubmit = (event) => {
      event.preventDefault()
      event.stopPropagation()
      if (validation) {
        login({ id: 1, token: 'token' })
      }

    }

    return (
        <CContainer
            xl
            className="h-100 d-flex justify-content-center align-items-center"
        >
            <CForm onSubmit={handleSubmit}>
                <CCard style={{ width: '20rem' }}>
                    <CCardBody>
                        <CFormInput
                            type="email"
                            id="email"
                            label="Email address"
                            placeholder="name@example.com"
                            aria-describedby="email"
                            onChange={(evt) => setEmail(evt.target.value)}
                            value={email}
                        />
                        <CFormInput
                            type="password"
                            id="password"
                            label="Password"
                            aria-describedby="password"
                            onChange={(evt) => setPassword(evt.target.value)}
                            value={password}
                        />
                    </CCardBody>
                    <CCardFooter>
                        <CButton color="primary" type="submit">
                            {'Σύνδεση'}
                        </CButton>
                    </CCardFooter>
                </CCard>
            </CForm>
        </CContainer>
    )
}

export default Login
