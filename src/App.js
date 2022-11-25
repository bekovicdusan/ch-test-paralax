import { useState, useEffect, useRef } from 'react'

import Content from './components/Content';
import Users from './components/Users/Users';

import classes from './app.module.css';
import axios from 'axios';

const App = () => {
  //flag for displaying loading spinner (in this case simple paragraph) before response arrives
  const [isLoading, setIsLoading] = useState(false);

  //storing Y offset in a state to accomplish the parallax effect and conditional rendering of user rows
  const [offsetY, setOffsetY] = useState(0);

  //used ref for storing users instead of state to prevent continuous resetting of the state during component re-evaluation
  const usersRef = useRef([]);

  //storing the count of rows to display
  const rowCountRef = useRef(0);

  //used for increasing the height of the users container
  const backgroundRef = useRef();

  const handleScroll = () => {
    const currentPosition = window.pageYOffset;
    setOffsetY(currentPosition);
    
    //calculating the next breakpoint 
    //for the sake of keeping it simple, the number values are configured specifically for the height of the user cards; could also be dynamic
    const viewportHeight = 480 + (rowCountRef.current * 340);

    const currentHeight = backgroundRef.current.offsetHeight;

    //calculating the final number of rows (assuming we are displaying 3 users per row)
    const ceiling = Math.ceil(usersRef.current.length / 3);

    //if current position is greater than the next breakpoint and row count has not reached the final number of rows to display => increase the current row count
    if (currentPosition > viewportHeight && (rowCountRef.current + 1) <= ceiling) {
      rowCountRef.current = rowCountRef.current + 1;
      //increase the height of user container for every consequent breakpoint except the last one
      if (rowCountRef.current !== ceiling) {
        backgroundRef.current.style.height = currentHeight + 150 + 'px';
      }
    }
  }

  //async function for getting the users
  async function loadUsers() {
    setIsLoading(true);
    const response = await axios('https://jsonplaceholder.typicode.com/users');
    usersRef.current = response.data;
    setIsLoading(false)
  }

  //adding event listener on initial component mount and removing it on component unmount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    //calling the function to load users on initial page load
    loadUsers();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  return (
    <section className={classes.wrapper}>
      <div className={classes.background} style={{ transform: `translateY(${offsetY * 0.7}px)` }}/>
      <div className={classes.tree} style={{ transform: `translateY(${offsetY * 0.5}px)` }} />
      <Content />
      <div ref={backgroundRef} className={classes['fixed-background']}>
        {!isLoading && <Users users={usersRef.current} showRow={rowCountRef.current}/>}
        {isLoading && <p>Loading...</p>}
      </div>
    </section>
  );
}

export default App;
