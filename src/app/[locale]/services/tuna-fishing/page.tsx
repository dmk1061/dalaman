import PlaceholderPage from "@/app/components/PlaceholderPage";
import React from "react";

const TunaFishingPage = ({ params }: { params: { locale: string } }) => {
    return (
        <PlaceholderPage
            keyId="tuna-fishing"
            locale={params.locale}
            title="Подводная охота на тунца"
            description="Этот раздел находится в разработке. Скоро здесь появится информация об организации туров по подводной охоте."
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

export default TunaFishingPage; 