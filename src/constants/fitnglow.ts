// Fit n Glow - Content and Configuration Constants

export const BRAND = {
    name: "Fit n Glow",
    owner: "Shreya Suman",
    tagline: "Transform Your Health, Transform Your Life",
    subheadline: "Expert nutrition guidance by Shreya Suman - MSc Public Health, 5+ years experience",
};

export const CONTACT = {
    phone: "+919632190780",
    phoneFormatted: "+91 96321 90780",
    email: "shreyasuman07@gmail.com",
    instagram: "fit_and_glow__",
};

export const URLS = {
    bookAppointment: "https://app.setav.ai/#/g/2/services",
    productDetails: "https://app.setav.ai/#/g/2/services/details/1",
    call: `tel:${CONTACT.phone}`,
    email: `mailto:${CONTACT.email}`,
    instagram: "https://www.instagram.com/fit_and_glow__",
    setavLogin: "https://app.setav.ai",
    appStore: "https://apps.apple.com/in/app/setav/id6738992536",
    playStore: "https://play.google.com/store/apps/details?id=ai.setav.customer",
};

export const IMAGES = {
    provider: [
        "https://setav-prod-contacts.s3.ap-south-1.amazonaws.com/2-default-1732964477-1000049271.jpg",
        "https://setav-prod-contacts.s3.ap-south-1.amazonaws.com/2-default-1732964489-1000049272.jpg",
        "https://setav-prod-contacts.s3.ap-south-1.amazonaws.com/2-default-1732964496-1000049273.jpg",
    ],
};

export const WHY_US_FEATURES = [
    {
        title: "Qualified Expert",
        description: "MSc Public Health from Lady Irwin College, Delhi University",
        icon: "school",
    },
    {
        title: "5+ Years Experience",
        description: "Proven track record of successful transformations",
        icon: "workspace_premium",
    },
    {
        title: "Personalized Plans",
        description: "Custom diet charts tailored to your unique needs",
        icon: "assignment_ind",
    },
    {
        title: "Holistic Approach",
        description: "Blood work analysis, home remedies, and cooking tips",
        icon: "spa",
    },
    {
        title: "Specialized Care",
        description: "Expert guidance for pregnancy, weight loss, and kids nutrition",
        icon: "favorite",
    },
    {
        title: "Ongoing Support",
        description: "Continuous guidance throughout your health journey",
        icon: "support_agent",
    },
];

export const SERVICES = [
    {
        title: "Weight Loss Program",
        description: "Sustainable weight management with personalized diet plans",
        icon: "fitness_center",
    },
    {
        title: "Pregnancy Nutrition",
        description: "Specialized nutrition guidance for expecting mothers",
        icon: "pregnant_woman",
    },
    {
        title: "Kids Nutrition",
        description: "Healthy eating habits for growing children",
        icon: "child_care",
    },
    {
        title: "PCOS/PCOD Diet",
        description: "Targeted nutrition plans for hormonal balance",
        icon: "healing",
    },
    {
        title: "Thyroid Management",
        description: "Diet strategies for thyroid health optimization",
        icon: "monitor_heart",
    },
    {
        title: "General Wellness",
        description: "Overall health improvement through balanced nutrition",
        icon: "self_improvement",
    },
];

export const PRICING_PLANS = [
    {
        id: "1",
        title: "1 Month Plan",
        price: "4,001",
        currency: "INR",
        features: [
            "2 Personalized Diet Charts",
            "Doctor-reviewed Blood Work Check-up",
            "Natural Home Remedies for Skin Care",
            "Healthy Cooking Tips",
        ],
        highlight: "Lose up to 4 kgs in a month",
        url: "https://app.setav.ai/#/g/2/services/details/1",
    },
    {
        id: "2",
        title: "3 Months Plan",
        price: "10,400",
        currency: "INR",
        features: [
            "2 Personalized Diet Charts",
            "Doctor-reviewed Blood Work Check-up",
            "Natural Home Remedies for Skin Care",
            "Healthy Cooking Tips",
        ],
        highlight: "Lose up to 7-9 kgs",
        url: "https://app.setav.ai/#/g/2/services/details/2",
        popular: true,
    },
];

export const VCARD_DATA = {
    name: "Shreya Suman",
    organization: "Fit n Glow",
    title: "Certified Nutritionist",
    phone: CONTACT.phone,
    email: CONTACT.email,
    website: URLS.bookAppointment,
    instagram: URLS.instagram,
    note: "MSc Public Health - Lady Irwin College, Delhi University",
};
