import ServiceLandingPage, { generateServiceMetadata } from "@/app/components/ServiceLandingPage";
import type { Metadata } from "next";
import React from "react";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    return generateServiceMetadata("real-estate", params.locale, "/services/real-estate");
}

const ServiceRoutePage = ({ params }: { params: { locale: string } }) => {
    return (
        <ServiceLandingPage
            serviceKey="real-estate"
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
