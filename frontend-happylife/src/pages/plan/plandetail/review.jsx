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

   const review = [
    {
      descriptionTitle: "Very professional eye exam",
      description: "The staff and doctors are friendly and knowledgeable they want you to be as healthy and comfortable. ",
      image:Avatar,
      customerName:"- Vương Tấn Phát",
      customerRole:"Role",
    },
    {
      descriptionTitle: "Change for the world! ",
      description: "They fit me in right away and got my <br/>injury addressed and on the road to quickly recovery! ",
      image:Avatar,
      customerName:"- Nguyễn Thị Tuyết Anh",
      customerRole:"Role",
    },
    {
      descriptionTitle: "Impressive Technology ",
      description: "The staff was very friendly and the doctor made it very easy to understand the results. ",
      image:Avatar,
      customerName:"- Ngô Hữu Phúc",
      customerRole:"Role",
    },
    {
      descriptionTitle: "Exceptional Dental Care",
      description: "I had a great experience with their dental services. The team is skilled and caring, ensuring a pain-free and comfortable visit. The facility is modern, and they prioritize patient education for better oral health.",
      image: "Avatar",
      customerName: "- Phạm Lê Hoài Minh",
      customerRole: "Satisfied Patient"
    },
    {
      descriptionTitle: "Efficient Urgent Care",
      description: "Visited for an urgent medical concern and was impressed by their quick response and efficient service. The medical staff was attentive and thorough in their examination. Grateful for their professionalism and dedication.",
      image: "Avatar",
      customerName: "- Phan Thiện Nhân ",
      customerRole: "Grateful Visitor"
    },
    {
      descriptionTitle: "Holistic Wellness Center",
      description: "This wellness center provides a holistic approach to health. From fitness programs to nutritional guidance, they prioritize overall well-being. The staff is friendly, and the atmosphere promotes a sense of tranquility and healing.",
      image: "Avatar",
      customerName: "- Đặng Văn Bình",
      customerRole: "Wellness Enthusiast"
    }
    

  ];

  return (
    <div className="pt-14 pb-14 bg-custom-blue">
      <div className="pt-6 pb-14 container mx-auto bg-custom-blue-3">
        <h1 className="pb-3 pt-7 text-center text-4xl font-semibold font-serif text-custom-blue">Our Patients are Saying</h1>
        
        <div className="pt-6 pb-4  container mx-auto pl-24 pr-24 ">
        <Slider {...settings} className="slick-slider-no-arrows  ">
        {review.map((review,index) => ( 
          <div key={index} className="p-8 rounded-lg">
          <p className="text-2xl text-custom-blue-3">{review.descriptionTitle}</p>
          <p className="mt-3 mb-3 font-normal font-['IBM Plex Sans'] leading-[30px]">{review.description}</p>
          <div className="flex flex-row">
              {/* <div className="basis-1/5  ">
                  <img src={Avatar} alt="LOGO" className="item-center rounded-full pt-1.5" style={{ maxWidth: '50px', height: 'auto' }} ></img>
              </div> */}
              <div className="basis-4/5 ">
                  <p className=" text-custom-blue font-bold font-['Inter'] leading-[21px]">{review.customerName}</p>
                  
              </div>
          </div>
        </div>
        ))}
         

        </Slider>
        </div>
        
      </div>
    </div>
  );
}





  