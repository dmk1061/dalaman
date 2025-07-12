import React from 'react';
import { FaHome, FaVideo, FaCamera, FaDesktop, FaCalendarAlt } from 'react-icons/fa';

const FloatingMenu = () => {
    return (
        <div className="fixed bottom-6 right-6 z-50">
            <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-2">
                <div className="flex space-x-4">
                    <FloatingMenuItem 
                        icon={<FaHome size={20} />}
                        label="Заявки"
                        sublabel="Подача заявлений"
                    />
                    <FloatingMenuItem 
                        icon={<FaVideo size={20} />}
                        label="Видео галерея"
                        sublabel="Все видеоматериалы"
                    />
                    <FloatingMenuItem 
                        icon={<FaCamera size={20} />}
                        label="Фото галерея"
                        sublabel="Все фотографии"
                    />
                    <FloatingMenuItem 
                        icon={<FaDesktop size={20} />}
                        label="Электронная мэрия"
                        sublabel="Онлайн услуги"
                    />
                    <FloatingMenuItem 
                        icon={<FaCalendarAlt size={20} />}
                        label="Мероприятия"
                        sublabel="Все мероприятия"
                    />
                </div>
            </div>
        </div>
    );
};

const FloatingMenuItem = ({ icon, label, sublabel }) => (
    <div className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200 min-w-[80px]">
        <div className="text-cyan-600 mb-2">
            {icon}
        </div>
        <div className="text-center">
            <div className="text-xs font-semibold text-gray-800 leading-tight">
                {label}
            </div>
            <div className="text-xs text-gray-500 mt-1 leading-tight">
                {sublabel}
            </div>
        </div>
    </div>
);

export default FloatingMenu; 