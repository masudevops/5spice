import { CheckCircle, Clock } from 'lucide-react';

const SERVICE_LABELS = {
    catering: 'Catering',
    dineIn: 'Dine-in',
    takeOut: 'Take-out',
};

// Renders a location's per-service status (location.services), e.g.
// "Catering · Available Now" / "Dine-in · Coming Soon".
const ServiceStatusList = ({ services, className = '' }) => {
    const entries = Object.entries(services ?? {});
    if (!entries.length) return null;

    return (
        <ul className={`flex flex-wrap gap-2 ${className}`}>
            {entries.map(([key, status]) => {
                const isOpen = status === 'open';
                const Icon = isOpen ? CheckCircle : Clock;
                return (
                    <li
                        key={key}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] ${
                            isOpen ? 'bg-[#1CA433]/15 text-[#1CA433]' : 'bg-[#D4A84B]/15 text-[#D4A84B]'
                        }`}
                    >
                        <Icon size={13} aria-hidden="true" />
                        {SERVICE_LABELS[key] ?? key}: {isOpen ? 'Available Now' : 'Coming Soon'}
                    </li>
                );
            })}
        </ul>
    );
};

export default ServiceStatusList;
