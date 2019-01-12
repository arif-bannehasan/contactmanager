import React, { Component } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyAEzRh4F9_nWywuwyneSs4LZ8lIOXU6-zc",
  authDomain: "dicksword-6d797.firebaseapp.com",
  databaseURL: "https://dicksword-6d797.firebaseio.com",
  projectId: "dicksword-6d797",
  storageBucket: "dicksword-6d797.appspot.com",
  messagingSenderId: "1038433381048"
};

firebase.initializeApp(config);

const title = 'React + Material-UI + Firebase';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSigningIn: false,
      isSignedIn: false,

      isSigningOut: false,

      user: null,

      snackbar: {
        message: '',
        open: false
      }
    };
  }

  /**
   * Opens a snackbar. Snackbars provide brief messages about app processes through a message.
   */
  openSnackbar = (message) => {
    this.setState({
      snackbar: {
        message,
        open: true
      }
    });
  };

  /**
   * Sets the `open` state of a snackbar to `false`. A direct response to the snackbar's `onClose` event.
   * @param clearState Whether or not to clear the message of the snackbar.
   */
  closeSnackbar = (clearMessage = false) => {
    const { snackbar } = this.state;

    this.setState({
      snackbar: {
        message: clearMessage ? '' : snackbar.message,
        open: false
      }
    });
  };

  /**
   * Stub implementation for a sign in function.
   */
  signIn = () => {
    if (this.state.isSignedIn) {
      this.openSnackbar('Already signed in');
      
      return;
    }

    this.setState({
      isSigningIn: true
    }, () => {
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider).then((userCredential) => {
        this.setState({
          isSigningIn: false
        }, () => {
          const user = userCredential.user;
          const displayName = user.displayName;
          const emailAddress = user.email;
    
          this.openSnackbar('Signed in as ' + (displayName || emailAddress));
        });
      }).catch((error) => {
        this.setState({
          isSigningIn: false
        }, () => {
          this.openSnackbar(error.message);
        });
      });
    });
  };

  /**
   * Stub implementation for a sign out function.
   */
  signOut = () => {
    if (!this.state.isSignedIn) {
      this.openSnackbar('Not signed in');

      return;
    }

    this.setState({
      isSigningOut: true
    }, () => {
      firebase.auth().signOut().then(() => {
        this.setState({
          isSigningOut: false
        }, () => {
          this.openSnackbar('Signed out');
        });
      }).catch((error) => {
        this.setState({
          isSigningOut: false
        }, () => {
          this.openSnackbar(error.message);
        });
      });
    });
  };

  render() {
    const { isSigningIn, isSignedIn, snackbar } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <AppBar color="primary" position="static">
          <Toolbar variant="regular">
            <Typography style={{ flexGrow: 1 }} color="inherit" variant="h6">{title}</Typography>

            {!isSignedIn && <Button color="secondary" disabled={isSigningIn} variant="contained" onClick={this.signIn}>Sign in</Button>}
            {isSignedIn && <Button color="secondary" variant="contained" onClick={this.signOut}>Sign out</Button>}
          </Toolbar>
        </AppBar>

        <Snackbar autoHideDuration={4000} message={snackbar.message} onClose={this.closeSnackbar} open={snackbar.open} />
      </MuiThemeProvider>
    );
  }

  componentDidMount() {
    this.removeAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        isSignedIn: !!user,
        user
      });
    });
  }

  componentWillUnmount() {
    this.removeAuthObserver();
  }
}

export default App;
