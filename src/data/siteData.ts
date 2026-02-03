export const SITE_DATA = {
    name: "Tarun Goyal",
    profession: "Software Developer & Founder",
    company: "Setav Innovations Private Limited",
    phone: "+918826668006",
    phoneDisplay: "+91-8826668006",
    email: "tarun@setav.ai",
    website: "https://www.setav.ai",
    linkedIn: "https://www.linkedin.com/in/tarungoyal31",
    profileImage:
        "https://setav-prod-contacts.s3.ap-south-1.amazonaws.com/1-1769575949-4784bc1b-f15b-4538-ac90-1286aeea4cc6-1_all_17446.jpg",
    groupId: "1",

    tagline: "Building the Future of Professional Networking",
    subtitle:
        "10+ years at Google, Walmart & Zomato. IIT Roorkee alumnus. Founder of Setav Innovations.",

    urls: {
        bookAppointment: "https://app.setav.ai/#/g/1/services",
        loginSetav: "https://app.setav.ai",
        appStore: "https://apps.apple.com/in/app/setav/id6738992536",
        playStore:
            "https://play.google.com/store/apps/details?id=ai.setav.customer",
    },

    about: {
        title: "About Tarun",
        paragraphs: [
            "Tarun Goyal is the founder of Setav Innovations Pvt. Ltd., a company dedicated to building the next generation of professional networking tools powered by AI.",
            "With over 10 years of experience in the software industry, Tarun has held engineering roles at Google, Walmart, and Zomato, where he led multiple high-impact projects and delivered robust, scalable solutions.",
            "An alumnus of IIT Roorkee with both B.Tech and M.Tech degrees, Tarun has represented India in the ACM International Collegiate Programming Contest (ICPC), demonstrating exceptional problem-solving ability at the global stage.",
            "Today, Tarun channels his deep technical expertise and industry experience into Setav, helping professionals and businesses connect, grow, and thrive in the digital age.",
        ],
    },

    whyUs: [
        {
            title: "Proven Industry Experience",
            description:
                "10+ years building software at Google, Walmart, and Zomato — delivering scalable, production-grade systems.",
        },
        {
            title: "Elite Academic Background",
            description:
                "B.Tech and M.Tech from IIT Roorkee. Represented India at ACM ICPC international level.",
        },
        {
            title: "End-to-End Technical Expertise",
            description:
                "From Android architecture to distributed systems and algorithms — deep knowledge across the stack.",
        },
        {
            title: "Founder Perspective",
            description:
                "Combines engineering depth with business-level thinking to deliver practical, impactful solutions.",
        },
    ],

    services: [
        {
            title: "Architecture Reviews",
            description:
                "Expert review of your Android or mobile app architecture with actionable improvement recommendations.",
        },
        {
            title: "Technical Consulting",
            description:
                "Strategic technical guidance for startups and engineering teams.",
        },
        {
            title: "Mock Interviews",
            description:
                "Data structures and algorithms practice with feedback from a competitive programming veteran.",
        },
        {
            title: "Mentorship",
            description:
                "Career guidance for software engineers looking to grow at top tech companies.",
        },
    ],
};

export interface AppointmentProduct {
    id: string;
    name: string;
    description: string;
    additionalInformation?: string;
    durationMinutes: number;
    priceDisplay: string;
    priceUnits: number;
    isFree: boolean;
    bookingUrl: string;
}

export const APPOINTMENT_PRODUCTS: AppointmentProduct[] = [
    {
        id: "15",
        name: "Introduction",
        description: "Get in touch to know about Setav",
        durationMinutes: 10,
        priceDisplay: "Free",
        priceUnits: 0,
        isFree: true,
        bookingUrl: "https://app.setav.ai/#/g/1/services/details/15",
    },
    {
        id: "16",
        name: "Android Architecture Review",
        description: "Get your Android architecture reviewed.",
        additionalInformation:
            "Get your Android app architecture reviewed and get insights based on my 10+ years of experience.",
        durationMinutes: 30,
        priceDisplay: "\u20B92,100",
        priceUnits: 2100,
        isFree: false,
        bookingUrl: "https://app.setav.ai/#/g/1/services/details/16",
    },
    {
        id: "17",
        name: "DS Algorithms Mock Interview",
        description: "Get your mock interview scheduled with me",
        durationMinutes: 45,
        priceDisplay: "\u20B95,100",
        priceUnits: 5100,
        isFree: false,
        bookingUrl: "https://app.setav.ai/#/g/1/services/details/17",
    },
];
