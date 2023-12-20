import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Popup() {
	const [userId, setUserId] = useState("");
	const [showPopup, setShowPopup] = useState(false);
	const [necessary, setNecessary] = useState(true);
	const [preferences, setPreferences] = useState(true);
	const [statistics, setStatistics] = useState(true);
	const [marketing, setMarketing] = useState(true);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJsYXJzQGxhcnMuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9zZXJpYWxudW1iZXIiOiJjYWZlNGE4OS0wMjE4LTRiNjItODA5MC00NjA2MmI2ZmFmM2EiLCJleHAiOjIwMTg1OTYwNTR9.vMlBM98uD0gi8VKRRTgOK7ePQ4A5eQaRerGJjAYTp9I",
    },
  };

	useEffect(() => {
		let uid = localStorage.getItem("userId");
		if (!uid) {
			uid = generateUserId();
			localStorage.setItem("userId", uid);

      axios
      .post(
        "https://localhost:7163/api/Users",
        {
          "browserId": uid,
        },
        config
      )
      .then((response) => {
        console.log("User created:", response.data);
      })
      .catch((error) => {
        console.error("Error sending consent:", error);
      });

      setShowPopup(true);
		}
		setUserId(uid);
	}, []);

	const generateUserId = () => {
		return Math.random().toString(36).substring(2, 15);
	};

	const handleConsentClick = (type) => {
		switch (type) {
			case "deny":
				setNecessary(false);
				setPreferences(false);
				setStatistics(false);
				setMarketing(false);

				axios
					.post(
						"https://localhost:7163/api/UserConsents",
						{
							userId,
							domainUrl: window.location.hostname,
							necessary: false,
							functionality: false,
							analytics: false,
							marketing: false,
						},
						config
					)
					.then((response) => {
						console.log("Consent recorded:", response.data);
					})
					.catch((error) => {
						console.error("Error sending consent:", error);
					});

				setShowPopup(false);
				break;
			case "allow-selection":
				axios
					.post(
						"https://localhost:7163/api/UserConsents",
						{
							userId,
							domainUrl: window.location.hostname,
							necessary: necessary,
							functionality: preferences,
							analytics: statistics,
							marketing: marketing,
						},
						config
					)
					.then((response) => {
						console.log("Consent recorded:", response.data);
					})
					.catch((error) => {
						console.error("Error sending consent:", error);
					});

				setShowPopup(false);
				break;
			case "allow-all":
				axios
					.post(
						"https://localhost:7163/api/UserConsents",
						{
							userId,
							domainUrl: window.location.hostname,
							necessary: true,
							functionality: true,
							analytics: true,
							marketing: true,
						},
						config
					)
					.then((response) => {
						console.log("Consent recorded:", response.data);
					})
					.catch((error) => {
						console.error("Error sending consent:", error);
					});

				setShowPopup(false);
				break;
		}
	};

	if (!showPopup) return;

	return (
		<div id='popup-container' className='overlay'>
			<div className='popup'>
				<div className='cookies-info'>
					<h1>This website uses cookies</h1>
					<p>
						Welcome! Our site uses cookies to enhance your browsing experience.
						Cookies help us personalize content, provide social media features,
						and analyze our traffic. By continuing to use our site, you agree to
						our cookie policy. You can adjust your preferences anytime in your
						settings. Learn more about our use of cookies and your choices here.
					</p>
				</div>

				<hr className='solid' />

				<div className='popup-switches'>
					<div className='switch-with-text' style={{ marginLeft: 30 }}>
						<h4>Necessary</h4>
						<input
							type='checkbox'
							id='switch1'
							checked={necessary}
							onChange={() => setNecessary(!necessary)}
						/>
						<label htmlFor='switch1'>Toggle</label>
					</div>
					<div className='switch-with-text'>
						<h4>Preferences</h4>
						<input
							type='checkbox'
							id='switch2'
							checked={preferences}
							onChange={() => setPreferences(!preferences)}
						/>
						<label htmlFor='switch2'>Toggle</label>
					</div>
					<div className='switch-with-text'>
						<h4>Statistics</h4>
						<input
							type='checkbox'
							id='switch3'
							checked={statistics}
							onChange={() => setStatistics(!statistics)}
						/>
						<label htmlFor='switch3'>Toggle</label>
					</div>
					<div className='switch-with-text' style={{ marginRight: 30 }}>
						<h4>Marketing</h4>
						<input
							type='checkbox'
							id='switch4'
							checked={marketing}
							onChange={() => setMarketing(!marketing)}
						/>
						<label htmlFor='switch4'>Toggle</label>
					</div>
				</div>

				<hr className='solid' />

				<div className='footer'>
					<div className='footer-buttons'>
						<div className='footer-buttons-wrapper'>
							<button
								className='button-decline-and-selection'
								onClick={() => {
									handleConsentClick("deny");
								}}
							>
								Deny
							</button>

							<button
								className='button-decline-and-selection'
								onClick={() => {
									handleConsentClick("allow-selection");
								}}
							>
								Allow Selection
							</button>

							<button
								className='button-allow-all'
								onClick={() => {
									handleConsentClick("allow-all");
								}}
							>
								Allow all
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
