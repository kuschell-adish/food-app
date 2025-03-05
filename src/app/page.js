'use client'; 
import { useRouter } from 'next/navigation';
import { useState } from 'react'; 

export default function Home() {
  const router = useRouter();
  const [isSliding, setIsSliding] = useState(false); 

  const images = {
    'landing' : 'https://images.unsplash.com/photo-1610441009633-b6ca9c6d4be2?q=80&w=2600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    'logo' : 'https://images.unsplash.com/vector-1739809596425-35fa340f2ab0?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }; 

  const handleButtonClick = (e) => {
    e.preventDefault();
    setIsSliding(true); 
    setTimeout(() => {
      router.push('/steps'); 
    }, 300);
  };

  return (
    <div className={`w-full h-screen flex flex-col sm:flex-row overflow-x-auto sm:overflow-x-hidden transition-all duration-300 ease-out ${isSliding ? '-translate-x-full' : ''}`}>
      <div className="w-full sm:w-1/2">
        <img src={images.landing} alt="landing" className="w-full h-full object-cover" />
      </div>
      <div className="w-full sm:w-1/2 bg-custom-red text-white flex flex-col gap-y-2 p-10 justify-center">
        <div className="flex flex-row gap-x-1 items-center">
          <img src={images.logo} alt="logo" className="h-8" />
          <p className="font-semibold text-custom-yellow text-sm md:text-lg tracking-wide">acai bowl co.</p>
        </div>
        <p className="text-justify mt-2 sm:text-xs md:text-sm">Create your perfect acai bowl with endless customization options! Start with a base like acai, pitaya, or coconut, then add fresh fruits, crunchy granola, honey, nut butter, and more. Whether you're craving something sweet, savory, or healthy, the possibilities are limitless. With a focus on fresh, high-quality ingredients, you can build a bowl that suits your dietary preferences, including vegan and gluten-free options. It’s all about 
          <span className="font-semibold text-custom-yellow"> “your bowl, your way” </span>—a delicious, personalized treat that's as unique as you are!
        </p>
        <button onClick={handleButtonClick} className="text-sm mt-5 group p-5 cursor-pointer relative border-0 flex items-center justify-center bg-transparent text-custom-yellow h-auto w-full overflow-hidden transition-all duration-100">
          <span className="group-hover:w-full absolute left-0 h-full w-5 border-y border-l border-white transition-all duration-500" />
          <p className="font-semibold group-hover:opacity-0 group-hover:translate-x-[-100%] absolute translate-x-0 transition-all duration-200">Ready to Create? </p>
          <div className="flex flex-row gap-x-2 items-center group-hover:translate-x-0  group-hover:opacity-100 absolute translate-x-full opacity-0  transition-all duration-200">
            <span className="font-semibold">Begin Crafting</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </div>
          <span className="group-hover:w-full absolute right-0 h-full w-5  border-y border-r  border-white transition-all duration-500" />
        </button>
      </div>
    </div>
  );
}
