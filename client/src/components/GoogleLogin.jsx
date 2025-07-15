import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import SummaryApi from "../helpers/SummaryApi";

const GoogleLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const googleBtnRef = useRef(null);
    const [isGoogleSDKReady, setIsGoogleSDKReady] = useState(false);
    const [isButtonRendered, setIsButtonRendered] = useState(false);

    useEffect(() => {
        // Function to check if Google SDK is loaded
        const checkGoogleSDK = () => {
            if (window.google && window.google.accounts && window.google.accounts.id) {
                setIsGoogleSDKReady(true);
                initializeGoogleAuth();
            } else {
                // Retry after a short delay
                setTimeout(checkGoogleSDK, 100);
            }
        };

        // Start checking for Google SDK
        checkGoogleSDK();

        // Cleanup function to prevent memory leaks
        return () => {
            if (window.google && window.google.accounts && window.google.accounts.id) {
                try {
                    window.google.accounts.id.cancel();
                } catch (error) {
                    console.log("Google auth cleanup:", error);
                }
            }
        };
    }, []);

    const initializeGoogleAuth = () => {
        try {
            window.google.accounts.id.initialize({
                client_id: "1013984375525-gc4bhvnb2drbdfapnp4dvolgiu5c3ffk.apps.googleusercontent.com",
                callback: handleGoogleResponse,
            });

            // Wait for DOM element to be available
            const renderButton = () => {
                if (googleBtnRef.current && !isButtonRendered) {
                    try {
                        // Clear any existing content
                        googleBtnRef.current.innerHTML = '';
                        
                        window.google.accounts.id.renderButton(googleBtnRef.current, {
                            // theme: "outline",
                            // size: "large",
                            // width: "100%"
                        });
                        
                        setIsButtonRendered(true);
                    } catch (error) {
                        console.error("Error rendering Google button:", error);
                        setIsGoogleSDKReady(false);
                    }
                } else if (!googleBtnRef.current) {
                    // Retry after a short delay if element is not ready
                    setTimeout(renderButton, 100);
                }
            };

            renderButton();
        } catch (error) {
            console.error("Error initializing Google Identity Services:", error);
            setIsGoogleSDKReady(false);
        }
    };

    const handleGoogleResponse = async (response) => {
        try {
            const idToken = response.credential;

            // Send to backend for verification
            const res = await fetch(SummaryApi.googleAuth.url, {
                method: SummaryApi.googleAuth.method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken }),
            });

            const data = await res.json();
            console.log("Google auth response:", data);

            if (data.token && data.user) {
                // Store JWT token and user data in localStorage
                localStorage.setItem("authToken", data.token);
                localStorage.setItem("userData", JSON.stringify(data.user));
                
                toast.success("Successfully logged in with Google!");
                navigate(from, { replace: true });
            } else {
                toast.error("Failed to login with Google. Please try again.");
            }
        } catch (error) {
            console.error("Error in Google login:", error);
            toast.error("An error occurred during Google login. Please try again.");
        }
    };

    const handleManualGoogleLogin = () => {
        toast.info("Google login is loading. Please wait a moment and try again.");
    };

    return (
        <div className='w-full'>
            {/* Google button container with theme-aware styling */}
            <div 
                ref={googleBtnRef} 
                className='w-full rounded-lg bg-[#94A3B8] dark:bg-[#322f2f] py-1 flex justify-center items-center transition-colors duration-200' 
            />
            
            {/* Fallback button if Google SDK fails to load or render */}
            {!isGoogleSDKReady && (
                <div 
                    className='btn w-full flex gap-2 items-center justify-center text-lg rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#18181b] text-slate-800 dark:text-slate-100 hover:bg-slate-100 hover:dark:bg-[#23232b] transition-colors duration-200 py-2 cursor-pointer mt-2' 
                    onClick={handleManualGoogleLogin} 
                >
                    <i className='text-xl'><FcGoogle/></i>
                    <span>Continue with Google</span>
                </div>
            )}
        </div>
    )
};

export default GoogleLogin;
