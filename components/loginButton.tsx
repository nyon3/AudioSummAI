"use client";
import { signIn, signOut } from "next-auth/react"

export const LoginButton = () => {
    return (
        <button 
        className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        onClick={() => signIn('github, google', {callbackUrl: '/dashboard'})}>Sign in</button>
    )   
}

export const LogoutButton = () => {
    return (
        <button 
        className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        onClick={() => signOut({callbackUrl:'/'})}>Logout</button>
    )   
}

export const HomePageLoginButton = () => {
    return (
        <button 
        className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        onClick={() => signIn('github, google', {callbackUrl:'/dashboard'})}>Get started</button>
    )
}