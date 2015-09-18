import React, {Component} from "react"
import ReactDOM, {render} from "react-dom"
import Relay from "react-relay"

class User extends Component {
  render() {

    var {id, name, email} = this.props.user

    return (
      <li key={id}>
        <p>{name}</p>
        <p>{email}</p>
        <p>{id}</p>
      </li>
    )
  }
}

User = Relay.createContainer(User, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        name,
        email,
        id,
      }
    `,
  }
})

class UserStore extends Component {
  render() {
    return (
      <ul>
        {this.props.store.users.map((user, index) => {
          return <User key={index} user={user} />
        })}
      </ul>
    )
  }
}

UserStore = Relay.createContainer(UserStore, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        users { ${User.getFragment('user')} }
      }
    `
  }
})

class UserHomeRoute extends Relay.Route {
  static routeName = 'Home';
  static queries = {
    store: (Component) => Relay.QL`
      query UserStoreQuery {
        store { ${Component.getFragment('store')} },
      }
    `,
  };
}

ReactDOM.render(
  <Relay.RootContainer
    Component={UserStore}
    route={new UserHomeRoute()} />, document.getElementById("main")
)
