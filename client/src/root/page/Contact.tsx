import Navigation from '../../components/shared/Navigation';
import Footer from '../../components/shared/Footer';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context';
import { useSendContactformDetails } from '@/query/promotional.queries';
import { IContactForm } from '@/types';
import Meta from '@/utils/Meta';

const ContactItem = ({ icon, text }: { icon: any, text: string }) => (
  <li className="py-3 flex items-center list-none">
    {React.cloneElement(icon, { size: 16 })}
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

const PeopleCard = ({ imageSrc, name, position, phone, email }: IPeopleCard) => (
  <div className="pb-6 flex items-start">
    <img loading='lazy' src={imageSrc} alt={`Profile picture of ${name}`} className="w-16 h-16 object-cover mr-4" />
    <p className="m-0 text-base leading-6">
      <span className="text-lg font-semibold block text-black">{name}</span>
      {position} <br /> Phone: {phone} <br />Email: {email}
    </p>
  </div>
);



const Contact = () => {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState<IContactForm>({
    name: user?.name || "",
    email: user?.email || "",
    subject: "",
    message: "",
  });

  const { mutateAsync: sendContactFormDetails } = useSendContactformDetails();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendContactFormDetails(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <Meta
        title="Contact Us - Sara-Ecommerce"
        description="Get in touch with Sara-Ecommerce. Visit our head office or contact us via email or phone. We are here to assist you with any inquiries or support you need."
        keywords="Sara-Ecommerce contact, Sara-Ecommerce contact, contact Sara Store, Sara Store head office, Sara-Ecommerce email, Sara-Ecommerce phone"
      />
      <Navigation />
      <section className="flex flex-col sm:flex-row justify-between items-center p-5 sm:p-10">
        <div className="sm:w-[40%]">
          <span className="text-base">GET IN TOUCH</span>
          <h2 className="text-3xl py-5">Visit one of our agency locations today and contact us.</h2>
          <h3 className="text-base pb-4">Head Office</h3>
          <ul>
            <ContactItem icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>} text="56 Glass Gold Road near St. Road, New York" />
            <ContactItem icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>} text="ContactUs@gmail.com" />
            <ContactItem icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>} text="5354643423" />
            <ContactItem icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>} text="Monday to Saturday: 9:00 to 16:00" />
          </ul>
        </div>
        <div className="map w-full h-52 sm:h-96 sm:w-[55%]">
          <iframe
            className="h-full w-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158083.72648931606!2d-1.542925238614341!3d51.75025883356493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48713380adc41faf%3A0xc820dba8cb547402!2sOxford%2C%20UK!5e0!3m2!1sen!2sin!4v1682152127479!5m2!1sen!2sin"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
      <section id="form-details" className="flex flex-col sm:flex-row justify-between p-5 m-2 sm:m-16 sm:p-5 border border-slate-300 rounded-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full sm:w-[65%]">
          <span className="text-base my-3">LEAVE A MESSAGE</span>
          <h2 className="font-bold text-3xl my-3">We Love To Hear From You.</h2>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full py-3 px-4 border border-slate-300 rounded-xl"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Your E-mail"
            className="w-full py-3 px-4 border border-slate-300 rounded-xl"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            className="w-full py-3 px-4 border border-slate-300 rounded-xl"
            value={formData.subject}
            onChange={handleChange}
          />
          <textarea
            name="message"
            cols={30}
            rows={10}
            placeholder="Your Message"
            className="w-full py-3 px-4 border border-slate-300 rounded-xl"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button className="w-1/3 p-2 bg-slate-800 text-white border border-slate-800 hover:bg-slate-600 hover:text-white duration-500 my-5">Submit</button>
        </form>
        <div className="people">
          <PeopleCard
            imageSrc="https://gauravssharma.github.io/cara.in/peaple/1.png"
            name="John Doe"
            position="Senior Marketing Manager"
            phone="+000034352"
            email="xyz@gmail.com"
          />
          <PeopleCard
            imageSrc="https://gauravssharma.github.io/cara.in/peaple/2.png"
            name="Jane Smith"
            position="Marketing Coordinator"
            phone="+000034353"
            email="jane.smith@gmail.com"
          />
          <PeopleCard
            imageSrc="https://gauravssharma.github.io/cara.in/peaple/3.png"
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
