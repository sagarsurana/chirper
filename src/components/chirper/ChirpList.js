import React, { Component } from 'react'; //import React Component
import Time from 'react-time'
import './Chirper.css'; //load module-specific CSS
import firebase from 'firebase/app';

//A list of chirps that have been posted
export default class ChirpList extends Component {
  constructor(props) {
    super(props);
    this.state = { chirps: [] };
  }

  componentDidMount() {
    this.chirpsRef = firebase.database().ref('chirps');
    console.log(this.chirpsRef);
    this.chirpsRef.on('value', (snapshot) => {
      this.setState({
        chirps: snapshot.val()
      })
    })
  }

  componentWillUnmount() {
    this.chirpsRef.off();
  }

  render() {
    if (!this.state.chirps) return null; //if no chirps, don't display

    /* TODO: produce a list of `<ChirpItems>` to render */
    let chirpItems = []; //REPLACE THIS with an array of actual values!

    let chirpKeys = Object.keys(this.state.chirps);

    let chirpArray = chirpKeys.map((key) => {
      let chirpObj = this.state.chirps[key];
      console.log(chirpObj);
      chirpObj.id = key;
      return chirpObj;
    });

    chirpItems = chirpArray.map((chirpObj) => {
      return (
        <ChirpItem chirp={chirpObj} currentUser={this.props.currentUser} key={chirpObj.id} />
      )
    });

    return (
      <div className="container">
        {chirpItems}
      </div>);
  }
}

//A single Chirp
class ChirpItem extends Component {

  likeChirp() {
    /* TODO: update the chirp when it is liked */
    let reference = firebase.database().ref("chirps/" + this.props.chirp.id + "/likes");
    console.log(reference);
    let likeObj = this.props.chirp.likes;
    if (likeObj === undefined) {
      likeObj = {
        [this.props.currentUser.uid]: true
      }
    } else {
      if (likeObj[this.props.currentUser.uid] === true) {
        likeObj[this.props.currentUser.uid] = null;
      } else {
        likeObj[this.props.currentUser.uid] = true;
      }
    }
    reference.set(likeObj).catch(function (error) {
      console.log(error);
    });
  }

  render() {
    let chirp = this.props.chirp; //current chirp (convenience)
    //counting likes
    let likeCount = 0; //count likes
    let userLikes = false; //current user has liked
    if (chirp.likes) {
      likeCount = Object.keys(chirp.likes).length;
      if (chirp.likes[this.props.currentUser.uid]) {//if user id is listed
        userLikes = true; //user liked!
      }
    }

    return (
      <div className="row py-4 bg-white border">
        <div className="col-1">
          <img className="avatar" src={chirp.userPhoto} alt={chirp.userName + ' avatar'} />
        </div>
        <div className="col pl-4 pl-lg-1">

          <span className="handle">{chirp.userName} {/*space*/}</span>

          <span className="time"><Time value={chirp.time} relative /></span>

          <div className="chirp">{chirp.text}</div>

          {/* A section for showing chirp likes */}
          <div className="likes">
            <i className={'fa fa-heart ' + (userLikes ? 'user-liked' : '')} aria-label="like" onClick={() => this.likeChirp()} ></i>
            <span>{/*space*/} {likeCount}</span>
          </div>
        </div>
      </div>
    );
  }
}
