import React from 'react'
import "./Footer.css"
import { Link, useLocation } from 'react-router-dom'
import location_icon from '../Images/location-icon.png'
import mail_icon from '../Images/mail-icon.png'
import phone_icon from '../Images/phone-icon.png'

const Footer = () => {

    const location = useLocation();

    return (
        <div className='footer'>
            <div className={`${location.pathname === "/" ? "footerPannelOne" : "hideFooter"}`}>
                <div className="footerOneInner">
                    <img className='userIcon' src="https://static.vecteezy.com/system/resources/thumbnails/024/183/525/small/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg" alt="" />
                    <h1>Jitendra Nate (Editor)</h1>
                    <p>Communications or Media(Industry)</p>
                </div>
                <div className="footerOneInner">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/news">News</Link></li>
                        <li><Link to="/article">Article</Link></li>
                        <li><Link to="/interview">Interview</Link></li>
                        <li><Link to="/event">Event</Link></li>
                        <li><Link to="/magazine ">Magazine</Link></li>
                    </ul>
                </div>
                <div className="footerOneInnerx">
                    <ul>
                        <li><img src={mail_icon} alt="" />industrialtimes24@gmail.com </li>
                        <li><img src={phone_icon} alt="" />+91 8652654519</li>
                        <li><img src={location_icon} alt="" />B-202, Today Royal Elisum,<br /> Sector - 2, Karanjade, <br /> Navi Mumbai - 410206</li>
                    </ul>
                </div>
            </div>
            <div className="footerPannelTwo">
                <p>&#169;2024 Industrial Times. All rights reserved.</p>
            </div>
        </div >
    )
}

export default Footer
