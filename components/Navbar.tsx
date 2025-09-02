import React from 'react'
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
    return (
        <header className="navbar">
            <nav>
                <Link href="/public">
                    <Image src="/assets/icons/logo.svg" alt="Logo" width={32} height={32} />
                </Link>
            </nav>
        </header>
    )
}
export default Navbar
