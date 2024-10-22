import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from '../components/infoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

const Viewtrip = () => {

    const {tripId}=useParams();
    const [trip,setTrip]=useState([]);

    useEffect(()=>{
        tripId&&GetTripData();

    },[tripId])

    /**
     * used to get trip information from the firebase
     */

    const GetTripData=async()=>{
        const docRef=doc(db,'AITrips',tripId);
        const docSnap=await getDoc(docRef);

        if(docSnap.exists()){
            console.log("Document:",docSnap.data());
            setTrip(docSnap.data());
        }
        else{
            console.log("No such document");
            toast('No trip found!')
        }
    }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        {/*information section*/}
        <InfoSection trip={trip}/>

        {/*recommended hotels*/}
        <Hotels trip={trip} />

        {/*daily plans*/}
        <PlacesToVisit trip={trip}/>

        {/*footer*/}
        <Footer trip={trip}/>
    </div>
  )
}

export default Viewtrip