import PlaceholderPage from "@/app/components/PlaceholderPage";
import React from "react";

const CarRentalPage = ({ params }: { params: { locale: string } }) => {
    return (
        <PlaceholderPage
            keyId="car-rental"
            locale={params.locale}
            title="Аренда авто"
            description="Этот раздел находится в разработке. Скоро здесь появится информация о наших услугах по аренде автомобилей на Ликийском побережье."
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

export default CarRentalPage; 