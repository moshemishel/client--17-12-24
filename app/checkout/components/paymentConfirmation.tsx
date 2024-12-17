import { ServerData } from '@/types/forms/payFormSchema';

interface PageProps {
    data: ServerData;
}

export default function Page({ data }: PageProps) {
    return (
        <div>
            payment confirmation: {data.approvalNumber}
        </div>
    );
}