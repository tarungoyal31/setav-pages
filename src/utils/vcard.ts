export function downloadVCard() {
    const vcard = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        "FN:Tarun Goyal",
        "N:Goyal;Tarun;;;",
        "ORG:Setav Innovations Private Limited",
        "TITLE:Founder",
        "TEL;TYPE=CELL:+918826668006",
        "EMAIL:tarun@setav.ai",
        "URL:https://www.setav.ai",
        "X-SOCIALPROFILE;TYPE=linkedin:https://www.linkedin.com/in/tarungoyal31",
        "END:VCARD",
    ].join("\r\n");

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Tarun_Goyal.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
