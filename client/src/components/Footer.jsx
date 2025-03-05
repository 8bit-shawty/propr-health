import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div>
            {/*Left section */}
            <div>
                <img src={assets.logo} alt="" />
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magnam dolores, quae autem et praesentium obcaecati unde doloremque repellendus! Sint vitae provident adipisci quod alias?</p>
            </div>
            {/*Middle section */}
            <div>
                <p>COMPANY</p>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            {/*Right section */}
            <div>
                <p>GET IN TOUCH</p>
                <ul>
                    <li>+1-123-456-7890</li>
                    <li>Fake@gmail.com</li>
                </ul>
            </div>
        </div>
        {/*COPYRIGHT */}
        <div>
            <hr />
            <p>Copyright 2025@8bit-shawty - All Rights Reserved.</p>
        </div>
    </div>
  )
}

export default Footer