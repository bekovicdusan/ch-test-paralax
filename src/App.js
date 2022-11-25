import { useState, useEffect, useRef } from 'react'

import Content from './components/Content';
import Users from './components/Users/Users';

import classes from './app.module.css';
import axios from 'axios';

const App = () => {
  const usersRef = useRef([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offsetY, setOffsetY] = useState(0);
  const rowCountRef = useRef(0);

  const backgroundRef = useRef();

  const handleScroll = () => {
    const positionY = window.pageYOffset;
    setOffsetY(positionY);

    const viewportHeight = 480 + (rowCountRef.current * 340);
    const currentHeight = backgroundRef.current.offsetHeight;
    const ceiling = Math.ceil(usersRef.current.length / 3);

    if (positionY > viewportHeight && (rowCountRef.current + 1) <= ceiling) {
      rowCountRef.current = rowCountRef.current + 1;
      if (rowCountRef.current !== ceiling) {
        backgroundRef.current.style.height = currentHeight + 150 + 'px';
      }
    }
  }

  async function loadUsers() {
    setIsLoading(true);
    const response = await axios('https://jsonplaceholder.typicode.com/users');
    usersRef.current = response.data;
    setIsLoading(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
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
