import User from './User';

import classes from './users.module.css';

const Users = (props) => {
  const users = props.users;
  
  const startSlice = (props.showRow - 1) * 3;
  const endSlice = startSlice + 3;

  //used for selectively allowing individual users to be rendered in groups of three
  const displayRow = users.slice(0, endSlice);

  return (
    <>
      <div className={classes.headline}>
        <h1>Users:</h1>
        <hr/>
      </div>
      <div className={classes['users-wrapper']}>
        {props.showRow > 0 && displayRow.map(user => (
          <User user={user} key={user.id} />
        ))}
      </div>
    </>
  )
};

export default Users;