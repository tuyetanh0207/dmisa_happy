import Header from '../../components/header.jsx';
import Cover from '../../assets/cover-bg.jpg';

export default function Home() {
      
      return(

      <div className="bg-gray-100">
        <section className="cover #5576F5 relative bg-blue-600 px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 overflow-hidden py-48 flex
        items-center min-h-screen">
          <div className="h-full absolute top-0 left-0 z-0">
            <img src={Cover} alt="" className="w-full h-full object-cover opacity-20"></img>
          </div>

          <div className="lg:w-3/4 xl:w-2/4 relative z-10 h-100 lg:mt-16">
            <div>
              <h1 className="text-white text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">A better life starts with a
                beautiful
                smile.</h1>
              <p className="text-blue-100 text-xl md:text-2xl leading-snug mt-4">Welcome to the Dentist Office of Dr. Thomas
                Dooley,
                where
                trust
                and comfort are priorities.</p>
              <a href="#" className="px-8 py-4 bg-teal-500 text-white rounded inline-block mt-8 font-semibold">Book
                Appointment</a>
            </div>
          </div>
        </section>
      </div>

      )
}