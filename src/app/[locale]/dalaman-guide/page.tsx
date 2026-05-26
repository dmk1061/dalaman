import PlaceholderPage from "@/app/components/PlaceholderPage";
import React from "react";

const DalamanGuidePage = ({ params }: { params: { locale: string } }) => {
    return (
        <PlaceholderPage
            keyId="dalaman-guide"
            locale={params.locale}
            title="Гид по Даламану"
            description="Этот раздел находится в разработке. Скоро здесь появится подробный гид по городу Даламан и его окрестностям."
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

export default DalamanGuidePage; 