import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Button, Container, TextField } from '@mui/material'
import { useMyContext } from '../../context/context'
import AlertComponent from '../../components/Alert'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

interface FormValues {
  sEmail: string;
  sMobileNumber: string;
  sPassword: string;
  UserId: string;
}

export const validationSchema = yup.object({
  sEmail: yup.string().email('Enter a valid email').required('Email is required'),
  sPassword: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
  sMobileNumber: yup.string().required('Mobile number is required')
})

function Registration () {
  const navigate = useNavigate()
  const { dispatch, state: { successMsg, errorMsg } } = useMyContext()

  const [alert, setAlert] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (successMsg) {
      navigate('/dashboard/books', {
        state: { message: successMsg }
      })
    }
  }, [successMsg])

  useEffect(() => {
    if (errorMsg) {
      setAlert(true)
      setSuccess(false)
      setMessage(errorMsg)
      dispatch({ type: 'CLEAR_MSG' })
    }
  }, [errorMsg])

  const formik = useFormik({
    initialValues: {
      sEmail: '',
      sMobileNumber: '',
      sPassword: ''
    } as FormValues,
    validationSchema,
    onSubmit: (values) => {
      let usersData: FormValues[] = [];
      let index: number | undefined;
      const users = localStorage.getItem('Users')
      if (users) {
        usersData = [...JSON.parse(users)]
        index = usersData?.findIndex(data => data.sEmail === values?.sEmail || data?.sMobileNumber === values?.sMobileNumber)
      }
      if (index !== undefined && index >= 0) {
        dispatch({
          type: 'ERROR_MSG',
          payload: {
            message: 'User already exist with this Email Id or Mobile number'
          }
        })
      } else {
        usersData.push({ ...values, UserId: Date.now().toString() })
        localStorage.setItem('Users', JSON.stringify(usersData))
        localStorage.setItem('Token', Date.now().toString())
        dispatch({
          type: 'SUCCESS_MSG',
          payload: {
            message: "You've successfully registered"
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
          error={
            formik.touched.sMobileNumber && Boolean(formik.errors.sMobileNumber)
          }
          fullWidth
          helperText={
            formik.touched.sMobileNumber && formik.errors.sMobileNumber
          }
          id="sMobileNumber"
          label="Mobile Number"
          name="sMobileNumber"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          sx={{
            marginTop: '15px'
          }}
          value={formik.values.sMobileNumber}
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
            Register
          </Button>
        </Container>
      </form>
    </Container>
  )
}

export default Registration
