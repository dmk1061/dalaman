import PlaceholderPage from "@/app/components/PlaceholderPage";
import React from "react";

const SmallTownsPage = ({ params }: { params: { locale: string } }) => {
    return (
        <PlaceholderPage
            keyId="small-towns"
            locale={params.locale}
            title="Малые города и деревни"
            description="Этот раздел находится в разработке. Скоро здесь появятся путеводители по очаровательным малым городам и деревням Ликийского побережья."
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

export default SmallTownsPage; 