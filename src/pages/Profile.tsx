import {
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  TextField,
  Typography
} from '@material-ui/core'
import { EmailOutlined } from '@material-ui/icons'
import LockOutlined from '@material-ui/icons/LockOutlined'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

export const Profile = () => {
  const [emailLoading, setEmailLoading] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { enqueueSnackbar } = useSnackbar()
  const { updateEmail, updatePassword, currentUser } = useAuth()

  useEffect(() => {
    setEmail(currentUser.email)
  }, [currentUser.email])

  const handleOnEmailChangeSubmit = async (e: any) => {
    e.preventDefault()
    setEmailLoading(true)

    try {
      if (email.toLocaleLowerCase().includes('medico'))
        throw new Error('El nuevo email no puede contener la palabra medico')
      await updateEmail(email)
      enqueueSnackbar('Email actualizado!', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }
      })
    } catch (e) {
      enqueueSnackbar(e.message, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }
      })
    } finally {
      setEmailLoading(false)
    }
  }
  const handleOnPasswordChangeSubmit = async (e: any) => {
    e.preventDefault()
    setPasswordLoading(true)

    try {
      if (password !== confirmPassword)
        throw new Error('Las contraseñas son diferentes')
      await updatePassword(password)
      setPassword('')
      setConfirmPassword('')
      enqueueSnackbar('Contraseña actualizada!', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }
      })
    } catch (e) {
      enqueueSnackbar(e.message, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }
      })
    } finally {
      setPasswordLoading(false)
    }
  }

  return (
    <Card>
      <CardContent>
        <Typography paragraph variant='h5'>
          Perfil
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <EmailOutlined />
            </ListItemIcon>
            <form onSubmit={handleOnEmailChangeSubmit}>
              <TextField
                label='Email'
                variant='outlined'
                style={{ minWidth: 300 }}
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <ListItemSecondaryAction>
                <Button
                  variant='contained'
                  disabled={emailLoading}
                  type='submit'
                  color='primary'
                >
                  Actualizar
                </Button>
              </ListItemSecondaryAction>
            </form>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LockOutlined />
            </ListItemIcon>
            <form onSubmit={handleOnPasswordChangeSubmit}>
              <TextField
                label='Nueva Contraseña'
                type='password'
                variant='outlined'
                style={{ minWidth: 300, marginRight: 10 }}
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <TextField
                label='Repetir Contraseña'
                type='password'
                variant='outlined'
                style={{ minWidth: 300 }}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
              <ListItemSecondaryAction>
                <Button
                  variant='contained'
                  disabled={passwordLoading}
                  type='submit'
                  color='primary'
                >
                  Actualizar
                </Button>
              </ListItemSecondaryAction>
            </form>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  )
}
