import PlaceholderPage from "@/app/components/PlaceholderPage";
import React from "react";

const ExcursionsPage = ({ params }: { params: { locale: string } }) => {
    return (
        <PlaceholderPage
            keyId="excursions-tours"
            locale={params.locale}
            title="Экскурсии и туры"
            description="Этот раздел находится в разработке. Скоро здесь вы найдете лучшие экскурсии и туры по Ликийскому побережью."
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

export default ExcursionsPage; 