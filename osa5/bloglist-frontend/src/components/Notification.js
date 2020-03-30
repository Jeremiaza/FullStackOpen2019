import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

const Notification = (type, blogTitle, blogAuthor) => {
  switch (type) {
  case 'blogcreatesuccess':
    store.addNotification({
      title: 'Success!',
      message: 'A new blog ' + blogTitle + ' by ' + blogAuthor + ' added',
      type: 'success',
      insert: 'top',
      container: 'top-center',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: {
        duration: 2500,
        onScreen: true
      }
    })
    break
  case 'loginerror':
    store.addNotification({
      title: 'Login error',
      message: 'Wrong username or password',
      type: 'danger',
      insert: 'top',
      container: 'top-center',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: {
        duration: 2500,
        onScreen: true
      }
    })
    break
  case 'deletesuccess':
    store.addNotification({
      title: 'Success!',
      message: 'Blog ' + blogTitle + ' by ' + blogAuthor + ' deleted',
      type: 'success',
      insert: 'top',
      container: 'top-center',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: {
        duration: 2500,
        onScreen: true
      }
    })
    break
  }

}

export default Notification