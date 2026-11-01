import { siteConfig } from '../config/siteConfig';

export const generateVCard = (): string => {
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${siteConfig.name}`,
    `ORG:${siteConfig.name}`,
    `TITLE:${siteConfig.tagline}`,
    `URL:${siteConfig.websiteUrl}`,
    `URL;type=Instagram:${siteConfig.instagramUrl}`,
    siteConfig.email ? `EMAIL;TYPE=INTERNET,WORK:${siteConfig.email}` : '',
    siteConfig.phone ? `TEL;TYPE=WORK,VOICE:${siteConfig.phone}` : '',
    siteConfig.location ? `ADR;TYPE=WORK:;;;${siteConfig.location};;;` : '',
    `NOTE:${siteConfig.description}`,
    'END:VCARD'
  ].filter(Boolean).join('\r\n');
};

export const downloadVCard = () => {
  const vcardData = generateVCard();
  const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Infronix-Web-Agency.vcf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
