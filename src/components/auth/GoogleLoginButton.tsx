import React from "react";
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import axios from "axios";
import { API_ENDPOINT, GOOGLE_CLIENT_ID } from "../../config";

const GoogleLoginButton: React.FC = () => {
	const responseGoogle = async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
		try {
			console.log("Google Response:", response);

			if ("tokenId" in response) {
				// Send the Google token to your backend for authentication
				const backendResponse = await axios.post(`${API_ENDPOINT}/auth/google`, {
					token: response?.tokenId,
				});

				console.log("Backend Response:", backendResponse.data);
				// Handle the backend response as needed (e.g., set user state, redirect, etc.)
			}
		} catch (error) {
			console.error("Error during Google authentication:", error);
		}
	};

	return (
		<GoogleLogin
			clientId={GOOGLE_CLIENT_ID}
			buttonText="Login with Google"
			onSuccess={responseGoogle}
			onFailure={responseGoogle}
			cookiePolicy={"single_host_origin"}
			uxMode="redirect"
		/>
	);
};

export default GoogleLoginButton;
