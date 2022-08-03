import React,{useEffect} from 'react'
import axios from 'axios';

function LandingPage() {
  useEffect(()=> {
    axios.get('/api/hello')
    //랜딩페이지에 들어오자마자 시작하는 것, request를 서버로 보내는 것?
    .then(response => {console.log(response)})
  }, [])

  return (
    <div>
      LandingPage
    </div>
  )
}

export default LandingPage
