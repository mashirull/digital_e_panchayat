import Link from 'next/link'
import React from 'react'
import "../../app/globals.css"

const Navbar = () => {
  return (
    <nav className=' flex items-center justify-between py-6 shadow px-20'>
        <div>
            <h1>Logo.</h1>
        </div>

        <div className=' flex items-center justify-center gap-10'>
            <Link href={'/'}> <li>Home</li></Link>
            <Link href={'/services'}> <li>Services</li></Link>
        </div>

        <div>
            <button>Login</button>
        </div>
    </nav>
  )
}

export default Navbar