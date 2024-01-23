import Header from '../../components/header.jsx';
import Cover from '../../images/cover.jpg';
import Family from '../../images/happy-family.jpg';
import ProtectionLife from '../../images/life-protection.png';
import CustomizedSolutions from '../../images/CustomizedSolutions.png';
import FinancialSecurity from '../../images/FinancialSecurity.png';
import HealthCoverage from '../../images/HealthCoverage.png';
import VTP from '../../images/VTP.jpg';
import NTTA from '../../images/NTTA.jpg';
import House from '../../images/house.png';
import HeartAttack from '../../images/heart-attack.png';
import './style.css'
import {
  HeartIcon,
  HomeIcon
} from "@heroicons/react/24/outline";

export default function Home() {
      
      return(
      <div>
        {/* Hero Section */}
        <div class="bg-white">
          <section class="cover relative bg-[#5576F5] px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 overflow-hidden py-48 flex
          items-center">
            <div class="h-full w-full absolute top-0 left-0 z-0">
              <img src={Cover} alt="" class="object-cover opacity-50"></img>
            </div>

            <div class="lg:w-3/4 xl:w-2/4 relative z-10 h-100 lg:mt-16">
              <div>
                <h1 class="text-white text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">A better life starts with good health.</h1>
                <p class="text-white text-xl md:text-2xl leading-snug mt-4">Welcome to HappyLife Insurance, where trust and comfort take top priority in safeguarding your future.</p>
                <a href="#" class="px-8 py-4 bg-[#5576F5] text-white rounded inline-block mt-8 font-semibold">Book
                  Appointment</a>
              </div>
            </div>
          </section>
        </div>

        {/* About Section */}
        <section class="relative px-4 py-16 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 lg:py-32">
          <div class="flex flex-col lg:flex-row lg:-mx-8">
            <div class="w-full lg:w-1/2 lg:px-8">
              <h2 class="text-3xl leading-tight font-bold mt-4">Welcome to the HappyLife Insurance</h2>
              <p class="text-lg mt-4 font-semibold">Protection and Peace of Mind Tailored for You</p>
              <p class="mt-2 leading-relaxed">Donec convallis sollicitudin facilisis. Integer nisl ligula, accumsan non tincidunt ac, 
              imperdiet in enim. Donec efficitur ullamcorper metus, eu venenatis nunc. Nam eget neque tempus, mollis sem a, faucibus mi.</p>
            </div>

            <div class="w-full lg:w-1/2 lg:px-8 mt-12 lg:mt-0">
              <div class="md:flex">
                <div>
                <button
                  type="button"
                  class="mb-2 inline-block rounded-full p-3 bg-blue-600 w-16 h-16">
                  <img src={House} alt="" />
                </button>
                </div>
                <div class="md:ml-8 mt-4 md:mt-0">
                  <h4 class="text-xl font-bold leading-tight">Everything You Need Under One Roof</h4>
                  <p class="mt-2 leading-relaxed">At HappyLife Insurance, we provide a comprehensive range of coverage options to meet all your insurance needs, 
                  ensuring your peace of mind. From life insurance and health coverage to property and investment protection, 
                  our state-of-the-art services are designed to cater to every aspect of your financial security.</p>
                </div>
              </div>

              <div class="md:flex mt-8">
              <div>
                <button
                  type="button"
                  class="mb-2 inline-block rounded-full p-3 bg-blue-600 w-16 h-16 ">
                  <img src={HeartAttack} alt="" class="mt-1"/>
                </button>
                </div>
                <div class="md:ml-8 mt-4 md:mt-0">
                  <h4 class="text-xl font-bold leading-tight">Our Client-Centric Approach</h4>
                  <p class="mt-2 leading-relaxed">Your insurance plan is crafted with precision to align seamlessly with your unique requirements, lifestyle, and aspirations. 
                  Whether you're just starting to build your coverage or looking to enhance existing policies, our dedicated team is here to guide you. 
                  We prioritize your comfort and understanding, making the process as smooth as possible. 
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="md:flex md:flex-wrap mt-24 text-center md:-mx-4">
            <div class="md:w-1/2 md:px-4 lg:w-1/4">
              <div class="bg-white rounded-lg border border-gray-300 p-8">
                <img src={ProtectionLife} alt="" class="h-20 mx-auto"></img>

                <h4 class="text-xl font-bold mt-4">Life Protection</h4>
                <p class="mt-1">Explore the breadth of our life insurance options designed to safeguard your loved ones and secure their financial future.</p>
              
              </div>
            </div>

            <div class="md:w-1/2 md:px-4 mt-4 md:mt-0 lg:w-1/4">
              <div class="bg-white rounded-lg border border-gray-300 p-8">
                <img src={HealthCoverage} alt="" class="h-20 mx-auto"></img>

                <h4 class="text-xl font-bold mt-4">Health Coverage</h4>
                <p class="mt-1">Experience the peace of mind that comes with comprehensive health insurance, tailored to meet your unique needs.</p>

              </div>
            </div>

            <div class="md:w-1/2 md:px-4 mt-4 md:mt-8 lg:mt-0 lg:w-1/4">
              <div class="bg-white rounded-lg border border-gray-300 p-8">
                <img src={FinancialSecurity} alt="" class="h-20 mx-auto"></img>

                <h4 class="text-xl font-bold mt-4">Financial Security</h4>
                <p class="mt-1">From property protection to investment strategies, our range of services ensures your financial is in expert hands.</p>

              </div>
            </div>

            <div class="md:w-1/2 md:px-4 mt-4 md:mt-8 lg:mt-0 lg:w-1/4">
              <div class="bg-white rounded-lg border border-gray-300 p-8">
                <img src={CustomizedSolutions} alt="" class="h-20 mx-auto"></img>

                <h4 class="text-xl font-bold mt-4">Customized Solutions</h4>
                <p class="mt-1">At HappyLife Insurance, we pride on crafting personalized insurance plans that align with your lifestyle and goals.</p>

              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section class="relative bg-[#F5F9FD] px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 py-16 lg:py-32">
          <div class="flex flex-col lg:flex-row lg:-mx-8">
            <div class="w-full lg:w-1/2 lg:px-8">
              <h2 class="text-3xl leading-tight font-bold mt-4 mb-4">Why choose HappyLife?</h2>
              <p class="mt-2 leading-relaxed mb-10">Choose HappyLife Insurance for personalized, comprehensive coverage tailored to your unique needs. 
              With a proven track record, our experienced team is dedicated to your peace of mind and overall satisfaction. Trust us for more than just 
              a policy – choose a partner committed to your lasting security</p>
              <a href="#" class="text-white bg-[#5576F5] font-bold rounded-lg px-5 py-2.5 mr-2 mb-2">Discover now</a>
            </div>

            <div class="w-full md:max-w-md md:mx-auto lg:w-1/2 lg:px-8 mt-12 mt:md-0">
              <div class="bg-gray-400 w-full h-72 rounded-lg">
                <img src={Family} alt="happy-family" class="f-height mx-auto"/>
              </div>

              <p class="italic text-sm mt-2 text-center">Aenean ante nisi, gravida non mattis semper.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section class="bg-[#182256]">
            <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                <div class="mx-auto text-center">
                    <h2 class="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-white">Protect your happiness with HappyLife Insurance.</h2>
                    <p class="mb-6 font-light text-white md:text-lg">Secure your happiness with HappyLife Insurance today – choose personalized protection for a worry-free tomorrow.</p>
                    <a href="#" class="text-white bg-[#5576F5] font-bold rounded-lg px-5 py-2.5 mr-2 mb-2">Get a quote now!</a>
                </div>
            </div>
        </section>
        
        {/* Blog Section */}
        <div class="container my-24 mx-auto md:px-6">
          <section class="mb-32 text-center">
            <h2 class="mb-12 text-3xl font-bold">My Clients</h2>

            <div class="grid gap-x-6 md:grid-cols-3 lg:gap-x-12">
              <div class="mb-12 md:mb-0">
                <div class="mb-6 flex justify-center">
                  <img src={VTP}
                    class="w-32 rounded-full shadow-lg dark:shadow-black/20" />
                </div>
                <h5 class="mb-2 text-lg font-bold">Vương Tấn Phát</h5>
                <h6 class="mb-4 font-medium text-primary dark:text-primary-400">
                  Graphic Designer
                </h6>
                <p class="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos
                  id officiis hic tenetur quae quaerat ad velit ab hic.
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="inline-block w-6">
                    <path fill="currentColor"
                      d="M580 556h160V396H580v160Zm-360 0h160V396H220v160Zm406 220 80-160H520V336h280v288l-76 152h-98Zm-360 0 80-160H160V336h280v288l-76 152h-98Zm34-300Zm360 0Z" />
                  </svg>
                </p>
                <ul class="mb-0 flex justify-center">
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                      <path fill="currentColor"
                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                    </svg>
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                      <path fill="currentColor"
                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                    </svg>
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                      <path fill="currentColor"
                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                    </svg>
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                      <path fill="currentColor"
                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                    </svg>
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                      <path fill="currentColor"
                        d="m480 757 157 95-42-178 138-120-182-16-71-168v387ZM233 976l65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                    </svg>
                  </li>
                </ul>
              </div>
              <div class="mb-12 md:mb-0">
                <div class="mb-6 flex justify-center">
                  <img src={NTTA}
                    class="w-32 rounded-full shadow-lg dark:shadow-black/20" />
                </div>
                <h5 class="mb-2 text-lg font-bold">Nguyễn Thị Tuyết Anh</h5>
                <h6 class="mb-4 font-medium text-primary dark:text-primary-400">
                  Web Developer
                </h6>
                <p class="mb-4">
                  Ut enim ad minima veniam, quis nostrum exercitationem ullam
                  corporis suscipit laboriosam, nisi ut aliquid commodi.
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="inline-block w-6">
                    <path fill="currentColor"
                      d="M580 556h160V396H580v160Zm-360 0h160V396H220v160Zm406 220 80-160H520V336h280v288l-76 152h-98Zm-360 0 80-160H160V336h280v288l-76 152h-98Zm34-300Zm360 0Z" />
                  </svg>
                </p>
                <ul class="mb-0 flex justify-center">
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                      <path fill="currentColor"
                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                    </svg>
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                      <path fill="currentColor"
                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                    </svg>
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                      <path fill="currentColor"
                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                    </svg>
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                      <path fill="currentColor"
                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                    </svg>
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                      <path fill="currentColor"
                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                    </svg>
                  </li>
                </ul>
              </div>
              <div class="mb-0">
                <div class="mb-6 flex justify-center">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(9).jpg"
                    class="w-32 rounded-full shadow-lg dark:shadow-black/20" />
                </div>
                <h5 class="mb-2 text-lg font-bold">John Smith</h5>
                <h6 class="mb-4 font-medium text-primary dark:text-primary-400">
                  Marketing Specialist
                </h6>
                <p class="mb-4">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesentium voluptatum deleniti atque corrupti.
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="inline-block w-6">
                    <path fill="currentColor"
                      d="M580 556h160V396H580v160Zm-360 0h160V396H220v160Zm406 220 80-160H520V336h280v288l-76 152h-98Zm-360 0 80-160H160V336h280v288l-76 152h-98Zm34-300Zm360 0Z" />
                  </svg>
                </p>
                <ul class="mb-0 flex justify-center">
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                      <path fill="currentColor"
                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                    </svg>
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                      <path fill="currentColor"
                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                    </svg>
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                      <path fill="currentColor"
                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                    </svg>
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                      <path fill="currentColor"
                        d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                    </svg>
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" class="w-5 text-warning">
                      <path fill="currentColor"
                        d="m323 851 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178Zm-90 125 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z" />
                    </svg>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
        
        

      </div>
      )
}