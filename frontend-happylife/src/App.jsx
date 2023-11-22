import { Header, Body, Footer } from "./login";
import Nav from "./components/Nav";
const App = () => (
    <main className='relative'>
      <Nav/>
      <section className='xl:padding-1 wide:padding-r padding-b'>
      <Header/>
      </section>
      <section className='xl:padding-1 wide:padding-r padding-b'>
      <Body/>
      </section>
      <section className='xl:padding-1 wide:padding-r padding-b'>
      <Footer/>
      </section>


    </main>
  )
export default App