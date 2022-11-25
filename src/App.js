import { useState, useEffect, useRef } from 'react'

import Content from './components/Content';
import Users from './components/Users/Users';

import classes from './app.module.css';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offsetY, setOffsetY] = useState(0);

  const [rowsChange, setRowsChange] = useState(false);
  const [showFirstRow, setShowFirstRow] = useState(false);
  const [showSecondRow, setShowSecondRow] = useState(false);
  const [showThirdRow, setShowThirdRow] = useState(false);

  const backgroundRef = useRef();

  const handleScroll = () => {
    setRowsChange(false);
    const positionY = window.pageYOffset;
    setOffsetY(positionY);
    if (positionY > 480 && showFirstRow === false)  {
      console.log('show first row')
      setShowFirstRow(true);
      setRowsChange(true);
    }
    if (positionY > 740 && showSecondRow === false) {
      console.log('show second row')
      setShowSecondRow(true);
      setRowsChange(true);
    }
    if (positionY > 1100 && showThirdRow === false) {
      setShowThirdRow(true);
      setRowsChange(true);
    }
  }

  async function loadUsers() {
    setIsLoading(true);
    const response = await axios('https://jsonplaceholder.typicode.com/users');
    setUsers(response.data)
    setIsLoading(false)
  }

  useEffect(() => {
    console.log('EFFECT RUNNING')
    window.addEventListener('scroll', handleScroll);
    loadUsers();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  useEffect(() => {
    const currentHeight = backgroundRef.current.offsetHeight;


    if (rowsChange === true && currentHeight < 1200){
      backgroundRef.current.style.height = currentHeight + 330 + 'px';
    }
  }, [rowsChange])

  return (
    <section className={classes.wrapper}>
      <div className={classes.background} style={{ transform: `translateY(${offsetY * 0.7}px)` }}/>
      <div className={classes.tree} style={{ transform: `translateY(${offsetY * 0.5}px)` }} />
      <Content />
      <div ref={backgroundRef} className={classes['fixed-background']}>
        {!isLoading && <Users users={users} showFirstRow={showFirstRow} showSecondRow={showSecondRow} showThirdRow={showThirdRow} />}
        {isLoading && <p>Loading...</p>}
      </div>
    </section>
  );
}

export default App;
