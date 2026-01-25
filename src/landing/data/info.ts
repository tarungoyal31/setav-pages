export interface Address {
  label: string;
  house_no: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  google_location?: {
    name: string;
    locality: string;
    lat_lng: { lat: number; lng: number };
    formatted_address: string;
    place_id: string;
  };
}

export interface InfoItem {
  id: string;
  name: string;
  value: string;
  config_type: string;
  icon: string;
  link_address?: string;
  address?: Address;
}

export interface ImageGallery {
  meta: { id: string; name: string };
  images: { url: string }[];
}

export interface InfoGroup {
  id: string;
  name: string;
  image: string;
  profession: { name: string; type: string };
  about: string;
  public_link: string;
  infos: InfoItem[];
  images: ImageGallery[];
  full_name: string;
  phone_number: string;
}

export interface SiteInfo {
  name: string;
  phone_number: string;
  info_group: InfoGroup;
}

export const siteInfo: SiteInfo = {
  name: "Sanjay Prasad",
  phone_number: "91-9810895239",
  info_group: {
    id: "14",
    name: "Sanjay Prasad",
    image: "https://setav-prod-contacts.s3.ap-south-1.amazonaws.com/7-1733041092-1000059295.jpg",
    profession: { name: "Astrologer", type: "astrologer" },
    about: "Astrology,Numerology,Vaastu  Consultation",
    public_link: "sanjayprasad",
    infos: [
      { id: "0", name: "Full Name", value: "Sanjay Prasad", config_type: "full_name", icon: "icon_person" },
      { id: "1", name: "Phone Number", value: "91-9810895239", config_type: "phone", icon: "icon_phone" },
      { id: "2", name: "Email", value: "sanjayprasadsp2314@gmail.com", config_type: "email", icon: "icon_email" },
      {
        id: "3",
        name: "Address",
        value: "Office",
        config_type: "address",
        icon: "icon_address",
        address: {
          label: "Office",
          house_no: "Malviya Nagar",
          street: "Near Post office,Malviya Nagar,New Delhi India",
          city: "New Delhi",
          state: "Delhi",
          zip: "110017",
          country: "India",
          google_location: {
            name: "3rd Floor",
            locality: "New Delhi",
            lat_lng: { lat: 28.5342332, lng: 77.2094473 },
            formatted_address: "3rd Floor, C-5, above KFC, Block E, Malviya Nagar, New Delhi, Delhi 110017, India",
            place_id: "ChIJCaxdUf_jDDkR91Ktj8G-4Ts",
          },
        },
      },
      {
        id: "5",
        name: "Instagram",
        value: "@turning.point.888.astrology",
        config_type: "instagram",
        icon: "icon_instagram",
        link_address: "https://www.instagram.com/turning.point.888.astrology",
      },
      {
        id: "6",
        name: "Website",
        value: "http://www.youtube.com/@turningpoint888astrology",
        config_type: "website",
        icon: "icon_website",
        link_address: "http://www.youtube.com/@turningpoint888astrology",
      },
      {
        id: "7",
        name: "YouTube",
        value: "@turningpoint888astrology",
        config_type: "youtube",
        icon: "icon_youtube",
        link_address: "https://www.youtube.com/@turningpoint888astrology",
      },
    ],
    images: [
      {
        meta: { id: "default", name: "pictures of Sanjay Prasad" },
        images: [
          { url: "https://setav-prod-contacts.s3.ap-south-1.amazonaws.com/7-default-1733226886-1000073537.jpg" },
          { url: "https://setav-prod-contacts.s3.ap-south-1.amazonaws.com/7-default-1733042429-1000059296.jpg" },
          { url: "https://setav-prod-contacts.s3.ap-south-1.amazonaws.com/7-default-1733042467-2865f831-506e-451f-a7c9-28c820b23835-1_all_14342.jpg" },
          { url: "https://setav-prod-contacts.s3.ap-south-1.amazonaws.com/7-default-1733042537-2865f831-506e-451f-a7c9-28c820b23835-1_all_14314.jpg" },
          { url: "https://setav-prod-contacts.s3.ap-south-1.amazonaws.com/7-default-1733042612-2865f831-506e-451f-a7c9-28c820b23835-1_all_13528.jpg" },
          { url: "https://setav-prod-contacts.s3.ap-south-1.amazonaws.com/7-default-1733042634-2865f831-506e-451f-a7c9-28c820b23835-1_all_14264.jpg" },
          { url: "https://setav-prod-contacts.s3.ap-south-1.amazonaws.com/7-default-1733042705-2865f831-506e-451f-a7c9-28c820b23835-1_all_12082.jpg" },
          { url: "https://setav-prod-contacts.s3.ap-south-1.amazonaws.com/7-default-1733120165-1000073436.jpg" },
          { url: "https://setav-prod-contacts.s3.ap-south-1.amazonaws.com/7-default-1733120187-1000073437.jpg" },
          { url: "https://setav-prod-contacts.s3.ap-south-1.amazonaws.com/7-default-1733120201-1000073435.jpg" },
          { url: "https://setav-prod-contacts.s3.ap-south-1.amazonaws.com/7-default-1733120212-1000073434.jpg" },
          { url: "https://setav-prod-contacts.s3.ap-south-1.amazonaws.com/7-default-1733120225-1000073433.jpg" },
          { url: "https://setav-prod-contacts.s3.ap-south-1.amazonaws.com/7-default-1733120265-1000073432.jpg" },
          { url: "https://setav-prod-contacts.s3.ap-south-1.amazonaws.com/7-default-1733120573-1000073438.jpg" },
        ],
      },
    ],
    full_name: "Sanjay Prasad",
    phone_number: "91-9810895239",
  },
};

export const aboutText = `I am retired from private service with a background in Economics, and my journey into astrology was inspired by my late mother. In recent years, I have devoted myself to guiding people through astrology via my YouTube and Instagram platforms.

I offer simple, cost-free remedies, believing that service to those in distress is a blessing. The trust and relief people experience bring me deep joy and gratitude to the Almighty. For me, true fulfillment lies in easing suffering and spreading positivity, and this is the path I continue to follow.`;

export const getPhoneNumber = () => "+919810895239";
export const getEmail = () => "sanjayprasadsp2314@gmail.com";
export const getGroupId = () => "14";
export const getBookingUrl = () => `https://app.setav.ai/#/g/${getGroupId()}`;
export const getInstagramUrl = () => "https://www.instagram.com/turning.point.888.astrology";
export const getYouTubeUrl = () => "https://www.youtube.com/@turningpoint888astrology";
export const getAppStoreUrl = () => "https://apps.apple.com/in/app/setav/id6738992536";
export const getPlayStoreUrl = () => "https://play.google.com/store/apps/details?id=ai.setav.customer";
