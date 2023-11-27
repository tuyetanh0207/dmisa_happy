import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Avatar from '../../../assets/avatar.png'
import './review.css'

export default function Review() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,

  };

  return (
    <div className="pt-14 pb-14 bg-custom-blue">
      <div className="pt-6 pb-14 container mx-auto bg-custom-blue-3">
        <h1 className="pb-3 pt-7 text-center text-4xl font-semibold font-serif text-custom-blue">Our Patients are Saying</h1>
        
        <div className="pt-6 pb-4  container mx-auto pl-24 pr-24 ">
        <Slider {...settings} className="slick-slider-no-arrows  ">
          <div className="p-8 rounded-lg">
            <p className="text-2xl text-custom-blue-3">Decription Title1</p>
            <p className="mt-3 mb-3">Decription</p>
            <div className="flex flex-row">
                <div className="basis-1/5  ">
                    <img src={Avatar} alt="LOGO" className="item-center rounded-full pt-1.5" style={{ maxWidth: '50px', height: 'auto' }} ></img>
                </div>
                <div className="basis-4/5  p-1 ">
                    <p>Name</p>
                    <p>Role</p>
                </div>
            </div>
          </div>
          <div className=" p-8 rounded-lg">
            <p className="text-2xl text-custom-blue-3">Decription Title2</p>
            <p className="mt-3 mb-3">Decription</p>
            <div className="flex flex-row">
                <div className="basis-1/5  ">
                    <img src={Avatar} alt="LOGO" className="item-center rounded-full pt-1.5" style={{ maxWidth: '50px', height: 'auto' }} ></img>
                </div>
                <div className="basis-4/5  p-1 ">
                    <p>Name</p>
                    <p>Role</p>
                </div>
            </div>
          </div>
          <div className=" p-8 rounded-lg">
            <p className="text-2xl text-custom-blue-3">Decription Title3</p>
            <p className="mt-3 mb-3">Decription</p>
            <div className="flex flex-row">
                <div className="basis-1/5  ">
                    <img src={Avatar} alt="LOGO" className="item-center rounded-full pt-1.5" style={{ maxWidth: '50px', height: 'auto' }} ></img>
                </div>
                <div className="basis-4/5  p-1 ">
                    <p>Name</p>
                    <p>Role</p>
                </div>
            </div>
          </div>
          <div className=" p-8 rounded-lg">
            <p className="text-2xl text-custom-blue-3">Decription Title4</p>
            <p className="mt-3 mb-3">Decription</p>
            <div className="flex flex-row">
                <div className="basis-1/5  ">
                    <img src={Avatar} alt="LOGO" className="item-center rounded-full pt-1.5" style={{ maxWidth: '50px', height: 'auto' }} ></img>
                </div>
                <div className="basis-4/5  p-1 ">
                    <p>Name</p>
                    <p>Role</p>
                </div>
            </div>
          </div>
          <div className="p-8 rounded-lg">
            <p className="text-2xl text-custom-blue-3">Decription Title5</p>
            <p className="mt-3 mb-3">Decription</p>
            <div className="flex flex-row">
                <div className="basis-1/5  ">
                    <img src={Avatar} alt="LOGO" className="item-center rounded-full pt-1.5" style={{ maxWidth: '50px', height: 'auto' }} ></img>
                </div>
                <div className="basis-4/5  p-1 ">
                    <p>Name</p>
                    <p>Role</p>
                </div>
            </div>
          </div>
          <div className=" p-8 rounded-lg">
            <p className="text-2xl text-custom-blue-3">Decription Title6</p>
            <p className="mt-3 mb-3">Decription</p>
            <div className="flex flex-row">
                <div className="basis-1/5  ">
                    <img src={Avatar} alt="LOGO" className="item-center rounded-full pt-1.5" style={{ maxWidth: '50px', height: 'auto' }} ></img>
                </div>
                <div className="basis-4/5  p-1 ">
                    <p>Name</p>
                    <p>Role</p>
                </div>
            </div>
          </div>

        </Slider>
        </div>
        
      </div>
    </div>
  );
}





  