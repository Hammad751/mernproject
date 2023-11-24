import { useState } from 'react'
import {Link} from 'react-router-dom'

export default function SignUp() {

  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      setLoading(true)
      const res = await fetch('/server/auth/signin',{
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(formData),
      }
      );
      const data = await res.json();
      setLoading(false);
      if(data.success == false){
        setError(true);
        return;
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
    
  }
  console.log(formData);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-8'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input text="text" placeholder='username' id='username' className='bg-slate-100 p-3 rounded-lg' 
          onChange={handleChange}/>
        <input text="email" placeholder='email' id='email' className='bg-slate-100 p-3 rounded-lg' 
          onChange={handleChange}/>
        <input text="password" placeholder='password' id='password' className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange} />       
        <button className='bg-slate-600 p-3 rounded-lg text-white uppercase hover:opacity-90 disabled:opacity-75'>
          {loading ? "Loading...": "Sign Up"}
        </button>
      </form>
      <div className='flex gap-2 mt-3'>
        <p className=''>Have an account?</p>
        <Link to='/signin'>
          <span className='text-blue-400'>SignIn</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error && "somthing went wrong"}</p>
    </div>
  )
}
