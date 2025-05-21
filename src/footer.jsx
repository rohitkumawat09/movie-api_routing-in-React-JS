import React from 'react'
import { CiLinkedin } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
export default function Footer() {
  return (<>

    <footer>
        <div className='footer'>

            <div className='Terms'>
                <ul><li>Terms Of Use
</li>
<li>Privacy-Policy</li>
<li>About</li>
<li>Blog</li>
<li>FAQ</li>

</ul>
            </div>
            <div className='lorem'>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            </div>


        </div>

        <div className='socialIcons'>

            <span><CiLinkedin /></span>
            <span><FaTwitter /></span>
            <span><FaInstagram /></span>
            <span><FaFacebookSquare /></span>

        </div>
    </footer>

  </>
  )
}
