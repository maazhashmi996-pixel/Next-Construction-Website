'use client';

import React, { useState } from 'react';

const categories = [
    { title: "Environment", image: "/page1.jpg" },
    { title: "Industry", image: "/page5.jpg" },
    { title: "Transport", image: "/page6.jpg" },
    { title: "IT & GIS", image: "/page7.jpg" },
    { title: "Public Health", image: "/page9.jpg" },
];

const projectsData = [
    { id: 1, title: "Prime Minister's Secretariat", location: "Islamabad", category: "Industry", image: "/page-1.jpg" },
    { id: 2, title: "NUST Campus Master Plan", location: "Islamabad", category: "IT & GIS", image: "/page-2.png" },
    { id: 3, title: "ARFA Software Technology Park", location: "Lahore", category: "IT & GIS", image: "/page-3.jpg" },
    { id: 4, title: "Crescent Bay Development Project", location: "Karachi", category: "Industry", image: "/page-4.jpg" },
    { id: 5, title: "Pakistan Embassy Complex", location: "Qatar", category: "Industry", image: "/page-5.jpg" },
    { id: 6, title: "Master Planning of Data Darbar Complex", location: "Lahore", category: "Public Health", image: "/page-6.jpg" },
    { id: 7, title: "Area Development Schemes of Pakistan Railways", location: "Pakistan", category: "Transport", image: "/page-7.jpg" },
    { id: 8, title: "Expansion of JPC Wagha Border", location: "Lahore", category: "Transport", image: "/page-8.jpg" },
    { id: 9, title: "Orange Line Metro Train Infrastructure", location: "Lahore", category: "Transport", image: "/page-9.jpg" },
    { id: 10, title: "Neelum Jhelum Hydroelectric Project", location: "Azad Kashmir", category: "Environment", image: "/page-10.jpg" },
    { id: 11, title: "Tarbela 4th Extension Hydropower Project", location: "Swabi", category: "Environment", image: "/page-11.jpg" },
    { id: 12, title: "Rawalpindi Ring Road Infrastructure", location: "Rawalpindi", category: "Transport", image: "/page-12.jpg" },
    { id: 13, title: "Lahore Metrobus Green Line Corridor", location: "Lahore", category: "Transport", image: "/page-13.jpg" },
    { id: 14, title: "Greater Karachi Sewerage Scheme (S-III)", location: "Karachi", category: "Public Health", image: "/page-14.jpg" },
    { id: 15, title: "Gomal Zam Dam Multipurpose Project", location: "South Waziristan", category: "Environment", image: "/page-15.jpg" },
    { id: 16, title: "Quaid-e-Azam Solar Park Framework", location: "Bahawalpur", category: "Environment", image: "/page-16.jpg" },
    { id: 17, title: "M-8 Motorway (Rato Dero to Gwadar)", location: "Balochistan", category: "Transport", image: "/page-17.jpg" },
    { id: 18, title: "Islamabad International Airport Terminal", location: "Islamabad", category: "Transport", image: "/page-18.jpg" },
    { id: 19, title: "KANUPP Unit-2 & Unit-3 Power Plants", location: "Karachi", category: "Industry", image: "/page-19.jpg" },
    { id: 20, title: "Allama Iqbal Industrial City (M-3 Industrial Estate)", location: "Faisalabad", category: "Industry", image: "/page-20.jpg" },
    { id: 21, title: "Gwadar Smart Port City Master Plan", location: "Gwadar", category: "IT & GIS", image: "/page-21.jpg" },
    { id: 22, title: "Dasu Hydropower Stage-I Grid Interconnection", location: "Khyber Pakhtunkhwa", category: "Environment", image: "/page-22.jpg" }
];

export default function ProjectsPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    // Filter Logic
    const filteredProjects = selectedCategory === 'All'
        ? projectsData
        : projectsData.filter((project) => project.category === selectedCategory);

    return (
        <div className="pt-28 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Top Section: Our Flagship Sectors */}
            <div className="mb-14">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-black text-[#0B2545] mb-1">Our Flagship Sectors</h2>
                        <div className="w-12 h-1 bg-[#8b1e24]" />
                    </div>
                    {selectedCategory !== 'All' && (
                        <button
                            onClick={() => setSelectedCategory('All')}
                            className="text-xs font-bold text-[#8b1e24] hover:underline cursor-pointer"
                        >
                            Show All Projects
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {categories.map((cat, idx) => {
                        const isSelected = selectedCategory === cat.title;
                        return (
                            <div
                                key={idx}
                                onClick={() => setSelectedCategory(isSelected ? 'All' : cat.title)}
                                className={`relative h-36 rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all border-2 ${isSelected ? 'border-[#8b1e24] scale-105 shadow-lg' : 'border-transparent'
                                    }`}
                            >
                                <div className="absolute inset-0 bg-slate-800">
                                    <img
                                        src={cat.image}
                                        alt={cat.title}
                                        className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className={`absolute inset-0 bg-gradient-to-t ${isSelected ? 'from-[#8b1e24]/90 via-black/40' : 'from-black/90 via-black/20'} to-transparent`} />
                                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                                    <span className="font-bold text-xs tracking-wider uppercase">{cat.title}</span>
                                    <span className={`text-xs p-1 rounded-full ${isSelected ? 'bg-white text-[#8b1e24]' : 'bg-white/20 text-white'}`}>
                                        {isSelected ? '✓' : '↗'}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Section: All Flagship Projects Grid */}
            <div>
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="text-2xl font-black text-[#0B2545] mb-1">
                            {selectedCategory === 'All' ? 'All Flagship Projects' : `${selectedCategory} Projects`}
                        </h2>
                        <div className="w-12 h-1 bg-[#8b1e24]" />
                    </div>
                    <span className="text-xs font-bold text-slate-400">{filteredProjects.length} Projects</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            className="group bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                        >
                            <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <div>
                                    <span className="inline-block text-[10px] font-bold text-[#8b1e24] bg-red-50 px-2 py-0.5 rounded mb-1.5">
                                        {project.category}
                                    </span>
                                    <h3 className="font-bold text-slate-800 text-xs leading-snug group-hover:text-[#8b1e24] transition-colors">
                                        {project.title}, <span className="text-slate-500 font-normal">{project.location}</span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}