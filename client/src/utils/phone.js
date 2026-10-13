// "(917) 355-6995" -> "tel:+19173556995" (US numbers).
export const toTelHref = (phone) => `tel:+1${phone.replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '')}`;
