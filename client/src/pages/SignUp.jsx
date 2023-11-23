import {Link} from 'react-router-dom'
export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-8'>Sign Up</h1>
      <form className='flex flex-col gap-3'>
        <input text="text" placeholder='username' id='username' className='bg-slate-100 p-3 rounded-lg' />
        <input text="email" placeholder='email' id='email' className='bg-slate-100 p-3 rounded-lg' />
        <input text="password" placeholder='email' id='password' className='bg-slate-100 p-3 rounded-lg' />
        <button className='bg-slate-600 p-3 rounded-lg text-white uppercase hover:opacity-90 disabled:opacity-75'>Sign Up</button>
      </form>
      <div className='flex gap-2 mt-3'>
        <p className=''>Have an account?</p>
        <Link to='/signin'>
          <span className='text-blue-400'>SignIn</span>
        </Link>
      </div>
    </div>
  )
}
