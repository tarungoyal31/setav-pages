"use client";

/**
 * VCardDownload — client island that generates and downloads a .vcf file.
 *
 * Uses Blob + URL.createObjectURL (browser APIs) so must be a Client Component.
 */

import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";

interface VCardDownloadProps {
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  profession?: string;
  bookingUrl?: string;
}

export default function VCardDownload({
  name,
  phone,
  email,
  address,
  profession,
  bookingUrl,
}: VCardDownloadProps) {
  const handleDownload = () => {
    const lines: string[] = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${name}`,
    ];
    if (phone) lines.push(`TEL:${phone}`);
    if (email) lines.push(`EMAIL:${email}`);
    if (profession) lines.push(`TITLE:${profession}`);
    if (address) lines.push(`ADR:;;${address}`);
    if (bookingUrl) lines.push(`URL:${bookingUrl}`);
    lines.push("END:VCARD");

    const vcard = lines.join("\n");
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name.replace(/\s+/g, "_")}.vcf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      variant="contained"
      startIcon={<DownloadIcon />}
      onClick={handleDownload}
      sx={{ borderRadius: 2, px: 4, py: 1.5 }}
    >
      Download Contact Card
    </Button>
  );
}
