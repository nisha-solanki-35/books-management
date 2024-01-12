import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import AlertComponent from '../../components/Alert'
import { useMyContext } from '../../context/context'
import { useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/EditOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Dialog, DialogActions, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Typography } from '@mui/material'
import { v4 as uuid } from 'uuid'

function Dashboard () {
  const navigate = useNavigate()
  const { dispatch, state: { successMsg, errorMsg, deleteSuccessMsg, booksList } } = useMyContext()

  const [alert, setAlert] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')
  const [books, setBooks] = useState([])
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false)
  const [bookId, setBookId] = useState('')

  useEffect(() => {
    const Books = localStorage.getItem('Books')
    const books = Books && JSON.parse(Books)
    if (books?.length > 0) {
      setBooks(books)
    } else {
      const dummyData = [
        {
          nBookId: uuid(),
          sTitle: 'To Kill a Mockingbird',
          sAuthor: 'Harper Lee',
          sPublicationYear: '2018',
          sGenre: 'Classics'
        },
        {
          nBookId: uuid(),
          sTitle: 'The Night Fire',
          sAuthor: 'Michael Connelly',
          sPublicationYear: '2017',
          sGenre: 'Mystery'
        },
        {
          nBookId: uuid(),
          sTitle: 'Circe',
          sAuthor: 'Madeline Miller',
          sPublicationYear: '2018',
          sGenre: 'Fantasy'
        },
        {
          nBookId: uuid(),
          sTitle: 'The Help',
          sAuthor: 'Kathryn Stockett',
          sPublicationYear: '2010',
          sGenre: 'Historical Fiction'
        },
        {
          nBookId: uuid(),
          sTitle: 'Carrie',
          sAuthor: 'Stephen King',
          sPublicationYear: '2023',
          sGenre: 'Horror'
        }
      ]
      dispatch({
        type: 'BOOKS_LIST',
        payload: {
          data: dummyData
        }
      })
    }
  }, [])

  useEffect(() => {
    if (booksList?.length > 0) {
      localStorage.setItem('Books', JSON.stringify(booksList))
      setBooks(booksList)
      dispatch({
        type: 'BOOKS_LIST',
        payload: {
          data: []
        }
      })
    }
  }, [booksList])

  useEffect(() => {
    if (successMsg) {
      setAlert(true)
      setSuccess(true)
      setMessage(successMsg)
      dispatch({ type: 'CLEAR_MSG' })
    }
  }, [successMsg])

  useEffect(() => {
    if (deleteSuccessMsg) {
      setAlert(true)
      setSuccess(true)
      setMessage(deleteSuccessMsg)
      dispatch({ type: 'CLEAR_MSG' })
      const books = localStorage.getItem('Books')
      setBooks(JSON.parse(books))
    }
  }, [deleteSuccessMsg])

  useEffect(() => {
    if (errorMsg) {
      setAlert(true)
      setSuccess(false)
      setMessage(errorMsg)
      dispatch({ type: 'CLEAR_MSG' })
    }
  }, [errorMsg])

  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('sTitle')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleDelete = (e, BookId) => {
    setBookId(BookId)
    setIsOpenConfirmation(true)
  }

  const deleteBookFunc = () => {
    const updatedArr = books.filter(data => data.nBookId !== bookId)
    localStorage.setItem('Books', JSON.stringify(updatedArr))
    dispatch({
      type: 'DELETE_SUCCESS_MSG',
      payload: {
        message: 'Book deleted successfully'
      }
    })
    setIsOpenConfirmation(false)
  }

  const handleDeleteConfirmation = () => setIsOpenConfirmation(false)

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const sortedRows = books?.slice()?.sort((a, b) => {
    const isAsc = order === 'asc'
    return (isAsc ? a[orderBy] > b[orderBy] : a[orderBy] < b[orderBy]) ? 1 : -1
  })

  const headCells = [
    { id: 'srNo', label: 'Sr No.' },
    { id: 'sTitle', label: 'Title' },
    { id: 'sAuthor', label: 'Author' },
    { id: 'sPublicationYear', label: 'Publication Year' },
    { id: 'sGenre', label: 'Genre' },
    { id: 'Actions', label: 'Actions' }
  ]

  return (
    <Container>
      {alert && <AlertComponent alert={alert} message={message} setAlert={setAlert} success={success} />}
      <div style={{ textAlign: 'right' }}>
        <Button
          onClick={() => navigate('/books/add-book')}
          sx={{
            margin: '20px 0'
          }}
          variant="outlined"
        >
          Add Book
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {headCells.map((headCell, index) => (
                <TableCell
                  key={headCell.id + index}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={() => handleRequestSort(headCell.id)}
                  >
                    {headCell.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={row.sTitle + row.sAuthor}>
                  <TableCell>{(page * rowsPerPage) + (index + 1)}</TableCell>
                  <TableCell>{row?.sTitle}</TableCell>
                  <TableCell>{row?.sAuthor}</TableCell>
                  <TableCell>{row?.sPublicationYear}</TableCell>
                  <TableCell>{row?.sGenre}</TableCell>
                  <TableCell>
                    <Button onClick={() => navigate(`/books/update-book/${row?.nBookId}`)}
                      startIcon={<EditIcon />}
                      sx={{
                        marginRight: '10px'
                      }}
                      variant="outlined"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={(e) => handleDelete(e, row?.nBookId)}
                      startIcon={<DeleteIcon />}
                      variant="outlined"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          {books?.length === 0 && (
            <TableRow
              style={{
                height: '500px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography
                sx={{
                  fontSize: '20px',
                  fontWeight: 'bold'
                }}
              >
                Books not available
              </Typography>
            </TableRow>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={books?.length || 0}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        sx={{
          position: 'fixed',
          bottom: '15px'
        }}
      />
      <Dialog
        aria-describedby="alert-dialog-description"
        aria-labelledby="alert-dialog-title"
        onClose={handleDeleteConfirmation}
        open={isOpenConfirmation}
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete book?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteConfirmation}>Cancel</Button>
          <Button autoFocus onClick={() => deleteBookFunc()}>
            Yes, Delete it.
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Dashboard
