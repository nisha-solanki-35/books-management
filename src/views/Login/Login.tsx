import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Container } from '@mui/material'
import * as yup from 'yup'
import { useMyContext } from '../../context/context'
import { useNavigate } from 'react-router-dom'
import AlertComponent from '../../components/Alert'

interface FormValues {
  sEmail: string;
  sPassword: string;
}

export const validationSchema = yup.object({
  sEmail: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  sPassword: yup
    .string()
    .required('Password is required')
})

function Login () {
  const navigate = useNavigate()
  const { dispatch, state: { successMsg, errorMsg } } = useMyContext()

  const [alert, setAlert] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (successMsg && successMsg?.length > 0) {
      navigate('/dashboard/books', {
        state: { message: successMsg }
      })
    }
  }, [successMsg])

  useEffect(() => {
    if (errorMsg && errorMsg?.length > 0) {
      setAlert(true)
      setSuccess(false)
      setMessage(errorMsg)
      dispatch({ type: 'CLEAR_MSG' })
    }
  }, [errorMsg])

  const formik = useFormik({
    initialValues: {
      sEmail: '',
      sPassword: ''
    } as FormValues,
    validationSchema,
    onSubmit: (values) => {
      const users = localStorage.getItem('Users')
      const user = JSON.parse(users ?? '[]')?.find((data: FormValues) => data.sEmail === values?.sEmail)
      if (user) {
        const { sEmail, sPassword } = user
        if (values?.sEmail === sEmail && values?.sPassword === sPassword) {
          localStorage.setItem('Token', Date.now().toString())
          dispatch({
            type: 'SUCCESS_MSG',
            payload: {
              message: 'User logged in successfully'
            }
          })
        }
      } else {
        dispatch({
          type: 'ERROR_MSG',
          payload: {
            message: 'Please enter a valid credentials'
          }
        })
      }
    }
  })

  return (
    <Container>
      {alert && <AlertComponent alert={alert} message={message} setAlert={setAlert as any} success={success} />}
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
