import Navigation from '../../components/shared/Navigation';
import Footer from '../../components/shared/Footer';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import React from 'react';

const ContactItem = ({ icon, text } : {icon : any, text : string}) => (
  <li className="py-3 flex items-center list-none">
    {React.cloneElement(icon , { size: 16 })}
    <p className="ml-2 text-base">{text}</p>
  </li>
);

interface IPeopleCard {
  imageSrc: string;
  name: string;
  position: string;
  phone: string;
  email: string;
}

const PeopleCard = ({ imageSrc, name, position, phone, email } : IPeopleCard) => (
  <div className="pb-6 flex items-start">
    <img src={imageSrc} alt={`Profile picture of ${name}`} className="w-16 h-16 object-cover mr-4" />
    <p className="m-0 text-base leading-6">
      <span className="text-lg font-semibold block text-black">{name}</span>
      {position} <br /> Phone: {phone} <br />Email: {email}
    </p>
  </div>
);

const Contact = () => {
  return (
    <>
      <Navigation />
      <section className="flex flex-col sm:flex-row justify-between items-center p-5 sm:p-10">
        <div className="sm:w-[40%]">
          <span className="text-base">GET IN TOUCH</span>
          <h2 className="text-3xl py-5">Visit one of our agency locations today and contact us.</h2>
          <h3 className="text-base pb-4">Head Office</h3>
          <ul>
            <ContactItem 
              icon={<MapPin />}
              text="56 Glass Gold Road near St. Road, New York"
            />
            <ContactItem 
              icon={<Mail />}
              text="ContactUs@gmail.com"
            />
            <ContactItem 
              icon={<Phone />}
              text="5354643423"
            />
            <ContactItem 
              icon={<Clock />}
              text="Monday to Saturday: 9:00 to 16:00"
            />
          </ul>
        </div>
        <div className="map w-full h-52 sm:h-96 sm:w-[55%]">
          <iframe 
            className="h-full w-full" 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158083.72648931606!2d-1.542925238614341!3d51.75025883356493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48713380adc41faf%3A0xc820dba8cb547402!2sOxford%2C%20UK!5e0!3m2!1sen!2sin!4v1682152127479!5m2!1sen!2sin" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
      <section id="form-details" className="flex flex-col sm:flex-row justify-between p-5 m-2 sm:m-16 sm:p-5 border border-slate-300 rounded-xl">
        <form className="flex flex-col gap-4 w-full sm:w-[65%]">
          <span className="text-base my-3">LEAVE A MESSAGE</span>
          <h2 className="font-bold text-3xl my-3">We Love To Hear From You.</h2>
          <input type="text" placeholder="Your Name" className="w-full py-3 px-4 border border-slate-300 rounded-xl" />
          <input type="email" placeholder="Your E-mail" className="w-full py-3 px-4 border border-slate-300 rounded-xl" />
          <input type="text" placeholder="Subject" className="w-full py-3 px-4 border border-slate-300 rounded-xl" />
          <textarea cols={30} rows={10} placeholder="Your Message" className="w-full py-3 px-4 border border-slate-300 rounded-xl"></textarea>
          <button className="w-1/3 p-2 bg-slate-800 text-white border border-slate-800 hover:bg-slate-600 hover:text-white duration-500 my-5">Submit</button>
        </form>
        <div className="people">
          <PeopleCard 
            imageSrc="https://gauravssharma.github.io/Cara.in/peaple/1.png"
            name="John Doe"
            position="Senior Marketing Manager"
            phone="+000034352"
            email="xyz@gmail.com"
          />
          <PeopleCard 
            imageSrc="https://gauravssharma.github.io/Cara.in/peaple/2.png"
            name="Jane Smith"
            position="Marketing Coordinator"
            phone="+000034353"
            email="jane.smith@gmail.com"
          />
          <PeopleCard 
            imageSrc="https://gauravssharma.github.io/Cara.in/peaple/3.png"
            name="Alex Johnson"
            position="Sales Manager"
            phone="+000034354"
            email="alex.johnson@gmail.com"
          />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
