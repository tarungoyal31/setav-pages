// Ajna Eye - Content and Configuration Constants

export const GROUP_ID = "3";

export const BRAND = {
    name: "Ajna Eye",
    owner: "Shreiyaa Summan",
    tagline: "Find Balance, Clarity & Inner Peace",
    subheadline:
        "Reiki healing & intuitive guidance by Shreiyaa Summan — Certified Reiki Practitioner with 4+ years of experience",
};

export const CONTACT = {
    phone: "+919632190780",
    phoneFormatted: "+91 96321 90780",
    email: "shreiyaasumman@gmail.com",
    instagram: "ajnaeye1111",
};

export const URLS = {
    bookAppointment: `https://setav.ai/g/${GROUP_ID}/services`,
    call: `tel:${CONTACT.phone}`,
    email: `mailto:${CONTACT.email}`,
    instagram: "https://www.instagram.com/ajnaeye1111",
    setavLogin: "https://setav.ai",
    appStore: "https://apps.apple.com/in/app/setav/id6738992536",
    playStore: "https://play.google.com/store/apps/details?id=ai.setav.customer",
};

export const WHY_US_FEATURES = [
    {
        title: "Certified Reiki Practitioner",
        description:
            "Trained and certified by the International Center for Reiki Training (reiki.org)",
        icon: "verified",
    },
    {
        title: "4+ Years Experience",
        description:
            "Proven track record of helping clients find balance and healing",
        icon: "workspace_premium",
    },
    {
        title: "Multiple Healing Modalities",
        description:
            "Jikiden Reiki, Holy Fire Reiki, and Karuna Reiki for deep, comprehensive healing",
        icon: "spa",
    },
    {
        title: "Certified Tarot & Numerology",
        description:
            "Certified by Astrology Club under guidance of Khushboo Shokeen",
        icon: "auto_awesome",
    },
    {
        title: "Academic Background",
        description: "M.Sc. Public Health from Lady Irwin College, Delhi University",
        icon: "school",
    },
    {
        title: "Holistic Approach",
        description:
            "Combining energy healing, intuitive guidance, and numerology for complete well-being",
        icon: "self_improvement",
    },
];

export const SERVICES = [
    {
        title: "Tarot Reading",
        description:
            "Gain clarity on relationships, career, family, and life path goals through intuitive card readings",
        icon: "style",
    },
    {
        title: "Jikiden Reiki",
        description:
            "Traditional Japanese Reiki for removing negativity, building confidence, and improving sleep",
        icon: "healing",
    },
    {
        title: "Holy Fire Reiki",
        description:
            "Advanced Reiki with 13 symbols for deep healing, clearing subconscious blocks, and spiritual growth",
        icon: "local_fire_department",
    },
    {
        title: "Numerology",
        description:
            "Guidance for career, relationships, and life decisions based on birth date and name analysis",
        icon: "tag",
    },
];

export const VCARD_DATA = {
    name: "Shreiyaa Summan",
    organization: "Ajna Eye",
    title: "Reiki Healer & Tarot Reader",
    phone: CONTACT.phone,
    email: CONTACT.email,
    instagram: URLS.instagram,
    note: "Certified Reiki Practitioner | Tarot & Numerology | M.Sc. Public Health - Lady Irwin College, Delhi University",
};
