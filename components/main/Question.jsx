import Link from 'next/link'
import React from 'react'

const Question = () => {
  return (<>
    <div>Join us as</div>
<div className='flex '>
  <Link href='/question-patient'> <button className='black_btn my-5 mr-5 flex'>Patient</button></Link>
 
  <button className='black_btn my-5 '>Doctor</button></div>
  </>
  )
}

export default Question