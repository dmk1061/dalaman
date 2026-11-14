import ServiceLandingPage, { generateServiceMetadata } from "@/app/components/ServiceLandingPage";
import type { Metadata } from "next";
import React from "react";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    return generateServiceMetadata("city-guide/small-towns", params.locale, "/city-guide/small-towns");
}

const ServiceRoutePage = ({ params }: { params: { locale: string } }) => {
    return (
        <ServiceLandingPage
            serviceKey="city-guide/small-towns"
            locale={params.locale}
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

export default ServiceRoutePage;
