import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signinSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom'

export default function OAuth() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async ()=>{
        try {
            const auth = getAuth(app);
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider)
            
            const res = await fetch('/server/auth/google', {
                method: 'POST',
                headers:{
                    'Content-type':'application/json',
                },
                body:JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                }),
            });
            const data = await res.json();
            dispatch(signinSuccess(data));
            navigate('/');
        } catch (error) {
            console.log('could not login ', error);
        }
    }
  return (
    <button 
        type='button' onClick={handleGoogleClick} 
        className='bg-red-700 text-white rounded-lg
         p-3 uppercase hover:opacity-90'>
        continue with google
    </button>
    )
}
