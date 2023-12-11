//import {logoTitle} from '../assets/logoTitle.png';
import { useLocation } from "react-router-dom"
export default function Header() {
  const location = useLocation()
  const pathname = location.pathname

  if (!pathname.includes('staff')) {
      return (
        <div className="bg-custom-blue">
            
            <h1 className="pt-7 pb-7 text-center text-4xl font-semibold font-serif text-white">Home</h1>
            {/* <h1 className="pt-7 pb-7 text-center text-4xl font-semibold font-serif text-white">Plans</h1> */}
            {/* <h1 className="pt-7 pb-7 text-center text-4xl font-semibold font-serif text-white">Login</h1> */}
            {/* <h1 className="pt-7 pb-7 text-center text-4xl font-semibold font-serif text-white">Signup</h1> */}
        </div>
      )
    }
}
  
  
  