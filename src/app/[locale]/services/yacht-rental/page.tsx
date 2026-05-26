import PlaceholderPage from "@/app/components/PlaceholderPage";
import React from "react";

const YachtRentalPage = ({ params }: { params: { locale: string } }) => {
    return (
        <PlaceholderPage
            keyId="yacht-rental"
            locale={params.locale}
            title="Аренда яхт"
            description="Этот раздел находится в разработке. Скоро здесь появится информация об аренде яхт и морских прогулках."
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

export default YachtRentalPage; 