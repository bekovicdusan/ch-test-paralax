import React, { useState, useEffect } from 'react';
import Card from '../UI/Card';

import classes from './user.module.css';

const User = (props) => {
  const [shouldShow, setShouldShow] = useState(false);

  const delayRender = () => {
    const id = props.user.id;
    let delay = undefined;

    if (id === 1 || id === 4 || id === 7) delay = 0;
    if (id === 2 || id === 5 || id === 8) delay = 250;
    if (id === 3 || id === 6 || id === 9) delay = 500;

    setTimeout(() => {
      setShouldShow(true)
    }, delay)
  }

  useEffect(() => {
    delayRender();
  }, [])

  return (
    <div className={`${classes.user} ${shouldShow ? classes.show : null}`}>
      <h2 className={classes['user-headline']}>User No. { props.user.id }</h2>  
      <Card>
        <ul className={classes['list-wrapper']}>
          <li className={classes['list-item']}><span className={classes.label}>Name:</span> { props.user.name }</li>
          <li className={classes['list-item']}><span className={classes.label}>E-Mail Address:</span> { props.user.email }</li>
          <li className={classes['list-item']}><span className={classes.label}>Phone Number:</span> { props.user.phone }</li>
          <li className={classes['list-item']}><span className={classes.label}>Street:</span> { props.user.address.street }</li>
          <li className={classes['list-item']}><span className={classes.label}>City:</span> { props.user.address.city }</li>
          <li className={classes['list-item']}><span className={classes.label}>Zipcode:</span> { props.user.address.zipcode }</li>
        </ul>
      </Card>
    </div>
  )
};

export default User;
