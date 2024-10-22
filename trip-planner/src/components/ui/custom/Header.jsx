import React, { useEffect, useState } from 'react';
import { Button } from '../button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useNavigation } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from 'axios';

// Import your PNG logo
import logo from '../../../assets/logo1.png';  // Adjust the path based on your folder structure

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    if (!tokenInfo?.access_token) {
      console.error("No access token provided");
      return;
    }

    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
        headers: { Accept: 'application/json' },
      })
      .then((resp) => {
        console.log("User Profile: ", resp.data);
        localStorage.setItem('user', JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error fetching user profile: ", err);
      });
  };

  return (
    <div className="p-3 shadow-md flex justify-between items-center px-5">
      {/* Replace the logo.svg with your PNG logo */}
      <img src={logo} alt="App Logo" className="h-12" />

      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full border-gray-400 hover:border-gray-600 hover:shadow-md">
                + Create Trip
              </Button>
            </a>

            <a href="/my-trips">
              <Button variant="outline" className="rounded-full border-gray-400 hover:border-gray-600 hover:shadow-md">
                My Trips
              </Button>
            </a>

            <Popover>
              <PopoverTrigger className="p-0 bg-transparent border-none">
                <img src={user?.picture} className="h-[35px] w-[35px] rounded-full object-cover" />
              </PopoverTrigger>
              <PopoverContent>
                <h3
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </h3>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign in</Button>
        )}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="[&>button]:hidden">
          <DialogHeader>
            <DialogTitle>Sign in with google</DialogTitle>
            <DialogDescription>
              
                {/* Use the PNG logo here as well */}
                <img src={logo} alt="App Logo" className="h-12 mx-auto pb-1" />
              

              
                
                Sign in to the app with Google authentication
              

              <Button onClick={login} className="w-full mt-5 flex gap-4 items-center">
                <FcGoogle className="h-7 w-7" />Sign in with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
