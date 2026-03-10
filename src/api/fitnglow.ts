import type {
    GetLinkInfoResponse,
    GetAppointmentProductsResponse,
    GetStarredTestimonialsResponse,
    PageData,
} from "../types/api";

const API_BASE = "https://api.setav.in";
const GROUP_ID = "2";

async function fetchJson<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
    }
    return res.json();
}

export function fetchLinkInfo(): Promise<GetLinkInfoResponse> {
    return fetchJson<GetLinkInfoResponse>(
        `${API_BASE}/user/links/info?group_id=${GROUP_ID}`
    );
}

export function fetchAppointmentProducts(): Promise<GetAppointmentProductsResponse> {
    return fetchJson<GetAppointmentProductsResponse>(
        `${API_BASE}/user/appointment/product/group/${GROUP_ID}`
    );
}

export function fetchStarredTestimonials(): Promise<GetStarredTestimonialsResponse> {
    return fetchJson<GetStarredTestimonialsResponse>(
        `${API_BASE}/user/testimonial/group/${GROUP_ID}/starred`
    );
}

export async function fetchAllPageData(): Promise<PageData> {
    const [linkInfo, productsRes, testimonialsRes] = await Promise.all([
        fetchLinkInfo(),
        fetchAppointmentProducts(),
        fetchStarredTestimonials(),
    ]);

    return {
        linkInfo,
        products: productsRes.products ?? [],
        testimonials: testimonialsRes.testimonials ?? [],
    };
}
