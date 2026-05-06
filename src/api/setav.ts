// Setav public API client

const API_BASE = "https://api.setav.in";

export interface Price {
    currency: string;
    units: number;
    sub_units: number;
    display_string: string;
}

export interface AppointmentProduct {
    id: string;
    group_id: string;
    name: string;
    description: string;
    image: string;
    additional_information?: string;
    appointment_type: number;
    duration_in_sec: number;
    is_active: boolean;
    price: Price;
    strike_price: Price;
}

export interface GroupImage {
    url: string;
}

export interface GroupImageBucket {
    meta: { id: string; name: string };
    images: GroupImage[];
}

export interface GroupInfoContact {
    id: string;
    name: string;
    value: string;
    config_type: string;
    icon: string;
    link_address?: string;
}

export interface GroupInfo {
    id: string;
    name: string;
    image: string;
    card_color?: string;
    profession?: { name: string; type: string };
    about: string;
    is_public: boolean;
    public_link?: string;
    show_contact_information: boolean;
    infos: GroupInfoContact[];
    images: GroupImageBucket[];
    full_name?: string;
}

export interface LinksInfoResponse {
    name: string;
    phone_number: string;
    info_group: GroupInfo;
    is_owner: boolean;
}

export interface AppointmentProductsResponse {
    products: AppointmentProduct[];
}

export async function fetchAppointmentProducts(
    groupId: string,
): Promise<AppointmentProduct[]> {
    const res = await fetch(
        `${API_BASE}/user/appointment/product/group/${groupId}`,
    );
    if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
    const data: AppointmentProductsResponse = await res.json();
    return (data.products ?? []).filter((p) => p.is_active);
}

export async function fetchGroupInfo(groupId: string): Promise<GroupInfo> {
    const res = await fetch(`${API_BASE}/user/links/info?group_id=${groupId}`);
    if (!res.ok) throw new Error(`Failed to fetch group info: ${res.status}`);
    const data: LinksInfoResponse = await res.json();
    return data.info_group;
}

export function flattenGroupImages(group: GroupInfo): string[] {
    return group.images.flatMap((bucket) => bucket.images.map((i) => i.url));
}

export function formatDuration(durationInSec: number): string {
    const minutes = Math.round(durationInSec / 60);
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const rem = minutes % 60;
    return rem === 0 ? `${hours} hr` : `${hours} hr ${rem} min`;
}

export function productDetailUrl(groupId: string, productId: string): string {
    return `https://setav.ai/g/${groupId}/services/details/${productId}`;
}
