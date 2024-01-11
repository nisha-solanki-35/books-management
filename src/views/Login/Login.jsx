import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Container } from '@mui/material'
import * as yup from 'yup'
import { useMyContext } from '../../context/context'
import { useNavigate } from 'react-router-dom'
import AlertComponent from '../../components/Alert'

export const validationSchema = yup.object({
  sEmail: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  sPassword: yup
    .string('Enter your password')
    .required('Password is required')
})

function Login () {
  const navigate = useNavigate()
  const { dispatch, state: { loginSuccessMsg } } = useMyContext()

  const [alert, setAlert] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (loginSuccessMsg) {
      navigate('/dashboard/books', {
        state: { message: loginSuccessMsg }
      })
    }
  }, [loginSuccessMsg])

  const formik = useFormik({
    initialValues: {
      sEmail: '',
      sPassword: ''
    },
    validationSchema,
    onSubmit: (values) => {
      const users = localStorage.getItem('Users')
      const user = JSON.parse(users)?.find(
        (data) => data.sEmail === values?.sEmail
      )
      if (user) {
        const { sEmail, sPassword } = user
        if (values?.sEmail === sEmail && values?.sPassword === sPassword) {
          localStorage.setItem('Token', Date.now())
          dispatch({
            type: 'LOGIN',
            payload: {
              message: 'User logged in successfully'
            }
          })
        }
      } else {
        setAlert(true)
        setSuccess(false)
        setMessage('Please enter a valid credentials')
      }
    }
  })

  return (
    <Container>
      {alert && <AlertComponent alert={alert} message={message} setAlert={setAlert} success={success} />}
      <form onSubmit={formik.handleSubmit}>
        <TextField
          error={formik.touched.sEmail && Boolean(formik.errors.sEmail)}
          fullWidth
          helperText={formik.touched.sEmail && formik.errors.sEmail}
          id="sEmail"
          label="Email"
          name="sEmail"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          sx={{
            marginTop: '15px'
          }}
          value={formik.values.sEmail}
          variant="standard"
        />
        <TextField
          error={formik.touched.sPassword && Boolean(formik.errors.sPassword)}
          fullWidth
          helperText={formik.touched.sPassword && formik.errors.sPassword}
          id="sPassword"
          label="Password"
          name="sPassword"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          sx={{
            marginTop: '15px'
          }}
          type="password"
          value={formik.values.sPassword}
          variant="standard"
        />
        <Container
          sx={{
            marginTop: '15px',
            width: '50%',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Button
            sx={{
              background: '#003085',
              color: '#ffffff'
            }}
            type="submit"
            variant="contained"
          >
            Login
          </Button>
        </Container>
      </form>
    </Container>
  )
}

export default Login
