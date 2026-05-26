import PlaceholderPage from "@/app/components/PlaceholderPage";
import React from "react";

const DivingPage = ({ params }: { params: { locale: string } }) => {
    return (
        <PlaceholderPage
            keyId="diving"
            locale={params.locale}
            title="Дайвинг"
            description="Этот раздел находится в разработке. Скоро здесь появится информация о дайвинг-центрах и лучших местах для погружений."
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

export default DivingPage; 