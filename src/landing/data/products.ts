export interface Price {
  currency: string;
  units: number;
  sub_units: number;
  display_string: string;
}

export interface Product {
  id: string;
  group_id: string;
  name: string;
  description: string;
  appointment_type: number;
  duration_in_sec: number;
  is_active: boolean;
  price: Price;
  strike_price: Price;
}

export const products: Product[] = [
  {
    id: "7",
    group_id: "14",
    name: "Vedic Astrology",
    description: "30 mins session of vedic astrology",
    appointment_type: 1,
    duration_in_sec: 1800,
    is_active: true,
    price: { currency: "INR", units: 2100, sub_units: 0, display_string: "₹ 2,100" },
    strike_price: { currency: "INR", units: 0, sub_units: 0, display_string: "₹ 0" },
  },
  {
    id: "8",
    group_id: "14",
    name: "Vedic Astrology",
    description: "1 hr session of Vedic astrology",
    appointment_type: 1,
    duration_in_sec: 3600,
    is_active: true,
    price: { currency: "INR", units: 3100, sub_units: 0, display_string: "₹ 3,100" },
    strike_price: { currency: "INR", units: 0, sub_units: 0, display_string: "₹ 0" },
  },
  {
    id: "9",
    group_id: "14",
    name: "Full Kundli Analysis",
    description: "Complete kundli analysis session",
    appointment_type: 1,
    duration_in_sec: 3600,
    is_active: true,
    price: { currency: "INR", units: 5100, sub_units: 0, display_string: "₹ 5,100" },
    strike_price: { currency: "INR", units: 0, sub_units: 0, display_string: "₹ 0" },
  },
  {
    id: "10",
    group_id: "14",
    name: "Vaastu Consultation",
    description: "Vastu consultation for offices, residences, plots and houses",
    appointment_type: 1,
    duration_in_sec: 3600,
    is_active: true,
    price: { currency: "INR", units: 5100, sub_units: 0, display_string: "₹ 5,100" },
    strike_price: { currency: "INR", units: 0, sub_units: 0, display_string: "₹ 0" },
  },
];

export const getServiceUrl = (productId: string) =>
  `https://app.setav.ai/#/g/14/services/details/${productId}`;

export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    return hours === 1 ? "1 hour" : `${hours} hours`;
  }
  return `${minutes} mins`;
};
