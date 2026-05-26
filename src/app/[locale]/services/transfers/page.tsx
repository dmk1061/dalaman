import PlaceholderPage from "@/app/components/PlaceholderPage";
import React from "react";

const TransfersPage = ({ params }: { params: { locale: string } }) => {
    return (
        <PlaceholderPage
            keyId="transfers"
            locale={params.locale}
            title="Трансферы"
            description="Этот раздел находится в разработке. Скоро здесь появится информация о наших услугах по организации трансферов из аэропорта Даламан."
        />
    );
};


export async function generateStaticParams() {
    return [
        { locale: 'en' },
        { locale: 'ru' },
        { locale: 'de' },
        { locale: 'tr' }
    ];
}

export default TransfersPage; 