import React from "react";
import NavbarFW from "../../components/NavbarFW";
import NavbarSup from "../../components/NavbarSup";
import { useNavigate } from "react-router-dom";
const TransferFW = () => {
    const navigate = useNavigate();
    const transferHandler = () => {
        // POST REQUEST TO BACKEND

    }
  return <>
  <NavbarSup />
  <div class="min-h-screen  flex flex-col py-12 sm:px-6 lg:px-8" style={{marginTop: 70}}>
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Transfer Field Worker
        </h2>
        
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white pt-10 pb-8 px-100 shadow sm:rounded-lg sm:px-10">
            <form class="space-y-6" action="#" method="POST">
                <div>
                    <label for="id" class="block text-sm font-semibold text-gray-700">
                        Field Worker ID
                    </label>
                    <div class="mt-1">
                        <input id="email" name="email" type="email" autocomplete="email" required
                            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Enter the ID" />
                    </div>
                </div>

                <div>
                    <label for="location" class="block text-sm font-semibold text-gray-700">
                        Location
                    </label>
                    <div class="mt-1">
                        <input id="password" name="password" type="password" autocomplete="current-password" required
                            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Enter Transfer location" />
                    </div>
                </div>

                {/* <div class="flex items-center justify-content">
                <div class="my-12 border-b text-center">
                        <div
                            class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                            Or sign up with e-mail
                        </div>
                    </div>

                    {/* <div class="text-sm">
                        <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
                            Forgot your password?
                        </a>
                    </div> */}
                {/* </div> */}
                <div class="border-b text-center">
                        <div
                            class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                            Enter location within your district
                        </div>
                    </div>

                <div style={{marginTop: 40}} onClick={{transferHandler}}>
                    <button type="submit"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">

                        Transfer Field Worker
                    </button>
                </div>
            </form>
            
        </div>
    </div>
</div></>;
};

export default TransferFW;
