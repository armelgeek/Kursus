"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AppNav = () => {
    const pathname = usePathname();

    return (
        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
            {[
                { href: "/", label: "Learn" },
                { href: "/quests", label: "Quests" },
                { href: "/leaderboard", label: "Leaderboard" },
                { href: "/shop", label: "Shop" }
            ].map((item) => (
                <li key={item.href}>
                    <Link href={item.href} className={`flex flex-col items-center gap-1 group`}>
                        <p>{item.label}</p>
                        <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 transition-opacity duration-300 ${pathname === item.href ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default AppNav;