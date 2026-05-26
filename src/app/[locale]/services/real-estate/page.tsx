import PlaceholderPage from "@/app/components/PlaceholderPage";
import React from "react";

const RealEstatePage = ({ params }: { params: { locale: string } }) => {
    return (
        <PlaceholderPage
            keyId="real-estate"
            locale={params.locale}
            title="Недвижимость"
            description="Этот раздел находится в разработке. Скоро здесь появится информация о покупке и аренде недвижимости в регионе."
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

export default RealEstatePage; 