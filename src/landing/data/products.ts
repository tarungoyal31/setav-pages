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

export interface Testimonial {
  id: string;
  group_id: string;
  author: { uid: string; name: string; image: string };
  title: string;
  description: string;
  star_rating: number;
  status: string;
}

const API_BASE = "https://api.setav.in";
const GROUP_ID = "14";

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${API_BASE}/user/appointment/product/group/${GROUP_ID}`);
  const data = await res.json();
  return (data.products || []).filter((p: Product) => p.is_active);
};

export const fetchTestimonials = async (): Promise<Testimonial[]> => {
  const res = await fetch(`${API_BASE}/user/testimonial/group/${GROUP_ID}/starred`);
  const data = await res.json();
  return data.testimonials || [];
};

export const getServiceUrl = (groupId: string, productId: string) =>
  `https://setav.ai/g/${groupId}/services/details/${productId}`;

export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    return hours === 1 ? "1 hour" : `${hours} hours`;
  }
  return `${minutes} mins`;
};
