import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx"
import About from "./pages/About.jsx"
import SignIn from "./pages/SignIn.jsx"
import SignUp from "./pages/SignUp.jsx"
import Profile from "./pages/Profile.jsx"
import Header from "./components/Header.jsx";
// import PrivateRoute from "./components/PrivateRoute"
import PrivateRoute from './components/PrivateRoute.jsx'

// everything is covered within browser router
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/signin' element={<SignIn />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App