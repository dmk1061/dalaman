import PlaceholderPage from "@/app/components/PlaceholderPage";
import React from "react";

const PharmaciesPage = ({ params }: { params: { locale: string } }) => {
    return (
        <PlaceholderPage
            keyId="pharmacies"
            locale={params.locale}
            title="Дежурные аптеки"
            description="Этот раздел находится в разработке. Скоро здесь появится актуальный список и адреса дежурных аптек в регионе Даламан и окрестностях."
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

export default PharmaciesPage;