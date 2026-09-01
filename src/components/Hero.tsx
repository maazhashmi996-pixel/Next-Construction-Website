'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone } from 'lucide-react';

export default function Hero() {
    const bgImages = [
        '/img1.jpg',
        '/img2.jpg',
        '/img3.jpeg',
        '/img4.jpg',
        '/img5.jpg',
        '/img6.jpg',
        '/img7.jpg'
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
        }, 4000); // Image displays for 4 seconds before smoothly cross-fading

        return () => clearInterval(intervalId);
    }, [bgImages.length]);

    return (
        <section className="relative bg-brand-dark text-white py-24 px-6 md:px-12 overflow-hidden min-h-[80vh] flex items-center">
            {/* Stacked Background Images with Cross-Fade */}
            <div className="absolute inset-0 z-0">
                {bgImages.map((src, index) => (
                    <div
                        key={src}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <Image
                            src={src}
                            alt={`Background Construction Site ${index + 1}`}
                            fill
                            className="object-cover object-center"
                            priority={index === 0}
                        />
                    </div>
                ))}
                {/* Overlay for contrast */}
                <div className="absolute inset-0 bg-black/50 z-10" />
            </div>

            {/* Hero Content */}
            <div className="max-w-6xl mx-auto space-y-6 relative z-20">
                <span className="text-brand-yellow font-semibold tracking-wider uppercase text-sm">
                    Licensed & Insured General Contractors
                </span>
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
                    Building High-Scale Infrastructure & Commercial Projects
                </h1>
                <p className="text-slate-300 text-lg max-w-2xl">
                    Delivering precision structural engineering, project management, and general contracting across regional sites.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                    <Link href="#quote" className="bg-brand-yellow hover:bg-amber-600 text-slate-950 font-bold py-3 px-6 rounded-md flex items-center gap-2 transition">
                        Request Proposal <ArrowRight className="w-5 h-5" />
                    </Link>
                    <a href="tel:+123456789" className="border border-slate-700 hover:bg-slate-800 py-3 px-6 rounded-md flex items-center gap-2 transition">
                        <Phone className="w-5 h-5 text-brand-yellow" /> Contact Dispatch
                    </a>
                </div>
            </div>
        </section>
    );
}