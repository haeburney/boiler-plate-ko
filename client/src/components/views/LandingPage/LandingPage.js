import React,{useEffect} from 'react'
import axios from 'axios';
//import { acceptsEncodings } from 'express/lib/request';
import { useNavigate } from 'react-router-dom';

function LandingPage(props) {
  let navigate = useNavigate();

  useEffect(()=> {
    axios.get('/api/hello')
    //랜딩페이지에 들어오자마자 시작하는 것, request를 서버로 보내는 것?
    .then(response => {console.log(response)})
  }, [])

  const onClickHandler = () => {
    axios.get('/api/users/logout')
    .then ( response =>{
        if(response.data.success){
          navigate('/login');
        } else {
          alert('로그아웃하는데 실패했습니다.')
        }
    })
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center'
      , width: '100%', height: '100vh'
    }}>
      <h2>시작 페이지</h2>

      <button onClick={onClickHandler}>
        로그아웃 
      </button>
    </div>
  )
}

export default LandingPage
