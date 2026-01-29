// vCard generation utility

interface VCardData {
    name: string;
    organization: string;
    title: string;
    phone: string;
    email: string;
    website: string;
    instagram: string;
    note: string;
}

export function generateVCard(data: VCardData): string {
    const nameParts = data.name.split(" ");
    const lastName = nameParts.pop() || "";
    const firstName = nameParts.join(" ");

    const vcard = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `N:${lastName};${firstName};;;`,
        `FN:${data.name}`,
        `ORG:${data.organization}`,
        `TITLE:${data.title}`,
        `TEL;TYPE=CELL:${data.phone}`,
        `EMAIL:${data.email}`,
        `URL:${data.website}`,
        `X-SOCIALPROFILE;TYPE=instagram:${data.instagram}`,
        `NOTE:${data.note}`,
        "END:VCARD",
    ].join("\n");

    return vcard;
}

export function downloadVCard(data: VCardData, filename: string = "contact"): void {
    const vcardContent = generateVCard(data);
    const blob = new Blob([vcardContent], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
