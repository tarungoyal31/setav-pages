// Types derived from swagger definitions at /swagger/user/doc.json
// Nullability strictly follows swagger required arrays

export interface CommonImage {
    url?: string;
}

export interface Profession {
    name?: string;
    type?: string;
}

export interface Address {
    // swagger doesn't detail fields; keep generic
    [key: string]: unknown;
}

export interface ContactInfo {
    id: string;
    name: string;
    config_type: string;
    value?: string;
    icon?: string;
    link_address?: string;
    address?: Address;
}

export interface ImageGroupMeta {
    id: string;
    name: string;
}

export interface ImageGroup {
    meta: ImageGroupMeta;
    images: CommonImage[];
}

export interface BusinessDetails {
    [key: string]: unknown;
}

export interface ShareDetails {
    [key: string]: unknown;
}

export interface ContactInfoGroup {
    name: string;
    infos: ContactInfo[];
    id?: string;
    image?: string;
    card_color?: string;
    about?: string;
    full_name?: string;
    phone_number?: string;
    is_public?: boolean;
    public_link?: string;
    profession?: Profession;
    images?: ImageGroup[];
    business_details?: BusinessDetails;
    share_details?: ShareDetails;
}

export interface GetLinkInfoResponse {
    name: string;
    phone_number: string;
    info_group: ContactInfoGroup;
}

// Appointment products (services/pricing)

export interface Price {
    currency?: string;
    units?: number;
    sub_units?: number;
    display_string?: string;
}

export interface AppointmentProduct {
    id: string;
    name: string;
    group_id: string;
    appointment_type: number;
    description?: string;
    additional_information?: string;
    duration_in_sec?: number;
    is_active?: boolean;
    price?: Price;
    strike_price?: Price;
    created_at?: number;
    updated_at?: number;
}

export interface GetAppointmentProductsResponse {
    products?: AppointmentProduct[];
}

// Testimonials

export interface TestimonialAuthor {
    name?: string;
    image?: string;
    uid?: string;
}

export interface BasicGroupInfo {
    name?: string;
    image?: string;
}

export interface Testimonial {
    author: TestimonialAuthor;
    description: string;
    group_id: string;
    title: string;
    id?: string;
    star_rating?: number;
    is_verified?: boolean;
    status?: string;
    product_id?: string;
    group_info?: BasicGroupInfo;
    created_at?: number;
    updated_at?: number;
}

export interface GetStarredTestimonialsResponse {
    testimonials?: Testimonial[];
}

// Combined page data
export interface PageData {
    linkInfo: GetLinkInfoResponse;
    products: AppointmentProduct[];
    testimonials: Testimonial[];
}
