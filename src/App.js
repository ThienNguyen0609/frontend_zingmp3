import './App.scss';

import Router from './routes/Router';
import { useDispatch } from 'react-redux';
import {getSongs} from './store/features/songs/songSlice'
import { getArtists } from './store/features/artists/artistSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(getSongs())
    dispatch(getArtists())
  }, [])

  return (
    <div className='app-container'>
      <Router />
    </div>
  );
}

export default App;
