import React, { Component } from 'react';
import SignUpForm from './components/signup/SignUpForm';
import firebase from 'firebase/app';
import ChirperHeader from './components/chirper/ChirperHeader'
import ChirpBox from './components/chirper/ChirpBox'
import ChirpList from './components/chirper/ChirpList'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {loading: true};
  }

  componentDidMount(){
    this.authUnRegFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if(firebaseUser === undefined){
        this.setState({user: null})
      } else{
        this.setState({user: firebaseUser, loading: false})
      }
    });
  }

  componentWillUnmount(){
    this.authUnRegFunc();
  }


  //A callback function for registering new users
  handleSignUp(email, password, handle, avatar) {
    this.setState({errorMessage:null}); //clear any old errors

    /* TODO: sign up user here */
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
          let user = firebase.auth().currentUser;
          let profilePromise = user.updateProfile({displayName: handle, photoURL: avatar})
          return profilePromise
      }).catch((error) => {
          this.setState({errorMessage: error.message});

      })
  }

  //A callback function for logging in existing users
  handleSignIn(email, password) {
    this.setState({errorMessage:null}); //clear any old errors

    /* TODO: sign in user here */
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((error) => {
        this.setState({errorMessage: error.message});
      })
  }

  //A callback function for logging out the current user
  handleSignOut(){
    this.setState({errorMessage:null}); //clear any old errors

    /* TODO: sign out user here */
    firebase.auth().signOut()
      .catch((error) => {
        this.setState({errorMessage: error.message});
      })
  }

  render() {

    let content=null; //content to render

    if(this.state.loading){
      content =(<div className="text-center">
                  <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
                </div>)
      return content;
    }

    if(!this.state.user) { //if logged out, show signup form
      content = (
        <div className="container">
          <h1>Sign Up</h1>
          <SignUpForm 
            signUpCallback={(e,p,h,a) => this.handleSignUp(e,p,h,a)} 
            signInCallback={(e,p) => this.handleSignIn(e,p)} 
            />
        </div>
      );
    } 
    else { //if logged in, show welcome message
      content = (
        <div>
          <ChirperHeader user={this.state.user}>
            {/* log out button is child element */}
            <ChirpBox currentUser={this.state.user}/>
            <ChirpList currentUser={this.state.user}/>
            {this.state.user &&
              <button className="btn btn-warning" 
                      onClick={() => this.handleSignOut()}>
                Log Out {this.state.user.displayName}
              </button>
            }
          </ChirperHeader>
        </div>
      );
    }

    return (
      <div>
        {this.state.errorMessage &&
          <p className="alert alert-danger">{this.state.errorMessage}</p>
        }
        {content}
      </div>
    );
  }
}

//A component to display a welcome message to a `user` prop (for readability)
// class WelcomeHeader extends Component {
//   render() {
//     return (
//       <header className="container">
//         <h1>
//           Welcome {this.props.user.displayName}!
//           {' '}
//           <img className="avatar" src={this.props.user.photoURL} alt={this.props.user.displayName} />
//         </h1>
//         {this.props.children} {/* for button */}
//       </header>
//     );
//   }
// }

export default App;