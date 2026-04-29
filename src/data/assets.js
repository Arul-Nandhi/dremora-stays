export const images = {
    logo: '/src/assets/logo/logo.png',
    banners: Array.from({ length: 5 }, (_, i) =>
        `/src/assets/images/banners/banner${i + 1}.jpg`
    ),

    dashboard: Array.from({ length: 5 }, (_, i) =>
        `/src/assets/images/dashboard/dashboard${i + 1}.jpg`
    ),

    employees: Array.from({ length: 6 }, (_, i) =>
        `/src/assets/images/employees/employee${i + 1}.jpg`
    ),

    guests: Array.from({ length: 6 }, (_, i) =>
        `/src/assets/images/guests/guest${i + 1}.jpg`
    ),

    profiles: Array.from({ length: 3 }, (_, i) =>
        `/src/assets/images/profiles/profile${i + 1}.jpg`
    ),

    restaurant: Array.from({ length: 5 }, (_, i) =>
        `/src/assets/images/restaurant/restaurant${i + 1}.jpg`
    ),

    rooms: Array.from({ length: 12 }, (_, i) =>
        `/src/assets/images/rooms/room${i + 1}.jpg`
    ),

    food: Array.from({ length: 20 }, (_, i) =>
        `/src/assets/images/food/food${i + 1}.jpg`
    ),

    events: Array.from({ length: 3 }, (_, i) =>
        `/src/assets/images/events/event${i + 1}.jpg`
    ),
};