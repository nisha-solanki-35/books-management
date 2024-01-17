import React, { ReactNode, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Button, Container, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { useMyContext } from '../../../context/context'
import AlertComponent from '../../../components/Alert'
import { v4 as uuid } from 'uuid'

const validationSchema = yup.object({
  sTitle: yup.string().required('Required field'),
  sAuthor: yup.string().required('Required field'),
  sPublicationYear: yup.string().required('Required field'),
  sGenre: yup.string().required('Required field')
})

function AddUpdateBook () {
  const navigate = useNavigate()
  const { bookId } = useParams()
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

  function fetchBookData () {
    const books = localStorage.getItem('Books')
    const book = books ?JSON.parse(books)?.find((data: { nBookId: string }) => data.nBookId === bookId):null
    return {
      sTitle: book?.sTitle,
      sAuthor: book?.sAuthor,
      sPublicationYear: book?.sPublicationYear,
      sGenre: book?.sGenre
    }
  }

  const formik = useFormik({
    initialValues: bookId
      ? fetchBookData()
      : {
          sTitle: '',
          sAuthor: '',
          sPublicationYear: '',
          sGenre: ''
        },
    validationSchema,
    onSubmit: (values) => {
      let booksData = []
      const books = localStorage.getItem('Books')
      if (bookId) {
        booksData = books ? [...JSON.parse(books)] : []
        const index = booksData?.findIndex(data => data.nBookId === bookId)
        if (index >= 0) {
          booksData[index] = {
            ...booksData[index],
            sTitle: values?.sTitle,
            sAuthor: values?.sAuthor,
            sPublicationYear: values?.sPublicationYear,
            sGenre: values?.sGenre
          }
          localStorage.setItem('Books', JSON.stringify(booksData))
          dispatch({
            type: 'SUCCESS_MSG',
            payload: {
              message: 'Book updated successfully'
            }
          })
        } else {
          dispatch({
            type: 'ERROR_MSG',
            payload: {
              message: 'Book does not exist'
            }
          })
        }
      } else {
        booksData = books ? [...JSON.parse(books)] : []
        booksData.push({ ...values, nBookId: uuid() })
        localStorage.setItem('Books', JSON.stringify(booksData))
        dispatch({
          type: 'SUCCESS_MSG',
          payload: {
            message: 'Book added successfully'
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
          error={formik.touched.sTitle && Boolean(formik.errors.sTitle)}
          fullWidth
          helperText={(formik.touched.sTitle && formik.errors.sTitle) as ReactNode}
          id="sTitle"
          label="Title"
          name="sTitle"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          sx={{
            marginTop: '15px'
          }}
          value={formik.values.sTitle}
          variant="standard"
        />
        <TextField
          error={formik.touched.sAuthor && Boolean(formik.errors.sAuthor)}
          fullWidth
          helperText={(formik.touched.sAuthor && formik.errors.sAuthor) as ReactNode}
          id="sAuthor"
          label="Author"
          name="sAuthor"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          sx={{
            marginTop: '15px'
          }}
          value={formik.values.sAuthor}
          variant="standard"
        />
        <TextField
          error={formik.touched.sPublicationYear && Boolean(formik.errors.sPublicationYear)}
          fullWidth
          helperText={(formik.touched.sPublicationYear && formik.errors.sPublicationYear) as ReactNode}
          id="sPublicationYear"
          label="Publication Year"
          name="sPublicationYear"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          sx={{
            marginTop: '15px'
          }}
          value={formik.values.sPublicationYear}
          variant="standard"
        />
        <FormControl
          sx={{
            marginTop: "20px",
            width: "200px"
          }}
        >
          <InputLabel id="demo-simple-select-label">Genre</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="sGenre"
            value={formik.values.sGenre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <MenuItem value="Classics">Classics</MenuItem>
            <MenuItem value="Mystery">Mystery</MenuItem>
            <MenuItem value="Fantasy">Fantasy</MenuItem>
            <MenuItem value="Historical Fiction">Historical Fiction</MenuItem>
            <MenuItem value="Horror">Horror</MenuItem>
          </Select>
        </FormControl>
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
            {bookId ? 'Save changes' : 'Add Book'}
          </Button>
        </Container>
      </form>
    </Container>
  )
}

export default AddUpdateBook
