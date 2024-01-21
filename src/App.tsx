import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import ChatCollapse from './app/chat/chat.collapse';
import { Provider } from 'react-redux';
import store from './store';
import { useAppDispatch, useAppSelector } from 'hooks/redux.hooks';
import { connectToSocket, disconnectFromSocket } from 'app/chat/store/chat.actions';
import { chatSelector } from 'app/chat/store/chat.selectors';
import { setUser } from 'app/chat/store/chat.slice';

function App() {
  const dispatch = useAppDispatch()
  const chat = useAppSelector(chatSelector)
  const tokens = [
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmbXdxbWZkaXNvY21hc2xuZiIsInJvbGUiOiJjbGllbnQiLCJuYW1lIjoiUGF0cmljayBBZGFtcyIsImlhdCI6MTUxNjIzOTAyMn0.-9JTEEt4qMd9ZOrg39ZAIob_bn4hO44hvk6KY15VoDU',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmbXdxbWZkaXNvY21hc2xuZiIsInJvbGUiOiJjbGllbnQiLCJuYW1lIjoiSm9obiBKb25lcyIsImlhdCI6MTUxNjIzOTAyMn0.ecoAcUgMd-eVedX8uG0CQh58OM4vVWjySzKFAL9Q5iQ',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmbXdxbWZkaXNvY21hc2xuZiIsInJvbGUiOiJjbGllbnQiLCJuYW1lIjoiTWljayBHb3Jkb24iLCJpYXQiOjE1MTYyMzkwMjJ9.L6I0mLJZdiMnI2vH7qAWDCnGK02je7LCPxTFq68Zke0'
  ]
  useEffect(() => {
    dispatch(connectToSocket(tokens[Math.floor(Math.random()*tokens.length)]))
    return () => {
      if (chat.connected === true) {
        dispatch(disconnectFromSocket());
      }
    };
  }, [dispatch])

  return (
    <Provider store={store}>
        <ChatCollapse></ChatCollapse>
    </Provider>
  );
}

export default App;
