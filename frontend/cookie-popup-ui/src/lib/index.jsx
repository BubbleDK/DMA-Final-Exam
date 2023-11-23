import React from 'react'

export default function Popup() {
    return (
        <div id='popup-container' className='overlay'>
            <div className='popup'>
                <div className='cookies-info'>
                    <h1>This website uses cookies</h1>
                    <p>
                        Welcome! Our site uses cookies to enhance your browsing experience. Cookies help us personalize content, provide social media features, and analyze our traffic. By continuing to use our site, you agree to our cookie policy. You can adjust your preferences anytime in your settings. Learn more about our use of cookies and your choices here.
                    </p>
                </div>

                <hr className="solid" />

                <div className='popup-switches'>
                    <div className='switch-with-text' style={{ marginLeft: 30 }}>
                        <h4>Necessary</h4>
                        <input type="checkbox" id="switch1" /><label htmlFor="switch1">Toggle</label>
                    </div>
                    <div className='switch-with-text'>
                        <h4>Preferences</h4>
                        <input type="checkbox" id="switch2" /><label htmlFor="switch2">Toggle</label>
                    </div>
                    <div className='switch-with-text'>
                        <h4>Statistics</h4>
                        <input type="checkbox" id="switch3" /><label htmlFor="switch3">Toggle</label>
                    </div>
                    <div className='switch-with-text' style={{ marginRight: 30 }}>
                        <h4>Marketing</h4>
                        <input type="checkbox" id="switch4" /><label htmlFor="switch4">Toggle</label>
                    </div>
                </div>

                <hr className="solid" />

                <div className='footer'>
                    <div className='footer-buttons'>
                        <div className='footer-buttons-wrapper'>
                            <button className='button-decline-and-selection'>
                                Deny
                            </button>

                            <button className='button-decline-and-selection'>
                                Allow Selection
                            </button>

                            <button className='button-allow-all'>
                                Allow all
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}