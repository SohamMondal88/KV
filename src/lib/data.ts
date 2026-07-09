import { Destination, Package, Homestay, Hotel, BlogPost, Event } from "./types";

const makeDestination = (base: Partial<Destination> & { id: string; name: string; slug: string }): Destination => {
  const defaults: Partial<Destination> = {
    altitude: "1,200 m",
    temperature: { summer: "15-25°C", winter: "2-10°C", monsoon: "18-22°C" },
    weather: "Pleasant throughout the year",
    bestTime: "October to May",
    bestTimeMonths: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"],
    localFood: ["Momos", "Thukpa", "Aloo Dum", "Sel Roti", "Chhurpi Soup"],
    streetFood: [
      { name: "Momo Stall at Main Market", description: "Freshly steamed and fried momos with spicy chutney" },
      { name: "Thukpa Corner", description: "Hot noodle soup with local vegetables and meat" },
    ],
    culture: "Rich Himalayan culture with Buddhist monasteries and Nepali traditions.",
    festivals: ["Losar", "Buddha Jayanti", "Dashain", "Tihar"],
    traditionalDresses: ["Bakhu", "Daura Suruwal", "Gunyo Cholo"],
    language: "Nepali, Hindi, English",
    budgetPlanner: { backpacker: "₹1,500/day", midRange: "₹3,500/day", luxury: "₹8,000+/day" },
    transportation: {
      howToReach: [
        { mode: "train", description: "Nearest railway station is New Jalpaiguri (NJP)", duration: "~3 hrs drive", cost: "₹150-500" },
        { mode: "flight", description: "Nearest airport is Bagdogra (IXB)", duration: "~2.5 hrs drive", cost: "₹3,000-8,000" },
        { mode: "bus", description: "Direct buses from Siliguri and Darjeeling", duration: "~3-4 hrs", cost: "₹200-400" },
        { mode: "car", description: "Private taxis and shared jeeps available", duration: "~2.5 hrs", cost: "₹2,500-4,000" },
      ],
      nearbyRailway: "New Jalpaiguri Junction (NJP) - 72 km",
      nearbyAirport: "Bagdogra Airport (IXB) - 78 km",
      taxiFare: "Shared: ₹150-200, Private: ₹2,500-3,500",
      bikeRental: "₹500-800/day (Royal Enfield/Scooty)",
    },
    packingList: ["Warm clothes", "Trekking shoes", "Rain jacket", "Sunscreen", "Power bank", "Camera", "First aid kit"],
    networkAvailability: "Jio, Airtel, BSNL available. 4G in town center.",
    internetSpeed: "10-25 Mbps",
    workationFriendly: true,
    familyFriendly: true,
    coupleFriendly: true,
    soloFriendly: true,
    seniorFriendly: true,
    petFriendly: false,
    travelTips: ["Book homestays in advance during peak season", "Carry cash as ATMs may be limited", "Respect local customs and monasteries"],
    thingsToAvoid: ["Littering in natural areas", "Disrespecting religious sites", "Traveling without permits in restricted areas"],
    commonScams: ["Overpriced taxi fares - always negotiate", "Fake guide services - book through verified platforms"],
    weatherAlerts: ["Landslide risk during monsoon (Jun-Sep)", "Sudden temperature drops in evening"],
    reviews: [
      { id: "r1", name: "Rahul Sharma", avatar: "", rating: 5, date: "2024-12-15", comment: "Beautiful place with stunning views!" },
      { id: "r2", name: "Priya Das", avatar: "", rating: 4, date: "2024-11-20", comment: "Loved the homestays and local food." },
    ],
    faqs: [
      { question: "What is the best time to visit?", answer: "October to May offers clear skies and pleasant weather." },
      { question: "Is it safe for solo travelers?", answer: "Yes, these are safe destinations with friendly locals and good connectivity." },
      { question: "Do I need any permits?", answer: "Indian citizens do not need permits for most areas. Foreign nationals may need ILP for certain regions." },
    ],
    tags: ["mountains", "nature", "culture", "trekking", "photography"],
    featured: false,
    rating: 4.5,
    reviewCount: 120,
  };
  return { ...defaults, ...base } as Destination;
};

export const destinations: Destination[] = [
  makeDestination({
    id: "dest-1",
    name: "Kalimpong",
    slug: "kalimpong",
    tagline: "The Hill Station of Golden Pastures",
    state: "West Bengal",
    district: "Kalimpong",
    heroImage: "https://images.unsplash.com/photo-1506905925345-596d3c1e03a6?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop",
    ],
    introduction: "Kalimpong is a serene hill station nestled in the eastern Himalayas, known for its panoramic views of the Kanchenjunga, rich colonial heritage, vibrant Buddhist monasteries, and the famous flower market.",
    history: "Once a part of the kingdom of Sikkim, Kalimpong became an important trading post between India and Tibet. The British developed it as a sanatorium and hill station in the 19th century.",
    coordinates: { lat: 27.0595, lng: 88.4695 },
    altitude: "1,247 m",
    nearbyAttractions: [
      { id: "a1", name: "Durpin Monastery", description: "One of the largest monasteries in the region with panoramic views.", image: "", category: "Religious" },
      { id: "a2", name: "Deolo Hill", description: "Highest point in Kalimpong offering 360-degree views.", image: "", category: "Viewpoint" },
      { id: "a3", name: "Morgan House", description: "Colonial-era heritage property with scenic gardens.", image: "", category: "Heritage" },
    ],
    hiddenGems: [
      { id: "h1", name: "Dr. Graham's Homes", description: "A beautiful school campus with Scottish architecture.", image: "", whyVisit: "Peaceful walks and historical significance" },
      { id: "h2", name: "Pine View Nursery", description: "Famous for its cactus collection and exotic plants.", image: "", whyVisit: "Unique botanical experience" },
    ],
    viewpoints: [
      { id: "v1", name: "Deolo Hill Viewpoint", description: "Highest point with panoramic Himalayan views.", image: "", type: "panoramic" },
      { id: "v2", name: "Sunrise Point", description: "Best spot to witness the golden sunrise over Kanchenjunga.", image: "", type: "sunrise" },
    ],
    adventureActivities: [
      { id: "act1", name: "Paragliding", description: "Soar over the hills with stunning aerial views.", image: "", difficulty: "Moderate", duration: "30 mins", price: "₹3,000" },
      { id: "act2", name: "Trekking to Samthar", description: "Scenic trek through tea gardens and villages.", image: "", difficulty: "Easy", duration: "1 day", price: "₹1,500" },
    ],
    restaurants: [
      { id: "r1", name: "Gompas Restaurant", cuisine: "Tibetan & Chinese", rating: 4.3, priceRange: "₹300-600", image: "", description: "Cozy place with authentic momos and thukpa." },
      { id: "r2", name: "Art Cafe", cuisine: "Continental & Indian", rating: 4.5, priceRange: "₹400-800", image: "", description: "Beautiful garden cafe with artistic ambiance." },
    ],
    cafes: [
      { id: "c1", name: "Himalayan Java Coffee", specialty: "Organic Coffee", rating: 4.6, image: "", description: "Best coffee in town with mountain views." },
      { id: "c2", name: "The Bake House", specialty: "Pastries & Hot Chocolate", rating: 4.4, image: "", description: "Freshly baked goodies in a warm setting." },
    ],
    shopping: [
      { id: "s1", name: "Kalimpong Haat", description: "Local market for handicrafts and woolens.", whatToBuy: ["Handwoven shawls", "Tibetan artifacts", "Organic tea"] },
    ],
    suggestedItineraries: [
      { days: 1, title: "Kalimpong in a Day", overview: "Cover major attractions in a single day.", daysPlan: [{ day: 1, title: "Quick Exploration", activities: ["Deolo Hill sunrise", "Durpin Monastery", "Morgan House", "Local market"], meals: ["Breakfast at cafe", "Lunch at local restaurant", "Evening tea"], transport: "Local taxi", accommodation: "Budget hotel/homestay", budget: "₹2,000" }], estimatedBudget: "₹2,000-3,000" },
      { days: 2, title: "Weekend Escape", overview: "Relaxed weekend covering main attractions and hidden gems.", daysPlan: [{ day: 1, title: "Arrival & Exploration", activities: ["Check-in", "Durpin Monastery", "Pine View Nursery", "Sunset at Deolo"], meals: ["Lunch", "Dinner"], transport: "Taxi", accommodation: "Homestay", budget: "₹2,500" }, { day: 2, title: "Nature & Culture", activities: ["Dr. Graham's Homes", "Local village walk", "Flower market", "Departure"], meals: ["Breakfast", "Lunch"], transport: "Taxi", accommodation: "N/A", budget: "₹1,500" }], estimatedBudget: "₹4,000-6,000" },
    ],
    nearbyPlaces: [
      { name: "Darjeeling", distance: "50 km", description: "Famous tea gardens and toy train." },
      { name: "Lava", distance: "32 km", description: "Dense forests and birdwatching paradise." },
    ],
    featured: true,
    rating: 4.6,
    reviewCount: 245,
  }),
  makeDestination({
    id: "dest-2",
    name: "Pabong",
    slug: "pabong",
    tagline: "The Untouched Himalayan Hamlet",
    state: "Sikkim",
    district: "Mangan",
    heroImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    ],
    introduction: "Pabong is a pristine village in North Sikkim, surrounded by snow-capped peaks, alpine meadows, and rhododendron forests. A paradise for nature lovers and solitude seekers.",
    history: "A traditional Lepcha settlement that has remained largely untouched by modern tourism.",
    coordinates: { lat: 27.5333, lng: 88.5333 },
    altitude: "2,100 m",
    nearbyAttractions: [
      { id: "a1", name: "Rhododendron Forest", description: "Dense forest with blooming rhododendrons in spring.", image: "", category: "Nature" },
      { id: "a2", name: "Lepcha Heritage Museum", description: "Showcases the rich culture of the Lepcha tribe.", image: "", category: "Culture" },
    ],
    hiddenGems: [
      { id: "h1", name: "Pabong Lake", description: "A serene glacial lake surrounded by prayer flags.", image: "", whyVisit: "Peaceful and spiritually uplifting" },
    ],
    viewpoints: [
      { id: "v1", name: "Kanchenjunga Viewpoint", description: "Close-up views of the third highest peak.", image: "", type: "panoramic" },
    ],
    adventureActivities: [
      { id: "act1", name: "Village Trek", description: "Trek through remote villages and forests.", image: "", difficulty: "Moderate", duration: "4-5 hrs", price: "₹1,000" },
    ],
    restaurants: [
      { id: "r1", name: "Pabong Kitchen", cuisine: "Sikkimese", rating: 4.2, priceRange: "₹200-400", image: "", description: "Authentic local food prepared with organic ingredients." },
    ],
    cafes: [
      { id: "c1", name: "Mountain Brew", specialty: "Butter Tea", rating: 4.0, image: "", description: "Traditional Tibetan butter tea and snacks." },
    ],
    shopping: [
      { id: "s1", name: "Village Cooperative", description: "Handicrafts made by local women.", whatToBuy: ["Handwoven baskets", "Organic honey", "Traditional shawls"] },
    ],
    suggestedItineraries: [
      { days: 2, title: "Pabong Nature Retreat", overview: "A short getaway into the heart of North Sikkim.", daysPlan: [{ day: 1, title: "Arrival & Trek", activities: ["Arrive in Pabong", "Village trek", "Sunset viewpoint"], meals: ["Lunch", "Dinner"], transport: "Shared jeep from Gangtok", accommodation: "Homestay", budget: "₹2,000" }, { day: 2, title: "Culture & Departure", activities: ["Heritage museum", "Local breakfast", "Depart"], meals: ["Breakfast"], transport: "Shared jeep", accommodation: "N/A", budget: "₹1,000" }], estimatedBudget: "₹3,000-5,000" },
    ],
    nearbyPlaces: [
      { name: "Lachung", distance: "25 km", description: "Famous for Yumthang Valley." },
      { name: "Yumthang", distance: "40 km", description: "Valley of Flowers." },
    ],
    rating: 4.4,
    reviewCount: 56,
  }),
  makeDestination({
    id: "dest-3",
    name: "Lebong",
    slug: "lebong",
    tagline: "Valley of the Rising Sun",
    state: "West Bengal",
    district: "Darjeeling",
    heroImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    ],
    introduction: "Lebong is a beautiful valley near Darjeeling, known for its racecourse, tea gardens, and breathtaking sunrises. A peaceful retreat away from the tourist crowds.",
    history: "Lebong was the site of the first tea plantation in Darjeeling and houses the world's highest racecourse.",
    coordinates: { lat: 27.0417, lng: 88.2667 },
    altitude: "1,800 m",
    nearbyAttractions: [
      { id: "a1", name: "Lebong Racecourse", description: "The highest racecourse in the world.", image: "", category: "Unique" },
      { id: "a2", name: "Happy Valley Tea Estate", description: "One of the oldest tea estates in Darjeeling.", image: "", category: "Heritage" },
    ],
    hiddenGems: [
      { id: "h1", name: "Lebong Cemetery", description: "A quiet colonial-era cemetery with historical graves.", image: "", whyVisit: "Historical significance and peace" },
    ],
    viewpoints: [
      { id: "v1", name: "Lebong Sunrise Point", description: "Watch the first rays illuminate Kanchenjunga.", image: "", type: "sunrise" },
    ],
    adventureActivities: [
      { id: "act1", name: "Tea Garden Walk", description: "Guided walk through Happy Valley Tea Estate.", image: "", difficulty: "Easy", duration: "2 hrs", price: "₹500" },
    ],
    restaurants: [
      { id: "r1", name: "Valley View Restaurant", cuisine: "Indian & Chinese", rating: 4.1, priceRange: "₹300-500", image: "", description: "Overlooks the tea gardens." },
    ],
    cafes: [
      { id: "c1", name: "Tea Lounge", specialty: "Darjeeling Tea", rating: 4.5, image: "", description: "Taste the finest Darjeeling teas." },
    ],
    shopping: [
      { id: "s1", name: "Tea Outlet", description: "Directly purchase fresh tea from the estate.", whatToBuy: ["First Flush Tea", "Green Tea", "Tea accessories"] },
    ],
    suggestedItineraries: [
      { days: 1, title: "Lebong Day Trip", overview: "Perfect add-on to your Darjeeling trip.", daysPlan: [{ day: 1, title: "Valley Exploration", activities: ["Racecourse visit", "Tea garden walk", "Sunrise point"], meals: ["Tea tasting", "Lunch"], transport: "Taxi from Darjeeling", accommodation: "N/A", budget: "₹1,500" }], estimatedBudget: "₹1,500-2,500" },
    ],
    nearbyPlaces: [
      { name: "Darjeeling", distance: "8 km", description: "Queen of Hills." },
      { name: "Ghoom Monastery", distance: "6 km", description: "Ancient Buddhist monastery." },
    ],
    rating: 4.3,
    reviewCount: 78,
  }),
  makeDestination({
    id: "dest-4",
    name: "Ramdhura",
    slug: "ramdhura",
    tagline: "Where the Clouds Embrace the Mountains",
    state: "West Bengal",
    district: "Kalimpong",
    heroImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    ],
    introduction: "Ramdhura is a peaceful village perched on a ridge, offering uninterrupted views of the Teesta River and the Eastern Himalayas. A hidden gem for nature lovers.",
    history: "Once a forested area, Ramdhura has transformed into a sustainable tourism village with community-led homestays.",
    coordinates: { lat: 27.0167, lng: 88.3833 },
    altitude: "1,300 m",
    nearbyAttractions: [
      { id: "a1", name: "Icche Gaon", description: "A scenic village known for its sunrise views.", image: "", category: "Nature" },
      { id: "a2", name: "Teesta River Viewpoint", description: "Stunning views of the Teesta River winding through the valley.", image: "", category: "Viewpoint" },
    ],
    hiddenGems: [
      { id: "h1", name: "Sillery Gaon Walk", description: "A serene forest trail connecting Ramdhura to Sillery Gaon.", image: "", whyVisit: "Birdwatching and peace" },
    ],
    viewpoints: [
      { id: "v1", name: "Ramdhura View Tower", description: "Panoramic views of Mt. Kanchenjunga.", image: "", type: "panoramic" },
    ],
    adventureActivities: [
      { id: "act1", name: "Forest Trek", description: "Trek through pine and oak forests.", image: "", difficulty: "Easy", duration: "3 hrs", price: "₹800" },
    ],
    restaurants: [
      { id: "r1", name: "Hillside Kitchen", cuisine: "Local & Nepali", rating: 4.4, priceRange: "₹250-450", image: "", description: "Home-cooked meals with valley views." },
    ],
    cafes: [
      { id: "c1", name: "Cloud Cafe", specialty: "Organic Tea", rating: 4.3, image: "", description: "Sit among the clouds with a warm cup." },
    ],
    shopping: [
      { id: "s1", name: "Village Craft Center", description: "Local handicrafts and organic produce.", whatToBuy: ["Organic honey", "Handmade soaps", "Woolen crafts"] },
    ],
    suggestedItineraries: [
      { days: 2, title: "Ramdhura Nature Stay", overview: "A perfect weekend in the hills.", daysPlan: [{ day: 1, title: "Arrival & Village Walk", activities: ["Arrive", "Village walk", "Sunset at viewpoint"], meals: ["Lunch", "Dinner"], transport: "Taxi from NJP", accommodation: "Homestay", budget: "₹2,500" }, { day: 2, title: "Forest Trek & Departure", activities: ["Forest trek", "Local breakfast", "Depart"], meals: ["Breakfast"], transport: "Taxi", accommodation: "N/A", budget: "₹1,000" }], estimatedBudget: "₹3,500-5,000" },
    ],
    nearbyPlaces: [
      { name: "Delo", distance: "12 km", description: "Kalimpong's highest point." },
      { name: "Pedong", distance: "10 km", description: "Historical Silk Route town." },
    ],
    rating: 4.5,
    reviewCount: 92,
  }),
  makeDestination({
    id: "dest-5",
    name: "Mirik",
    slug: "mirik",
    tagline: "The Valley of the Lake",
    state: "West Bengal",
    district: "Darjeeling",
    heroImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop",
    ],
    introduction: "Mirik is a picturesque hill station centered around the beautiful Sumendu Lake, surrounded by tea gardens and orange orchards.",
    history: "Developed as a tourist destination in the 1970s, Mirik is now a popular spot for boating and tea tourism.",
    coordinates: { lat: 26.8874, lng: 88.1899 },
    altitude: "1,495 m",
    nearbyAttractions: [
      { id: "a1", name: "Sumendu Lake", description: "A beautiful man-made lake with a walking path.", image: "", category: "Nature" },
      { id: "a2", name: "Bokar Monastery", description: "A serene Buddhist monastery overlooking the valley.", image: "", category: "Religious" },
    ],
    hiddenGems: [
      { id: "h1", name: "Orange Orchards", description: "Walk through fragrant orange groves.", image: "", whyVisit: "Seasonal fruit picking and photography" },
    ],
    viewpoints: [
      { id: "v1", name: "Devi Sthan Viewpoint", description: "Views of the lake and surrounding hills.", image: "", type: "panoramic" },
    ],
    adventureActivities: [
      { id: "act1", name: "Boating", description: "Rowboat and paddle boat rides on Sumendu Lake.", image: "", difficulty: "Easy", duration: "30-60 mins", price: "₹100-300" },
      { id: "act2", name: "Horse Riding", description: "Ride around the lake on horseback.", image: "", difficulty: "Easy", duration: "30 mins", price: "₹200" },
    ],
    restaurants: [
      { id: "r1", name: "Lake View Restaurant", cuisine: "Multi-cuisine", rating: 4.2, priceRange: "₹300-600", image: "", description: "Views of the lake while you dine." },
    ],
    cafes: [
      { id: "c1", name: "Lake Side Cafe", specialty: "Fresh Juice & Snacks", rating: 4.1, image: "", description: "Perfect spot for evening snacks." },
    ],
    shopping: [
      { id: "s1", name: "Mirik Market", description: "Local market for tea and handicrafts.", whatToBuy: ["Mirik Tea", "Oranges", "Local handicrafts"] },
    ],
    suggestedItineraries: [
      { days: 2, title: "Mirik Lake Weekend", overview: "A relaxing weekend by the lake.", daysPlan: [{ day: 1, title: "Lake & Monastery", activities: ["Sumendu Lake boating", "Bokar Monastery", "Evening walk"], meals: ["Lunch", "Dinner"], transport: "Taxi from Siliguri", accommodation: "Resort", budget: "₹3,000" }, { day: 2, title: "Tea Gardens & Departure", activities: ["Tea garden visit", "Orange orchards", "Depart"], meals: ["Breakfast"], transport: "Taxi", accommodation: "N/A", budget: "₹1,500" }], estimatedBudget: "₹4,500-6,500" },
    ],
    nearbyPlaces: [
      { name: "Darjeeling", distance: "49 km", description: "Famous hill station." },
      { name: "Kurseong", distance: "31 km", description: "Land of white orchids." },
    ],
    featured: true,
    rating: 4.5,
    reviewCount: 310,
  }),
  makeDestination({
    id: "dest-6",
    name: "Lamahatta",
    slug: "lamahatta",
    tagline: "The Eco-Tourism Paradise",
    state: "West Bengal",
    district: "Darjeeling",
    heroImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    ],
    introduction: "Lamahatta is an eco-tourism destination known for its sacred lake, dense pine forests, and breathtaking mountain views. A model for sustainable tourism.",
    history: "Developed by the West Bengal Forest Department as an eco-tourism spot to promote sustainable livelihoods for locals.",
    coordinates: { lat: 27.0333, lng: 88.3500 },
    altitude: "1,700 m",
    nearbyAttractions: [
      { id: "a1", name: "Lamahatta Lake", description: "A serene sacred lake surrounded by prayer flags.", image: "", category: "Nature" },
      { id: "a2", name: "Dhokrey Village", description: "A traditional village with panoramic mountain views.", image: "", category: "Culture" },
    ],
    hiddenGems: [
      { id: "h1", name: "Pine Forest Meditation Spot", description: "A quiet spot in the pine forest for meditation.", image: "", whyVisit: "Peace and connection with nature" },
    ],
    viewpoints: [
      { id: "v1", name: "Mountain View Tower", description: "Clear views of Kanchenjunga range.", image: "", type: "panoramic" },
    ],
    adventureActivities: [
      { id: "act1", name: "Nature Walk", description: "Guided walk through pine and dhupi forests.", image: "", difficulty: "Easy", duration: "2 hrs", price: "₹500" },
    ],
    restaurants: [
      { id: "r1", name: "Eco Cafe", cuisine: "Organic & Local", rating: 4.3, priceRange: "₹200-400", image: "", description: "Organic food sourced from local farms." },
    ],
    cafes: [
      { id: "c1", name: "Forest Cafe", specialty: "Herbal Tea", rating: 4.2, image: "", description: "Herbal teas brewed from local herbs." },
    ],
    shopping: [
      { id: "s1", name: "Eco Shop", description: "Sustainable products and local crafts.", whatToBuy: ["Bamboo crafts", "Organic spices", "Handmade paper"] },
    ],
    suggestedItineraries: [
      { days: 1, title: "Lamahatta Eco Day", overview: "A day of nature and peace.", daysPlan: [{ day: 1, title: "Eco Exploration", activities: ["Lake visit", "Forest walk", "Village interaction"], meals: ["Organic lunch", "Herbal tea"], transport: "Taxi from Darjeeling", accommodation: "N/A", budget: "₹1,500" }], estimatedBudget: "₹1,500-2,500" },
    ],
    nearbyPlaces: [
      { name: "Takdah", distance: "8 km", description: "Former British cantonment." },
      { name: "Tinchuley", distance: "10 km", description: "Panoramic viewpoint village." },
    ],
    rating: 4.4,
    reviewCount: 134,
  }),
  makeDestination({
    id: "dest-7",
    name: "Lepchajagat",
    slug: "lepchajagat",
    tagline: "The Lepcha Heritage Village",
    state: "West Bengal",
    district: "Darjeeling",
    heroImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    ],
    introduction: "Lepchajagat is a quaint village that preserves the rich Lepcha culture and offers some of the best sunrise views over the Himalayas.",
    history: "A village inhabited by the indigenous Lepcha community, offering authentic cultural experiences.",
    coordinates: { lat: 27.0500, lng: 88.3167 },
    altitude: "1,950 m",
    nearbyAttractions: [
      { id: "a1", name: "Lepcha Cultural Center", description: "Museum showcasing Lepcha traditions and artifacts.", image: "", category: "Culture" },
      { id: "a2", name: "Sunrise Point", description: "Famous for golden sunrise over Kanchenjunga.", image: "", category: "Viewpoint" },
    ],
    hiddenGems: [
      { id: "h1", name: "Ancient Lepcha Grove", description: "Sacred forest preserved by the Lepcha community.", image: "", whyVisit: "Spiritual and cultural significance" },
    ],
    viewpoints: [
      { id: "v1", name: "Sunrise Point Lepchajagat", description: "Best sunrise view in the region.", image: "", type: "sunrise" },
    ],
    adventureActivities: [
      { id: "act1", name: "Cultural Walk", description: "Guided walk through Lepcha villages.", image: "", difficulty: "Easy", duration: "3 hrs", price: "₹600" },
    ],
    restaurants: [
      { id: "r1", name: "Heritage Kitchen", cuisine: "Lepcha & Nepali", rating: 4.5, priceRange: "₹250-450", image: "", description: "Traditional Lepcha cuisine." },
    ],
    cafes: [
      { id: "c1", name: "Sunrise Cafe", specialty: "Herbal Brews", rating: 4.4, image: "", description: "Start your day with traditional herbal drinks." },
    ],
    shopping: [
      { id: "s1", name: "Lepcha Handloom", description: "Traditional Lepcha textiles and crafts.", whatToBuy: ["Lepcha shawls", "Bamboo baskets", "Traditional jewelry"] },
    ],
    suggestedItineraries: [
      { days: 2, title: "Lepcha Heritage Weekend", overview: "Immerse yourself in Lepcha culture.", daysPlan: [{ day: 1, title: "Arrival & Culture", activities: ["Arrive", "Cultural center", "Village walk", "Sunset"], meals: ["Lunch", "Dinner"], transport: "Taxi from NJP", accommodation: "Homestay", budget: "₹2,500" }, { day: 2, title: "Sunrise & Departure", activities: ["Sunrise point", "Ancient grove", "Depart"], meals: ["Breakfast"], transport: "Taxi", accommodation: "N/A", budget: "₹1,000" }], estimatedBudget: "₹3,500-5,000" },
    ],
    nearbyPlaces: [
      { name: "Jorpokhri", distance: "5 km", description: "Twin lakes in a nature reserve." },
      { name: "Darjeeling", distance: "19 km", description: "Famous hill station." },
    ],
    rating: 4.5,
    reviewCount: 88,
  }),
  makeDestination({
    id: "dest-8",
    name: "Chatakpur",
    slug: "chatakpur",
    tagline: "The Eco-Village in the Clouds",
    state: "West Bengal",
    district: "Darjeeling",
    heroImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    ],
    introduction: "Chatakpur is a model eco-village offering stunning views of Mt. Kanchenjunga, surrounded by dense forests and rare orchids.",
    history: "Established as a community-led eco-tourism initiative by the forest department and local villagers.",
    coordinates: { lat: 27.0500, lng: 88.2833 },
    altitude: "2,100 m",
    nearbyAttractions: [
      { id: "a1", name: "Orchid Sanctuary", description: "Home to rare Himalayan orchids.", image: "", category: "Nature" },
      { id: "a2", name: "Chatakpur Watchtower", description: "Best views of the surrounding peaks.", image: "", category: "Viewpoint" },
    ],
    hiddenGems: [
      { id: "h1", name: "Rhododendron Valley", description: "Valley filled with blooming rhododendrons in spring.", image: "", whyVisit: "Spectacular colors and biodiversity" },
    ],
    viewpoints: [
      { id: "v1", name: "Kanchenjunga View Tower", description: "Unobstructed views of the world's third highest peak.", image: "", type: "panoramic" },
    ],
    adventureActivities: [
      { id: "act1", name: "Orchid Trail", description: "Guided trek to spot rare orchids.", image: "", difficulty: "Easy", duration: "3 hrs", price: "₹700" },
    ],
    restaurants: [
      { id: "r1", name: "Eco Kitchen", cuisine: "Organic Local", rating: 4.3, priceRange: "₹200-400", image: "", description: "Fresh organic meals with valley views." },
    ],
    cafes: [
      { id: "c1", name: "Mountain Brew", specialty: "Organic Coffee", rating: 4.2, image: "", description: "Locally grown organic coffee." },
    ],
    shopping: [
      { id: "s1", name: "Village Cooperative", description: "Organic produce and handicrafts.", whatToBuy: ["Organic tea", "Handmade soaps", "Woolen items"] },
    ],
    suggestedItineraries: [
      { days: 2, title: "Chatakpur Eco Retreat", overview: "A sustainable tourism experience.", daysPlan: [{ day: 1, title: "Arrival & Nature Walk", activities: ["Arrive", "Orchid trail", "Community interaction"], meals: ["Lunch", "Dinner"], transport: "Taxi from Darjeeling", accommodation: "Eco lodge", budget: "₹2,500" }, { day: 2, title: "Sunrise & Departure", activities: ["Sunrise at tower", "Village breakfast", "Depart"], meals: ["Breakfast"], transport: "Taxi", accommodation: "N/A", budget: "₹1,000" }], estimatedBudget: "₹3,500-5,000" },
    ],
    nearbyPlaces: [
      { name: "Darjeeling", distance: "22 km", description: "Famous hill station." },
      { name: "Pelling", distance: "45 km", description: "Sikkim's scenic town." },
    ],
    rating: 4.4,
    reviewCount: 67,
  }),
  makeDestination({
    id: "dest-9",
    name: "Samsing",
    slug: "samsing",
    tagline: "The Valley of Oranges and Rivers",
    state: "West Bengal",
    district: "Kalimpong",
    heroImage: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    ],
    introduction: "Samsing is a scenic valley surrounded by tea gardens, orange orchards, and the meandering Neora River. A paradise for birdwatchers.",
    history: "A former tea plantation area that has transformed into a biodiversity hotspot and eco-tourism destination.",
    coordinates: { lat: 27.0667, lng: 88.8000 },
    altitude: "1,500 m",
    nearbyAttractions: [
      { id: "a1", name: "Neora Valley National Park", description: "Rich biodiversity with red pandas and clouded leopards.", image: "", category: "Nature" },
      { id: "a2", name: "Samsing Tea Garden", description: "Picturesque tea garden with factory visits.", image: "", category: "Heritage" },
    ],
    hiddenGems: [
      { id: "h1", name: "Lava Jamunae", description: "A hidden waterfall in the forest.", image: "", whyVisit: "Secluded and pristine" },
    ],
    viewpoints: [
      { id: "v1", name: "Sunset Point Samsing", description: "Sunset over the orange orchards.", image: "", type: "sunset" },
    ],
    adventureActivities: [
      { id: "act1", name: "Birdwatching Tour", description: "Spot rare Himalayan birds.", image: "", difficulty: "Easy", duration: "4 hrs", price: "₹1,000" },
      { id: "act2", name: "River Trekking", description: "Trek along the Neora River.", image: "", difficulty: "Moderate", duration: "5 hrs", price: "₹1,500" },
    ],
    restaurants: [
      { id: "r1", name: "Orange Grove Restaurant", cuisine: "Local & Continental", rating: 4.2, priceRange: "₹300-500", image: "", description: "Surrounded by orange trees." },
    ],
    cafes: [
      { id: "c1", name: "River Cafe", specialty: "Fresh Juice", rating: 4.1, image: "", description: "Fresh orange juice and snacks by the river." },
    ],
    shopping: [
      { id: "s1", name: "Orange Market", description: "Fresh oranges and local produce.", whatToBuy: ["Organic oranges", "Local honey", "Tea"] },
    ],
    suggestedItineraries: [
      { days: 2, title: "Samsing Nature Weekend", overview: "Birds, rivers, and oranges.", daysPlan: [{ day: 1, title: "Arrival & Birdwatching", activities: ["Arrive", "Birdwatching tour", "Tea garden visit"], meals: ["Lunch", "Dinner"], transport: "Taxi from NJP", accommodation: "Homestay", budget: "₹2,500" }, { day: 2, title: "River & Departure", activities: ["River trek", "Orange orchard walk", "Depart"], meals: ["Breakfast"], transport: "Taxi", accommodation: "N/A", budget: "₹1,000" }], estimatedBudget: "₹3,500-5,500" },
    ],
    nearbyPlaces: [
      { name: "Lava", distance: "18 km", description: "Forest village and monastery." },
      { name: "Rishop", distance: "25 km", description: "Panoramic mountain views." },
    ],
    rating: 4.3,
    reviewCount: 102,
  }),
  makeDestination({
    id: "dest-10",
    name: "Sittong",
    slug: "sittong",
    tagline: "The Orange Village of Bengal",
    state: "West Bengal",
    district: "Kalimpong",
    heroImage: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    ],
    introduction: "Sittong is a beautiful village famous for its orange orchards, bamboo groves, and the stunning Ahaldhara Viewpoint. A perfect blend of nature and agriculture.",
    history: "A traditional village that has become famous for its organic orange cultivation and bamboo crafts.",
    coordinates: { lat: 27.0167, lng: 88.3833 },
    altitude: "1,400 m",
    nearbyAttractions: [
      { id: "a1", name: "Ahaldhara Viewpoint", description: "Panoramic views of the surrounding hills and valleys.", image: "", category: "Viewpoint" },
      { id: "a2", name: "Orange Orchards", description: "Endless rows of orange trees during harvest season.", image: "", category: "Nature" },
    ],
    hiddenGems: [
      { id: "h1", name: "Bamboo Bridge", description: "A handmade bamboo bridge over a stream.", image: "", whyVisit: "Traditional engineering and photo opportunity" },
    ],
    viewpoints: [
      { id: "v1", name: "Ahaldhara Viewpoint", description: "Sunrise over the orange valley.", image: "", type: "sunrise" },
    ],
    adventureActivities: [
      { id: "act1", name: "Orchard Walk", description: "Walk through organic orange orchards.", image: "", difficulty: "Easy", duration: "2 hrs", price: "₹500" },
      { id: "act2", name: "Bamboo Craft Workshop", description: "Learn traditional bamboo weaving.", image: "", difficulty: "Easy", duration: "3 hrs", price: "₹800" },
    ],
    restaurants: [
      { id: "r1", name: "Orange Kitchen", cuisine: "Local & Organic", rating: 4.4, priceRange: "₹250-450", image: "", description: "Fresh organic meals with orange-based dishes." },
    ],
    cafes: [
      { id: "c1", name: "Grove Cafe", specialty: "Orange Juice & Snacks", rating: 4.3, image: "", description: "Freshly squeezed orange juice and light snacks." },
    ],
    shopping: [
      { id: "s1", name: "Orange Market", description: "Fresh oranges and orange-based products.", whatToBuy: ["Organic oranges", "Orange marmalade", "Orange wine", "Bamboo crafts"] },
    ],
    suggestedItineraries: [
      { days: 2, title: "Sittong Orange Weekend", overview: "Experience the orange village.", daysPlan: [{ day: 1, title: "Arrival & Orchard Visit", activities: ["Arrive", "Orchard walk", "Bamboo workshop", "Sunset viewpoint"], meals: ["Lunch", "Dinner"], transport: "Taxi from NJP", accommodation: "Homestay", budget: "₹2,500" }, { day: 2, title: "Nature & Departure", activities: ["Village walk", "Orange breakfast", "Depart"], meals: ["Breakfast"], transport: "Taxi", accommodation: "N/A", budget: "₹1,000" }], estimatedBudget: "₹3,500-5,000" },
    ],
    nearbyPlaces: [
      { name: "Mongpu", distance: "8 km", description: "Tagore's mountain retreat." },
      { name: "Chatakpur", distance: "35 km", description: "Eco-village in the clouds." },
    ],
    rating: 4.4,
    reviewCount: 145,
  }),
  makeDestination({
    id: "dest-11",
    name: "Bijanbari",
    slug: "bijanbari",
    tagline: "The Riverside Retreat",
    state: "West Bengal",
    district: "Darjeeling",
    heroImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    ],
    introduction: "Bijanbari is a serene village along the Rangeet River, surrounded by tea gardens and cardamom plantations. A perfect offbeat getaway.",
    history: "A traditional agricultural village known for its organic farming and peaceful environment.",
    coordinates: { lat: 27.0500, lng: 88.2167 },
    altitude: "1,100 m",
    nearbyAttractions: [
      { id: "a1", name: "Rangeet River", description: "Crystal clear river with boulders and pools.", image: "", category: "Nature" },
      { id: "a2", name: "Tea Gardens", description: "Rolling tea estates with factory visits.", image: "", category: "Heritage" },
    ],
    hiddenGems: [
      { id: "h1", name: "Natural Pool", description: "A swimming hole in the Rangeet River.", image: "", whyVisit: "Refreshingly cold and secluded" },
    ],
    viewpoints: [
      { id: "v1", name: "Bijanbari Viewpoint", description: "Views of the river valley and tea gardens.", image: "", type: "panoramic" },
    ],
    adventureActivities: [
      { id: "act1", name: "River Trekking", description: "Trek along the Rangeet River.", image: "", difficulty: "Easy", duration: "4 hrs", price: "₹1,000" },
    ],
    restaurants: [
      { id: "r1", name: "River View Diner", cuisine: "Local & Nepali", rating: 4.1, priceRange: "₹200-400", image: "", description: "Meals with views of the river." },
    ],
    cafes: [
      { id: "c1", name: "Riverside Cafe", specialty: "Herbal Tea", rating: 4.0, image: "", description: "Relax by the river with herbal tea." },
    ],
    shopping: [
      { id: "s1", name: "Organic Market", description: "Fresh organic produce.", whatToBuy: ["Organic cardamom", "Tea", "Local honey"] },
    ],
    suggestedItineraries: [
      { days: 2, title: "Bijanbari Riverside Escape", overview: "Peace by the river.", daysPlan: [{ day: 1, title: "Arrival & River Walk", activities: ["Arrive", "River trek", "Tea garden visit"], meals: ["Lunch", "Dinner"], transport: "Taxi from NJP", accommodation: "Homestay", budget: "₹2,000" }, { day: 2, title: "Nature & Departure", activities: ["Natural pool", "Village walk", "Depart"], meals: ["Breakfast"], transport: "Taxi", accommodation: "N/A", budget: "₹1,000" }], estimatedBudget: "₹3,000-4,500" },
    ],
    nearbyPlaces: [
      { name: "Rimbik", distance: "12 km", description: "Trekking base camp." },
      { name: "Maneybhanjyang", distance: "15 km", description: "Gateway to Sandakphu." },
    ],
    rating: 4.2,
    reviewCount: 54,
  }),
  makeDestination({
    id: "dest-12",
    name: "Ahaldhara",
    slug: "ahaldhara",
    tagline: "The Viewpoint Above the Clouds",
    state: "West Bengal",
    district: "Kalimpong",
    heroImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    ],
    introduction: "Ahaldhara is a stunning viewpoint near Sittong, offering panoramic views of the Teesta River, the plains of Bengal, and the Eastern Himalayas.",
    history: "Once a remote forest area, Ahaldhara has emerged as a popular viewpoint for its breathtaking scenery.",
    coordinates: { lat: 27.0333, lng: 88.4000 },
    altitude: "1,600 m",
    nearbyAttractions: [
      { id: "a1", name: "Ahaldhara Viewpoint", description: "The main attraction with 360-degree views.", image: "", category: "Viewpoint" },
      { id: "a2", name: "Namthing Pokhri", description: "A seasonal lake known for sighting salamanders.", image: "", category: "Nature" },
    ],
    hiddenGems: [
      { id: "h1", name: "Hidden Waterfall", description: "A small waterfall off the main trail.", image: "", whyVisit: "Peaceful and photogenic" },
    ],
    viewpoints: [
      { id: "v1", name: "Ahaldhara Main Viewpoint", description: "Best views of Teesta and Himalayas.", image: "", type: "panoramic" },
    ],
    adventureActivities: [
      { id: "act1", name: "Viewpoint Trek", description: "Short trek to the main viewpoint.", image: "", difficulty: "Easy", duration: "1.5 hrs", price: "₹400" },
    ],
    restaurants: [
      { id: "r1", name: "Viewpoint Restaurant", cuisine: "Local", rating: 4.0, priceRange: "₹200-400", image: "", description: "Simple meals with spectacular views." },
    ],
    cafes: [
      { id: "c1", name: "Sunset Cafe", specialty: "Tea", rating: 4.1, image: "", description: "Best spot for evening tea." },
    ],
    shopping: [
      { id: "s1", name: "Local Stall", description: "Handicrafts and snacks.", whatToBuy: ["Local snacks", "Handicrafts"] },
    ],
    suggestedItineraries: [
      { days: 1, title: "Ahaldhara Day Trip", overview: "Quick escape for views.", daysPlan: [{ day: 1, title: "Viewpoint Visit", activities: ["Trek to viewpoint", "Photography", "Sunset"], meals: ["Snacks", "Tea"], transport: "Taxi from Siliguri", accommodation: "N/A", budget: "₹1,000" }], estimatedBudget: "₹1,000-2,000" },
    ],
    nearbyPlaces: [
      { name: "Sittong", distance: "5 km", description: "Orange village." },
      { name: "Mongpu", distance: "12 km", description: "Tagore's retreat." },
    ],
    rating: 4.3,
    reviewCount: 76,
  }),
  makeDestination({
    id: "dest-13",
    name: "Kolbong",
    slug: "kolbong",
    tagline: "The Silent Valley of Pines",
    state: "West Bengal",
    district: "Kalimpong",
    heroImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    ],
    introduction: "Kolbong is a peaceful village surrounded by dense pine forests, offering solitude and unspoiled natural beauty.",
    history: "A traditional forest village that has preserved its natural heritage.",
    coordinates: { lat: 27.1000, lng: 88.4500 },
    altitude: "1,550 m",
    nearbyAttractions: [
      { id: "a1", name: "Pine Forest", description: "Dense pine and dhupi forests.", image: "", category: "Nature" },
      { id: "a2", name: "Village Walk", description: "Scenic walks through traditional villages.", image: "", category: "Culture" },
    ],
    hiddenGems: [
      { id: "h1", name: "Forest Meditation Spot", description: "A quiet spot deep in the pine forest.", image: "", whyVisit: "Perfect for meditation and reflection" },
    ],
    viewpoints: [
      { id: "v1", name: "Kolbong Viewpoint", description: "Views through the pine trees.", image: "", type: "panoramic" },
    ],
    adventureActivities: [
      { id: "act1", name: "Forest Trek", description: "Trek through the pine forests.", image: "", difficulty: "Easy", duration: "3 hrs", price: "₹600" },
    ],
    restaurants: [
      { id: "r1", name: "Forest Kitchen", cuisine: "Local", rating: 4.1, priceRange: "₹200-400", image: "", description: "Home-cooked meals in the forest." },
    ],
    cafes: [
      { id: "c1", name: "Pine Cafe", specialty: "Herbal Tea", rating: 4.0, image: "", description: "Tea among the pines." },
    ],
    shopping: [
      { id: "s1", name: "Forest Produce", description: "Natural products from the forest.", whatToBuy: ["Pine resin products", "Herbal medicines", "Organic tea"] },
    ],
    suggestedItineraries: [
      { days: 1, title: "Kolbong Forest Day", overview: "A day in the silent forest.", daysPlan: [{ day: 1, title: "Forest Exploration", activities: ["Forest trek", "Meditation", "Village visit"], meals: ["Lunch", "Tea"], transport: "Taxi from Kalimpong", accommodation: "N/A", budget: "₹1,500" }], estimatedBudget: "₹1,500-2,500" },
    ],
    nearbyPlaces: [
      { name: "Kalimpong", distance: "15 km", description: "Hill station." },
      { name: "Lava", distance: "20 km", description: "Forest village." },
    ],
    rating: 4.2,
    reviewCount: 42,
  }),
  makeDestination({
    id: "dest-14",
    name: "Kolakham",
    slug: "kolakham",
    tagline: "Where Kanchenjunga Smiles at You",
    state: "West Bengal",
    district: "Kalimpong",
    heroImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1506905925345-596d3c1e03a6?q=80&w=800&auto=format&fit=crop",
    ],
    introduction: "Kolakham offers one of the closest and most stunning views of Mt. Kanchenjunga, surrounded by rhododendron forests and village life.",
    history: "A remote village that has become a favorite among trekkers and photographers for its close-up views of Kanchenjunga.",
    coordinates: { lat: 27.1167, lng: 88.6333 },
    altitude: "2,000 m",
    nearbyAttractions: [
      { id: "a1", name: "Kanchenjunga View", description: "Close-up views of the world's third highest peak.", image: "", category: "Viewpoint" },
      { id: "a2", name: "Changey Falls", description: "A beautiful waterfall surrounded by forest.", image: "", category: "Nature" },
    ],
    hiddenGems: [
      { id: "h1", name: "Rhododendron Grove", description: "Ancient rhododendron trees.", image: "", whyVisit: "Beautiful blooms in spring" },
    ],
    viewpoints: [
      { id: "v1", name: "Kolakham Viewpoint", description: "Closest view of Kanchenjunga from Bengal.", image: "", type: "panoramic" },
    ],
    adventureActivities: [
      { id: "act1", name: "Changey Falls Trek", description: "Trek to the beautiful waterfall.", image: "", difficulty: "Moderate", duration: "4 hrs", price: "₹1,200" },
    ],
    restaurants: [
      { id: "r1", name: "Mountain View Restaurant", cuisine: "Local", rating: 4.2, priceRange: "₹250-450", image: "", description: "Meals with the best mountain views." },
    ],
    cafes: [
      { id: "c1", name: "Sunrise Cafe", specialty: "Hot Chocolate", rating: 4.3, image: "", description: "Warm drinks with sunrise views." },
    ],
    shopping: [
      { id: "s1", name: "Village Market", description: "Local handicrafts.", whatToBuy: ["Woolen shawls", "Organic tea", "Wooden crafts"] },
    ],
    suggestedItineraries: [
      { days: 2, title: "Kolakham Mountain Weekend", overview: "Face-to-face with Kanchenjunga.", daysPlan: [{ day: 1, title: "Arrival & Trek", activities: ["Arrive", "Changey Falls trek", "Sunset views"], meals: ["Lunch", "Dinner"], transport: "Taxi from NJP", accommodation: "Homestay", budget: "₹3,000" }, { day: 2, title: "Sunrise & Departure", activities: ["Sunrise at viewpoint", "Village walk", "Depart"], meals: ["Breakfast"], transport: "Taxi", accommodation: "N/A", budget: "₹1,500" }], estimatedBudget: "₹4,500-6,500" },
    ],
    nearbyPlaces: [
      { name: "Lava", distance: "10 km", description: "Forest village." },
      { name: "Rishop", distance: "15 km", description: "Panoramic views." },
    ],
    rating: 4.5,
    reviewCount: 98,
  }),
  makeDestination({
    id: "dest-15",
    name: "Peshok",
    slug: "peshok",
    tagline: "The Tea Garden Wonderland",
    state: "West Bengal",
    district: "Darjeeling",
    heroImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    ],
    introduction: "Peshok is a beautiful area known for its tea gardens, the confluence of the Teesta and Rangeet rivers, and stunning valley views.",
    history: "A major tea-producing area with colonial-era plantations and stunning river confluence views.",
    coordinates: { lat: 27.0333, lng: 88.3333 },
    altitude: "1,200 m",
    nearbyAttractions: [
      { id: "a1", name: "Triveni Viewpoint", description: "Confluence of Teesta and Rangeet rivers.", image: "", category: "Viewpoint" },
      { id: "a2", name: "Peshok Tea Garden", description: "Vast tea plantations with factory tours.", image: "", category: "Heritage" },
    ],
    hiddenGems: [
      { id: "h1", name: "River Confluence Beach", description: "A sandy beach where two rivers meet.", image: "", whyVisit: "Unique geography and peaceful atmosphere" },
    ],
    viewpoints: [
      { id: "v1", name: "Triveni Viewpoint", description: "Best view of river confluence.", image: "", type: "panoramic" },
    ],
    adventureActivities: [
      { id: "act1", name: "Tea Garden Walk", description: "Guided walk through tea plantations.", image: "", difficulty: "Easy", duration: "2 hrs", price: "₹500" },
    ],
    restaurants: [
      { id: "r1", name: "Tea Garden Restaurant", cuisine: "Local & Continental", rating: 4.2, priceRange: "₹300-500", image: "", description: "Meals amidst tea gardens." },
    ],
    cafes: [
      { id: "c1", name: "Tea Lounge", specialty: "Darjeeling Tea", rating: 4.5, image: "", description: "Taste the finest Peshok tea." },
    ],
    shopping: [
      { id: "s1", name: "Tea Outlet", description: "Fresh tea from the garden.", whatToBuy: ["First Flush", "Green Tea", "Oolong", "Tea accessories"] },
    ],
    suggestedItineraries: [
      { days: 1, title: "Peshok Tea Day", overview: "Tea and rivers.", daysPlan: [{ day: 1, title: "Tea & River Day", activities: ["Tea garden walk", "Triveni viewpoint", "River beach"], meals: ["Lunch", "Tea tasting"], transport: "Taxi from Darjeeling", accommodation: "N/A", budget: "₹1,500" }], estimatedBudget: "₹1,500-2,500" },
    ],
    nearbyPlaces: [
      { name: "Darjeeling", distance: "20 km", description: "Famous hill station." },
      { name: "Takdah", distance: "10 km", description: "Former cantonment." },
    ],
    rating: 4.3,
    reviewCount: 64,
  }),
  makeDestination({
    id: "dest-16",
    name: "Rishikhola",
    slug: "rishikhola",
    tagline: "The Riverside Camping Paradise",
    state: "West Bengal",
    district: "Kalimpong",
    heroImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    ],
    introduction: "Rishikhola is a beautiful riverside village along the Rishi River, perfect for camping, fishing, and riverside relaxation.",
    history: "A quiet village that has recently become popular for riverside camping and nature tourism.",
    coordinates: { lat: 27.1500, lng: 88.7000 },
    altitude: "900 m",
    nearbyAttractions: [
      { id: "a1", name: "Rishi River", description: "Crystal clear river with boulders and camping spots.", image: "", category: "Nature" },
      { id: "a2", name: "Samsing Tea Garden", description: "Picturesque tea gardens nearby.", image: "", category: "Heritage" },
    ],
    hiddenGems: [
      { id: "h1", name: "Secret Fishing Spot", description: "A quiet spot perfect for angling.", image: "", whyVisit: "Peaceful and abundant with trout" },
    ],
    viewpoints: [
      { id: "v1", name: "Riverside Sunset Point", description: "Sunset over the Rishi River.", image: "", type: "sunset" },
    ],
    adventureActivities: [
      { id: "act1", name: "Riverside Camping", description: "Camp by the Rishi River.", image: "", difficulty: "Easy", duration: "Overnight", price: "₹2,000" },
      { id: "act2", name: "Fishing", description: "Angling in the Rishi River.", image: "", difficulty: "Easy", duration: "3 hrs", price: "₹800" },
    ],
    restaurants: [
      { id: "r1", name: "Riverside Kitchen", cuisine: "Local & BBQ", rating: 4.1, priceRange: "₹300-500", image: "", description: "Freshly cooked meals by the river." },
    ],
    cafes: [
      { id: "c1", name: "River Cafe", specialty: "Fresh Juice", rating: 4.0, image: "", description: "Refreshing drinks by the river." },
    ],
    shopping: [
      { id: "s1", name: "Camping Gear Rental", description: "Rent camping equipment.", whatToBuy: ["Tents", "Sleeping bags", "Fishing gear"] },
    ],
    suggestedItineraries: [
      { days: 2, title: "Rishikhola Camping Weekend", overview: "Camp by the river.", daysPlan: [{ day: 1, title: "Arrival & Camping", activities: ["Arrive", "Set up camp", "Fishing", "BBQ dinner"], meals: ["Lunch", "BBQ Dinner"], transport: "Taxi from NJP", accommodation: "Camping", budget: "₹3,000" }, { day: 2, title: "River & Departure", activities: ["Morning swim", "Breakfast", "River walk", "Depart"], meals: ["Breakfast"], transport: "Taxi", accommodation: "N/A", budget: "₹1,000" }], estimatedBudget: "₹4,000-6,000" },
    ],
    nearbyPlaces: [
      { name: "Samsing", distance: "8 km", description: "Valley of oranges." },
      { name: "Lava", distance: "22 km", description: "Forest village." },
    ],
    rating: 4.4,
    reviewCount: 87,
  }),
  makeDestination({
    id: "dest-17",
    name: "Pelling",
    slug: "pelling",
    tagline: "The Crown Jewel of Sikkim",
    state: "Sikkim",
    district: "Gyalshing",
    heroImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1506905925345-596d3c1e03a6?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    ],
    introduction: "Pelling is one of the most popular destinations in Sikkim, known for its breathtaking views of Mt. Kanchenjunga, ancient monasteries, and the iconic Pemayangtse Monastery.",
    history: "Pelling was historically important as the second capital of the former kingdom of Sikkim and is home to some of the oldest monasteries.",
    coordinates: { lat: 27.3167, lng: 88.2333 },
    altitude: "2,150 m",
    nearbyAttractions: [
      { id: "a1", name: "Pemayangtse Monastery", description: "One of the oldest and most important monasteries in Sikkim.", image: "", category: "Religious" },
      { id: "a2", name: "Rabdentse Ruins", description: "Ancient ruins of the second capital of Sikkim.", image: "", category: "Heritage" },
      { id: "a3", name: "Khecheopalri Lake", description: "Sacred wish-fulfilling lake surrounded by forest.", image: "", category: "Nature" },
      { id: "a4", name: "Sangacholing Monastery", description: "One of the oldest monasteries in Sikkim with stunning views.", image: "", category: "Religious" },
    ],
    hiddenGems: [
      { id: "h1", name: "Yuksom Village", description: "The first capital of Sikkim with historical significance.", image: "", whyVisit: "Historical trek starting point and cultural immersion" },
      { id: "h2", name: "Kanchenjunga Falls", description: "A majestic waterfall on the way to Yuksom.", image: "", whyVisit: "Beautiful natural spectacle" },
    ],
    viewpoints: [
      { id: "v1", name: "Pelling Skywalk", description: "Glass-bottomed skywalk with mountain views.", image: "", type: "panoramic" },
      { id: "v2", name: "Sangacholing Viewpoint", description: "Best sunrise over Kanchenjunga.", image: "", type: "sunrise" },
    ],
    adventureActivities: [
      { id: "act1", name: "Pelling Skywalk", description: "Walk on the glass skywalk.", image: "", difficulty: "Easy", duration: "1 hr", price: "₹200" },
      { id: "act2", name: "Yuksom Trek", description: "Trek to Yuksom and Dubdi Monastery.", image: "", difficulty: "Moderate", duration: "1 day", price: "₹2,000" },
    ],
    restaurants: [
      { id: "r1", name: "Taste of Sikkim", cuisine: "Sikkimese & Tibetan", rating: 4.5, priceRange: "₹300-600", image: "", description: "Authentic Sikkimese cuisine with a view." },
      { id: "r2", name: "The Pelling Kitchen", cuisine: "Multi-cuisine", rating: 4.3, priceRange: "₹400-800", image: "", description: "Popular restaurant with diverse menu." },
    ],
    cafes: [
      { id: "c1", name: "Hilltop Cafe", specialty: "Organic Coffee", rating: 4.4, image: "", description: "Best coffee with mountain views." },
      { id: "c2", name: "Rabdentse Cafe", specialty: "Hot Chocolate", rating: 4.2, image: "", description: "Cozy cafe near the ruins." },
    ],
    shopping: [
      { id: "s1", name: "Pelling Market", description: "Local market for souvenirs and crafts.", whatToBuy: ["Prayer flags", "Sikkimese handicrafts", "Organic tea", "Thangka paintings"] },
    ],
    suggestedItineraries: [
      { days: 2, title: "Pelling Essential Weekend", overview: "Cover the main attractions of Pelling.", daysPlan: [{ day: 1, title: "Monasteries & Ruins", activities: ["Pemayangtse Monastery", "Rabdentse Ruins", "Skywalk"], meals: ["Lunch", "Dinner"], transport: "Taxi from Gangtok", accommodation: "Hotel", budget: "₹3,500" }, { day: 2, title: "Lake & Nature", activities: ["Khecheopalri Lake", "Yuksom village", "Kanchenjunga Falls", "Depart"], meals: ["Breakfast", "Lunch"], transport: "Taxi", accommodation: "N/A", budget: "₹2,500" }], estimatedBudget: "₹6,000-9,000" },
      { days: 3, title: "Pelling & Yuksom Explorer", overview: "Explore Pelling and nearby Yuksom in depth.", daysPlan: [{ day: 1, title: "Pelling Highlights", activities: ["Pemayangtse Monastery", "Rabdentse Ruins", "Skywalk"], meals: ["Lunch", "Dinner"], transport: "Taxi from Gangtok", accommodation: "Hotel", budget: "₹3,500" }, { day: 2, title: "Yuksom Day Trip", activities: ["Yuksom village", "Dubdi Monastery", "Coronation Throne", "Trek to lake"], meals: ["Breakfast", "Lunch", "Dinner"], transport: "Taxi", accommodation: "Hotel", budget: "₹3,000" }, { day: 3, title: "Lake & Departure", activities: ["Khecheopalri Lake", "Kanchenjunga Falls", "Shopping", "Depart"], meals: ["Breakfast", "Lunch"], transport: "Taxi", accommodation: "N/A", budget: "₹2,500" }], estimatedBudget: "₹9,000-12,000" },
    ],
    nearbyPlaces: [
      { name: "Yuksom", distance: "35 km", description: "First capital of Sikkim." },
      { name: "Geyzing", distance: "10 km", description: "District headquarters." },
      { name: "Gangtok", distance: "115 km", description: "Capital of Sikkim." },
    ],
    featured: true,
    rating: 4.7,
    reviewCount: 412,
  }),
];

export const packages: Package[] = [
  {
    id: "pkg-1",
    name: "Kalimpong Weekend Retreat",
    slug: "kalimpong-weekend-retreat",
    type: "weekend",
    image: "https://images.unsplash.com/photo-1506905925345-596d3c1e03a6?q=80&w=800&auto=format&fit=crop",
    duration: "2 Days / 1 Night",
    price: 4999,
    originalPrice: 6500,
    destinations: ["Kalimpong"],
    description: "A perfect weekend getaway to the serene hills of Kalimpong with sightseeing and relaxation.",
    highlights: ["Deolo Hill Sunrise", "Durpin Monastery", "Local Market Tour", "Cultural Evening"],
    inclusions: ["Hotel stay", "Breakfast & Dinner", "Sightseeing by car", "Guide"],
    exclusions: ["Lunch", "Personal expenses", "Activities"],
    itinerary: {
      days: 2,
      title: "Weekend Retreat",
      overview: "Relax and explore Kalimpong.",
      daysPlan: [],
      estimatedBudget: "₹4,999",
    },
    rating: 4.5,
    reviewCount: 89,
    featured: true,
  },
  {
    id: "pkg-2",
    name: "Sikkim Heritage Explorer",
    slug: "sikkim-heritage-explorer",
    type: "family",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
    duration: "5 Days / 4 Nights",
    price: 12999,
    originalPrice: 16000,
    destinations: ["Pelling", "Yuksom"],
    description: "Explore the rich heritage and natural beauty of Sikkim with your family.",
    highlights: ["Pemayangtse Monastery", "Rabdentse Ruins", "Khecheopalri Lake", "Yuksom Trek"],
    inclusions: ["Hotel stay", "All meals", "Private car", "Guide", "Entry fees"],
    exclusions: ["Personal expenses", "Extra activities"],
    itinerary: {
      days: 5,
      title: "Heritage Explorer",
      overview: "Discover Sikkim's heritage.",
      daysPlan: [],
      estimatedBudget: "₹12,999",
    },
    rating: 4.7,
    reviewCount: 156,
    featured: true,
  },
  {
    id: "pkg-3",
    name: "Hidden Gems Photography Tour",
    slug: "hidden-gems-photography",
    type: "photography",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    duration: "4 Days / 3 Nights",
    price: 8999,
    originalPrice: 12000,
    destinations: ["Chatakpur", "Lepchajagat", "Lamahatta"],
    description: "A photographer's dream tour through the most photogenic hidden destinations.",
    highlights: ["Sunrise at Chatakpur", "Lepcha Culture", "Lamahatta Lake", "Forest Photography"],
    inclusions: ["Homestay", "Breakfast", "Transport", "Photography guide"],
    exclusions: ["Camera equipment", "Personal expenses"],
    itinerary: {
      days: 4,
      title: "Photography Tour",
      overview: "Capture the hidden beauty.",
      daysPlan: [],
      estimatedBudget: "₹8,999",
    },
    rating: 4.6,
    reviewCount: 67,
    featured: true,
  },
  {
    id: "pkg-4",
    name: "Orange Village Retreat",
    slug: "orange-village-retreat",
    type: "couple",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop",
    duration: "2 Days / 1 Night",
    price: 5999,
    originalPrice: 7500,
    destinations: ["Sittong", "Ahaldhara"],
    description: "A romantic getaway to the orange village of Sittong and the viewpoints of Ahaldhara.",
    highlights: ["Orange Orchard Walk", "Sunset at Ahaldhara", "Candlelight Dinner", "Village Walk"],
    inclusions: ["Homestay", "All meals", "Private transfers", "Local guide"],
    exclusions: ["Personal expenses"],
    itinerary: {
      days: 2,
      title: "Couple Retreat",
      overview: "Romance in the hills.",
      daysPlan: [],
      estimatedBudget: "₹5,999",
    },
    rating: 4.5,
    reviewCount: 45,
    featured: false,
  },
  {
    id: "pkg-5",
    name: "Riverside Camping Adventure",
    slug: "riverside-camping-adventure",
    type: "camping",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop",
    duration: "2 Days / 1 Night",
    price: 3499,
    originalPrice: 4500,
    destinations: ["Rishikhola"],
    description: "Camp by the Rishi River with BBQ, fishing, and stargazing.",
    highlights: ["Riverside Camping", "BBQ Dinner", "Fishing", "Stargazing"],
    inclusions: ["Camping gear", "Dinner & Breakfast", "Fishing equipment", "Guide"],
    exclusions: ["Transport to Rishikhola", "Personal expenses"],
    itinerary: {
      days: 2,
      title: "Camping Adventure",
      overview: "Adventure by the river.",
      daysPlan: [],
      estimatedBudget: "₹3,499",
    },
    rating: 4.3,
    reviewCount: 112,
    featured: true,
  },
];

export const homestays: Homestay[] = [
  {
    id: "hs-1",
    name: "Mountain View Homestay",
    slug: "mountain-view-homestay",
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=800&auto=format&fit=crop",
    location: "Kalimpong",
    pricePerNight: 1800,
    rating: 4.6,
    reviewCount: 45,
    amenities: ["WiFi", "Mountain View", "Home-cooked Meals", "Garden"],
    description: "A cozy homestay with panoramic mountain views and warm hospitality.",
    hostName: "Priya Sharma",
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    featured: true,
  },
  {
    id: "hs-2",
    name: "Riverside Camp Homestay",
    slug: "riverside-camp-homestay",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop",
    location: "Rishikhola",
    pricePerNight: 1200,
    rating: 4.4,
    reviewCount: 32,
    amenities: ["River View", "Camping", "BBQ", "Parking"],
    description: "Experience riverside living with camping facilities and nature walks.",
    hostName: "Bimal Gurung",
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    featured: true,
  },
  {
    id: "hs-3",
    name: "Orange Grove Retreat",
    slug: "orange-grove-retreat",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop",
    location: "Sittong",
    pricePerNight: 1500,
    rating: 4.5,
    reviewCount: 28,
    amenities: ["Orchard View", "Organic Meals", "WiFi", "Fireplace"],
    description: "Stay amidst orange orchards with organic meals and stunning views.",
    hostName: "Sunita Limbu",
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 1,
    featured: true,
  },
];

export const hotels: Hotel[] = [
  {
    id: "ht-1",
    name: "Himalayan Heights Resort",
    slug: "himalayan-heights-resort",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
    location: "Pelling",
    stars: 4,
    pricePerNight: 4500,
    rating: 4.5,
    reviewCount: 210,
    amenities: ["Spa", "Restaurant", "Gym", "Free WiFi", "Parking"],
    description: "Luxury resort with panoramic mountain views and modern amenities.",
    featured: true,
  },
  {
    id: "ht-2",
    name: "Tea Garden Resort",
    slug: "tea-garden-resort",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop",
    location: "Mirik",
    stars: 3,
    pricePerNight: 2800,
    rating: 4.3,
    reviewCount: 145,
    amenities: ["Lake View", "Restaurant", "Free WiFi", "Parking"],
    description: "Boutique resort surrounded by tea gardens with lake views.",
    featured: true,
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "Hidden Gems of North Bengal: A Complete Guide",
    slug: "hidden-gems-north-bengal-guide",
    excerpt: "Discover the lesser-known destinations of North Bengal that offer breathtaking views, rich culture, and authentic experiences.",
    content: "North Bengal is home to some of India's most beautiful yet unexplored destinations...",
    coverImage: "https://images.unsplash.com/photo-1506905925345-596d3c1e03a6?q=80&w=800&auto=format&fit=crop",
    author: { name: "Rahul Sharma", avatar: "" },
    publishedAt: "2024-11-15",
    readTime: "8 min read",
    tags: ["North Bengal", "Hidden Gems", "Travel Guide"],
    category: "Travel Guide",
  },
  {
    id: "blog-2",
    title: "Why Homestays Are Better Than Hotels in the Hills",
    slug: "homestays-vs-hotels-hills",
    excerpt: "Experience authentic mountain life by staying in local homestays rather than commercial hotels.",
    content: "When you stay in a homestay, you're not just booking accommodation...",
    coverImage: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=800&auto=format&fit=crop",
    author: { name: "Priya Das", avatar: "" },
    publishedAt: "2024-12-01",
    readTime: "5 min read",
    tags: ["Homestays", "Local Experience", "Sustainable Travel"],
    category: "Travel Tips",
  },
  {
    id: "blog-3",
    title: "Best Time to Visit Sikkim and North Bengal",
    slug: "best-time-visit-sikkim-north-bengal",
    excerpt: "Plan your trip with our seasonal guide to the Eastern Himalayas.",
    content: "The Eastern Himalayas offer different charms in every season...",
    coverImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop",
    author: { name: "Ankit Roy", avatar: "" },
    publishedAt: "2024-10-20",
    readTime: "6 min read",
    tags: ["Seasonal Guide", "Sikkim", "North Bengal"],
    category: "Seasonal Guide",
  },
];

export const events: Event[] = [
  {
    id: "evt-1",
    name: "Losar Festival",
    description: "Tibetan New Year celebration with prayers, dances, and feasts.",
    date: "February - March",
    location: "Kalimpong, Sikkim",
    image: "https://images.unsplash.com/photo-1506905925345-596d3c1e03a6?q=80&w=800&auto=format&fit=crop",
    type: "festival",
  },
  {
    id: "evt-2",
    name: "Cherry Blossom Festival",
    description: "Witness the stunning cherry blossoms in full bloom.",
    date: "November",
    location: "Sittong, Ahaldhara",
    image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=800&auto=format&fit=crop",
    type: "seasonal",
  },
  {
    id: "evt-3",
    name: "Tea Tourism Festival",
    description: "Celebrate the rich tea heritage of Darjeeling.",
    date: "November",
    location: "Darjeeling, Mirik",
    image: "https://images.unsplash.com/photo-1563911892437-1feda0179e1b?q=80&w=800&auto=format&fit=crop",
    type: "cultural",
  },
];
