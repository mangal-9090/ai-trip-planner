import React, { useEffect, useState } from "react";
import PlaceSearch from "../components/PlaceSearch";
import { Input } from "../components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { chatSession } from "@/service/AIModal";
import logo from '../assets/logo1.png';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";


const CreateTrip = () => {
  const [place, setPlace] = useState([]);

  const [formData,setFormData]=useState([]);

  const [openDialog,setOpenDialog]=useState(false);

  const [loading, setLoading]=useState(false);

  const navigate=useNavigate();

  const handleInputChange=(name,value)=>{

    setFormData({
        ...formData,
        [name]:value
    })
  }

  useEffect(()=>{
    console.log(formData);

  },[formData])

  const login=useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error)=>console.log(error)
  })


  const onGenerateTrip =async() => {

    const user=localStorage.getItem('user');

    if(!user){

      setOpenDialog(true)
      return;
    }

    // Check if all fields are filled in
    if (!formData?.location || !formData?.budget || !formData?.noOfPeople || !formData?.noOfDays) {
        toast('Please fill all the details');
        return;
    }

    // Extract the country and region from the location object
    const locationString = `${formData?.location?.Country?.trim() || ''}, ${formData?.location?.Region?.trim() || ''}`.trim();

    // Log the formData for debugging
    console.log('Form Data:', formData);
    console.log('Formatted Location:', locationString); // Log formatted location

    setLoading(true);
    // Construct the final prompt by replacing placeholders with actual values
    const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', locationString || 'Unknown Location')  // Use formatted location string
        .replace('{totalDays}', formData?.noOfDays)
        .replace('{noOfPeople}', formData?.noOfPeople)
        .replace('{budget}', formData?.budget);

    

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log(result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text())
};

const SaveAiTrip=async(TripData)=>{

  setLoading(true);
  const user=JSON.parse(localStorage.getItem('user'));
  const docId=Date.now().toString()


  await setDoc(doc(db, "AITrips", docId), {
    userSelection:formData,
    tripData:JSON.parse(TripData),
    userEmail:user?.email,
    id:docId
});
setLoading(false);
navigate('/view-trip/'+docId)
}

const GetUserProfile = (tokenInfo) => {
  if (!tokenInfo?.access_token) {
    console.error("No access token provided");
    return;
  }

  axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
    headers: {
      Accept: 'application/json',
    },
  })
  .then((resp) => {
    console.log("User Profile: ", resp.data);
    localStorage.setItem('user',JSON.stringify(resp.data));
    setOpenDialog(false);
    onGenerateTrip();
  })
  .catch((err) => {
    console.error("Error fetching user profile: ", err);
  });
};


  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">

      <h2 className="font-bold text-3xl">Tell us your travel preferences🗺️✈️</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preference
      </p>
      <div className="mt-20 flex flex-col gap-8">

        <div>
    
          <h2 className="text-xl my-3 font-medium">
            Where you want to travel?
          </h2>
        
          <PlaceSearch
  onSelectPlace={(v) => {
    setPlace(v); // Update place state
    handleInputChange('location', v); // Update formData with the selected location
  }}
/>
        
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning for your trip?
          </h2>
          <Input placeholder={"Ex.3"} type="numbers" onChange={(e)=>handleInputChange('noOfDays',e.target.value)} />
        </div>
    
      </div>
      <div>
        <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={()=>handleInputChange('budget',item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget==item.title&&'shadow-lg border-black'}`}>
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl my-3 font-medium">
          Who do you plan on travelling with on your next adventure?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelsList.map((item, index) => (
            <div
              key={index}
              onClick={()=>handleInputChange('noOfPeople',item.people)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.noOfPeople==item.people&&'shadow-lg border-black'}`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 justify-end flex">
      <Button disabled={loading} onClick={onGenerateTrip}>
        {loading?
        <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />:'Generate Trip'}
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="[&>button]:hidden">
          <DialogHeader>
            <DialogTitle>Sign in with google</DialogTitle>
            <DialogDescription>
              
                <img src={logo} alt="App Logo" className="h-12 mx-auto pb-1" />
              

              
                
                Sign in to the app with google authentication
              

              <Button onClick={login} className='w-full mt-5 flex gap-4 items-center'>
                
                <FcGoogle className="h-7 w-7" />Sign in with google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>


    </div>


  );
};

export default CreateTrip;