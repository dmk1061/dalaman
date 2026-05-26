import PlaceholderPage from "@/app/components/PlaceholderPage";
import React from "react";

const ContactsPage = ({ params }: { params: { locale: string } }) => {
    return (
        <PlaceholderPage
            keyId="contacts"
            locale={params.locale}
            title="Контакты"
            description="Этот раздел находится в разработке. Скоро здесь появится форма обратной связи, наши телефоны и адрес."
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

export default ContactsPage; 