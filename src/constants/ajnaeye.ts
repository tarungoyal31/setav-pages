// Ajna Eye - Content and Configuration Constants

export const BRAND = {
    name: "Ajna Eye",
    owner: "Shreiyaa Summan",
    tagline: "Find Balance, Clarity & Inner Peace",
    subheadline: "Reiki healing & intuitive guidance by Shreiyaa Summan - Certified Reiki Practitioner, 4+ years experience",
};

export const CONTACT = {
    phone: "+919632190780",
    phoneFormatted: "+91 96321 90780",
    email: "shreiyaasumman@gmail.com",
    instagram: "ajnaeye1111",
};

export const URLS = {
    bookAppointment: "https://app.setav.ai/#/g/3/services",
    call: `tel:${CONTACT.phone}`,
    email: `mailto:${CONTACT.email}`,
    instagram: "https://www.instagram.com/ajnaeye1111",
    website: "https://www.ajnaeye.com",
    setavLogin: "https://app.setav.ai",
    appStore: "https://apps.apple.com/in/app/setav/id6738992536",
    playStore: "https://play.google.com/store/apps/details?id=ai.setav.customer",
};

export const IMAGES = {
    profile: "https://setav-prod-contacts.s3.ap-south-1.amazonaws.com/2-1727348553-1000034759.jpg",
    provider: [
        "https://setav-prod-contacts.s3.ap-south-1.amazonaws.com/2-default-1769569213-image_picker_B6C9A057-A9EA-4666-BAD7-4476ED09FAE4-6314-000000C403AF0403.jpg",
        "https://setav-prod-contacts.s3.ap-south-1.amazonaws.com/2-default-1769570065-image_picker_0423B7CB-17C1-4932-B5DC-EA0C25A1D441-6314-000000C8C671958A.jpg",
        "https://setav-prod-contacts.s3.ap-south-1.amazonaws.com/2-default-1769570082-image_picker_91ABA4D6-2C97-4DAE-A969-ED01885BE6B9-6314-000000C8DDC0A622.jpg",
    ],
};

export const WHY_US_FEATURES = [
    {
        title: "Certified Reiki Practitioner",
        description: "Trained and certified by the International Center for Reiki Training (reiki.org)",
        icon: "verified",
    },
    {
        title: "4+ Years Experience",
        description: "Proven track record of helping clients find balance and healing",
        icon: "workspace_premium",
    },
    {
        title: "Multiple Healing Modalities",
        description: "Jikiden Reiki, Holy Fire Reiki, and Karuna Reiki for deep, comprehensive healing",
        icon: "spa",
    },
    {
        title: "Certified Tarot & Numerology",
        description: "Certified by Astrology Club under guidance of Khushboo Shokeen",
        icon: "auto_awesome",
    },
    {
        title: "Academic Background",
        description: "M.Sc. Public Health from Lady Irwin College, Delhi University",
        icon: "school",
    },
    {
        title: "Holistic Approach",
        description: "Combining energy healing, intuitive guidance, and numerology for complete well-being",
        icon: "self_improvement",
    },
];

export const SERVICES = [
    {
        title: "Tarot Reading",
        description: "Gain clarity on relationships, career, family, and life path goals through intuitive card readings",
        icon: "style",
    },
    {
        title: "Jikiden Reiki",
        description: "Traditional Japanese Reiki for removing negativity, building confidence, and improving sleep",
        icon: "healing",
    },
    {
        title: "Holy Fire Reiki",
        description: "Advanced Reiki with 13 symbols for deep healing, clearing subconscious blocks, and spiritual growth",
        icon: "local_fire_department",
    },
    {
        title: "Numerology",
        description: "Guidance for career, relationships, and life decisions based on birth date and name analysis",
        icon: "tag",
    },
];

export const APPOINTMENT_PRODUCTS = [
    {
        id: "11",
        title: "Tarot Reading",
        price: "2,100",
        currency: "INR",
        duration: "30 min",
        description: "Insight about relationship, career, family, work culture, and life path goals",
        url: "https://app.setav.ai/#/g/3/services/details/11",
    },
    {
        id: "12",
        title: "Jikiden Reiki Healing",
        price: "3,100",
        currency: "INR",
        duration: "30 min",
        description: "Remove negative aspects from your current situation, helps with low confidence, anger issues, and insomnia",
        url: "https://app.setav.ai/#/g/3/services/details/12",
    },
    {
        id: "13",
        title: "Holy Fire Reiki Healing",
        price: "3,100",
        currency: "INR",
        duration: "60 min",
        description: "Deep healing with 13 advanced symbols for clearing subconscious blocks, emotional wounds, and spiritual growth",
        url: "https://app.setav.ai/#/g/3/services/details/13",
    },
    {
        id: "14",
        title: "Numerology",
        price: "2,100",
        currency: "INR",
        duration: "30 min",
        description: "Guidance for career, marriage, and life partner choices based on numbers from your birth date and name",
        url: "https://app.setav.ai/#/g/3/services/details/14",
    },
];

export const VCARD_DATA = {
    name: "Shreiyaa Summan",
    organization: "Ajna Eye",
    title: "Reiki Healer & Tarot Reader",
    phone: CONTACT.phone,
    email: CONTACT.email,
    website: URLS.website,
    instagram: URLS.instagram,
    note: "Certified Reiki Practitioner | Tarot & Numerology | M.Sc. Public Health - Lady Irwin College, Delhi University",
};
