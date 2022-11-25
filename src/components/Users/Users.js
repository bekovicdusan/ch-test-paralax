import User from './User';

import classes from './users.module.css';

const Users = (props) => {
  const users = props.users;
  const groupOne = users.filter(user => user.id < 4)
  const groupTwo = users.filter(user => user.id > 3 && user.id < 7)
  const groupThree = users.filter(user => user.id > 6 && user.id < 10)
  

  return (
    <>
      <div className={classes.headline}>
        <h1>Users:</h1>
        <hr/>
      </div>
      <div className={classes['users-wrapper']}>
        {props.showFirstRow && groupOne.map(user => (
          <User user={user} key={user.id} />
        ))}
        {props.showSecondRow && groupTwo.map(user => (
          <User user={user} key={user.id} />
        ))}
        {props.showThirdRow && groupThree.map(user => (
          <User user={user} key={user.id} />
        ))}
      </div>
    </>
  )
};

export default Users;