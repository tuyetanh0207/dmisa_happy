// import Productteaser from '../../components/productteaser.jsx'
import Registrationteaser from '../../components/registrationteaser'

const registration = () => {
  return (
    <div className='h-screen flex items-center flex-col  h-[1920px] bg-bgr-white my-auto'>
      <div className='mt-[30px] mb-[50px]'>
        <Registrationteaser paymentStatus='paid'/>
      </div>
      <div className='mb-[50px]'>
        <Registrationteaser paymentStatus='pending'/>
      </div>
      <div className='mb-[50px]'>
        <Registrationteaser  paymentStatus='unpaid'/>
      </div>  
    </div>
  )
}

export default registration