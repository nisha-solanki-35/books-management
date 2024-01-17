import { Container } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import AlertComponent from '../../components/Alert'
import { useMyContext } from '../../context/context'
import { useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/EditOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Dialog, DialogActions, DialogTitle, FormControl, InputLabel, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Typography } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { v4 as uuid } from 'uuid'

interface Book {
  nBookId: string
  sTitle: string
  sAuthor: string
  sPublicationYear: string
  sGenre: string
}

function Dashboard () {
  const navigate = useNavigate()
  const { dispatch, state: { successMsg, errorMsg, deleteSuccessMsg, booksList } } = useMyContext()
  const unsortable = ['srNo', 'Actions']
  const [alert, setAlert] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')
  const [books, setBooks] = useState<Book[]>([])
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false)
  const [bookId, setBookId] = useState('')
  const [genre, setGenre] = useState('')
  const prevProps = useRef({ genre }).current

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
    if (booksList && booksList?.length > 0) {
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
      setBooks(JSON.parse(books || '[]'))
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

  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [orderBy, setOrderBy] = useState<keyof Book>('sTitle')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleDelete = (e: React.MouseEvent, BookId: string) => {
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

  useEffect(() => {
    if (prevProps.genre !== genre) {
      if (genre === 'All') {
        const Books = localStorage.getItem('Books')
        const filteredBooks = Books ? JSON.parse(Books) : null
        setBooks(filteredBooks)
      } else {
        const Books = localStorage.getItem('Books')
        const filteredBooks = Books ? JSON.parse(Books)?.filter((data: { sGenre: string }) => data.sGenre === genre) : null
        setBooks(filteredBooks)
      }
    }
    return () => {
      prevProps.genre = genre
    }
  }, [genre])

  const handleRequestSort = (property: keyof Book) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const sortedRows = books?.slice()?.sort((a:Book, b:Book) => {
    const isAsc = order === 'asc'
    return (isAsc ? a[orderBy] > b[orderBy] : a[orderBy] < b[orderBy]) ? 1 : -1
  })

  const headCells: { id: keyof Book | 'srNo' | 'Actions' ,label: string}[] = [
    { id: 'srNo', label: 'Sr No.' },
    { id: 'sTitle', label: 'Title' },
    { id: 'sAuthor', label: 'Author' },
    { id: 'sPublicationYear', label: 'Publication Year' },
    { id: 'sGenre', label: 'Genre' },
    { id: 'Actions', label: 'Actions' }
  ]

  const handleChange = (event: SelectChangeEvent) => {
    setGenre(event.target.value as string)
  }

  return (
    <Container>
      {alert && <AlertComponent alert={alert} message={message} setAlert={setAlert as any} success={success} />}
      <div style={{ display: 'flex', justifyContent: "space-between", margin: "30px 0" }}>
        <div>
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
            value={genre}
            label="Genre"
            onChange={handleChange}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Classics">Classics</MenuItem>
            <MenuItem value="Mystery">Mystery</MenuItem>
            <MenuItem value="Fantasy">Fantasy</MenuItem>
            <MenuItem value="Historical Fiction">Historical Fiction</MenuItem>
            <MenuItem value="Horror">Horror</MenuItem>
          </Select>
        </FormControl>
        </div>
        <div>
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
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {headCells.map((headCell, index) => (
                <TableCell
                  key={headCell.id + index}
                  sortDirection={orderBy === headCell.id ? order : undefined}
                >
                  {!unsortable.includes(headCell.id) ? 
                  (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={() => handleRequestSort(headCell.id as keyof Book)}
                    >
                      {headCell.label}
                    </TableSortLabel>
                    ) : headCell.label}
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
          bottom: '15px',
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
