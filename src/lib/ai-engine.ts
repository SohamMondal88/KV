import { Destination, Homestay, Hotel } from "./types";

export interface PlannerInputs {
  budget: number;
  people: number;
  days: number;
  travelDates: string;
  hasKids: boolean;
  hasPets: boolean;
  travelStyle: "Budget Backpacker" | "Mid-Range Explorer" | "Luxury Seeker";
  vehiclePreference: "Public Transport" | "Private Taxi" | "Self-Drive" | "Bike";
  weatherPreference: "Cold/Snow" | "Pleasant/Mild" | "Warm" | "Any";
  foodPreferences: string[];
  adventureLevel: "Relaxed" | "Moderate" | "High";
  mustHaves: string[];
}

export interface MatchResult {
  destination: Destination;
  score: number;
  whyMatch: string[];
  estimatedCostPerPerson: number;
  estimatedTotalCost: number;
}

export interface GeneratedItineraryDay {
  day: number;
  title: string;
  morning: string[];
  afternoon: string[];
  evening: string[];
  meals: string[];
  accommodation: string;
  transport: string;
  dailyBudget: number;
}

export interface GeneratedItinerary {
  destination: Destination;
  days: GeneratedItineraryDay[];
  accommodation: (Homestay | Hotel)[];
  transport: {
    howToReach: string;
    localTransport: string;
    estimatedCost: number;
  };
  food: {
    localDishes: string[];
    restaurants: string[];
    cafes: string[];
  };
  packingList: string[];
  budgetBreakdown: {
    transport: number;
    accommodation: number;
    food: number;
    activities: number;
    miscellaneous: number;
    total: number;
  };
}

function parseBudgetValue(str: string): number {
  const cleaned = str.replace(/[^0-9]/g, "");
  return cleaned ? parseInt(cleaned, 10) : 0;
}

function getDailyBudgetForStyle(destination: Destination, style: string): number {
  const bp = destination.budgetPlanner;
  if (style === "Budget Backpacker") return parseBudgetValue(bp.backpacker);
  if (style === "Mid-Range Explorer") return parseBudgetValue(bp.midRange);
  if (style === "Luxury Seeker") return parseBudgetValue(bp.luxury);
  return parseBudgetValue(bp.midRange);
}

function getAdventureScore(destination: Destination, level: string): number {
  const activities = destination.adventureActivities;
  const easyCount = activities.filter((a) => a.difficulty === "Easy").length;
  const moderateCount = activities.filter((a) => a.difficulty === "Moderate").length;
  const hardCount = activities.filter((a) => a.difficulty === "Hard").length;

  if (level === "Relaxed") {
    if (easyCount >= 2) return 90;
    if (easyCount >= 1) return 70;
    return 40;
  }
  if (level === "Moderate") {
    if (moderateCount >= 1) return 90;
    if (easyCount >= 2) return 70;
    return 50;
  }
  if (level === "High") {
    if (hardCount >= 1 || moderateCount >= 2) return 90;
    if (moderateCount >= 1) return 70;
    return 40;
  }
  return 50;
}

function getWeatherScore(destination: Destination, preference: string, dates: string): number {
  if (preference === "Any") return 100;

  const months = destination.bestTimeMonths.map((m) => m.toLowerCase().trim());

  const coldMonths = ["dec", "jan", "feb"];
  const pleasantMonths = ["oct", "nov", "mar", "apr", "may"];
  const warmMonths = ["jun", "jul", "aug", "sep"];

  let targetMonths: string[] = [];
  if (preference === "Cold/Snow") targetMonths = coldMonths;
  if (preference === "Pleasant/Mild") targetMonths = pleasantMonths;
  if (preference === "Warm") targetMonths = warmMonths;

  const overlap = months.filter((m) => targetMonths.includes(m)).length;
  if (overlap >= 3) return 95;
  if (overlap >= 1) return 70;
  return 40;
}

function getTagMatchScore(destination: Destination, mustHaves: string[]): number {
  if (mustHaves.length === 0) return 50;

  const tagMap: Record<string, string[]> = {
    Mountains: ["mountains", "nature", "trekking", "hills"],
    Culture: ["culture", "heritage", "religious", "monastery"],
    Food: ["food", "local", "cuisine", "organic"],
    Photography: ["photography", "viewpoint", "sunrise", "panoramic", "sunset"],
    Wildlife: ["wildlife", "nature", "birds", "forest"],
    Rivers: ["rivers", "camping", "nature", "waterfall"],
    Camping: ["camping", "nature", "rivers", "adventure"],
  };

  let matches = 0;
  let totalChecks = 0;

  for (const must of mustHaves) {
    const mapped = tagMap[must] || [must.toLowerCase()];
    totalChecks++;
    const destTags = destination.tags.map((t) => t.toLowerCase());
    if (mapped.some((m) => destTags.includes(m))) {
      matches++;
    }
  }

  if (totalChecks === 0) return 50;
  return Math.round((matches / totalChecks) * 100);
}

function getGroupFitScore(destination: Destination, inputs: PlannerInputs): number {
  let score = 0;
  let checks = 0;

  if (inputs.hasKids) {
    checks++;
    if (destination.familyFriendly) score += 100;
    else score += 30;
  }

  if (inputs.hasPets) {
    checks++;
    if (destination.petFriendly) score += 100;
    else score += 10;
  }

  if (inputs.people === 1) {
    checks++;
    if (destination.soloFriendly) score += 100;
    else score += 50;
  } else if (inputs.people === 2) {
    checks++;
    if (destination.coupleFriendly) score += 100;
    else score += 50;
  } else {
    checks++;
    if (destination.familyFriendly) score += 100;
    else score += 50;
  }

  if (checks === 0) return 80;
  return Math.round(score / checks);
}

export function calculateMatchScore(destination: Destination, inputs: PlannerInputs): MatchResult {
  const dailyBudgetPerPerson = inputs.budget / inputs.people / inputs.days;
  const destDailyBudget = getDailyBudgetForStyle(destination, inputs.travelStyle);

  let budgetScore = 0;
  if (destDailyBudget > 0) {
    const ratio = dailyBudgetPerPerson / destDailyBudget;
    if (ratio >= 0.8 && ratio <= 1.5) budgetScore = 95;
    else if (ratio >= 0.5 && ratio <= 2) budgetScore = 80;
    else if (ratio >= 0.3 && ratio <= 3) budgetScore = 60;
    else if (ratio > 3) budgetScore = 70; // generous budget
    else budgetScore = 30;
  } else {
    budgetScore = 60;
  }

  const adventureScore = getAdventureScore(destination, inputs.adventureLevel);
  const weatherScore = getWeatherScore(destination, inputs.weatherPreference, inputs.travelDates);
  const tagScore = getTagMatchScore(destination, inputs.mustHaves);
  const groupScore = getGroupFitScore(destination, inputs);

  const finalScore = Math.round(
    budgetScore * 0.25 +
      tagScore * 0.25 +
      adventureScore * 0.2 +
      weatherScore * 0.15 +
      groupScore * 0.15
  );

  const whyMatch: string[] = [];
  if (budgetScore >= 80) whyMatch.push("Fits your budget perfectly");
  else if (budgetScore >= 50) whyMatch.push("Within a reasonable budget range");

  if (tagScore >= 70) whyMatch.push(`Matches your interests: ${inputs.mustHaves.slice(0, 3).join(", ")}`);

  if (adventureScore >= 80) whyMatch.push(`Great for ${inputs.adventureLevel.toLowerCase()} adventures`);

  if (weatherScore >= 80) whyMatch.push(`Ideal weather for your preference`);

  if (groupScore >= 80) {
    if (inputs.hasKids) whyMatch.push("Family-friendly destination");
    else if (inputs.people === 2) whyMatch.push("Perfect for couples");
    else if (inputs.people === 1) whyMatch.push("Safe and welcoming for solo travelers");
    else whyMatch.push("Great for groups");
  }

  if (whyMatch.length === 0) {
    whyMatch.push("A beautiful hidden gem to explore");
  }

  const estimatedCostPerPerson = destDailyBudget * inputs.days;
  const estimatedTotalCost = estimatedCostPerPerson * inputs.people;

  return {
    destination,
    score: Math.min(100, Math.max(0, finalScore)),
    whyMatch,
    estimatedCostPerPerson,
    estimatedTotalCost,
  };
}

export function getTopMatches(destinations: Destination[], inputs: PlannerInputs, count = 3): MatchResult[] {
  const scored = destinations.map((d) => calculateMatchScore(d, inputs));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, count);
}

export function generateItinerary(destination: Destination, inputs: PlannerInputs, homestays: Homestay[], hotels: Hotel[]): GeneratedItinerary {
  const days = inputs.days;

  // Find closest itinerary
  let baseItinerary = destination.suggestedItineraries.find((i) => i.days === days);
  if (!baseItinerary) {
    const sorted = [...destination.suggestedItineraries].sort((a, b) => Math.abs(a.days - days) - Math.abs(b.days - days));
    baseItinerary = sorted[0];
  }

  const generatedDays: GeneratedItineraryDay[] = [];

  for (let d = 1; d <= days; d++) {
    const baseDay = baseItinerary?.daysPlan[(d - 1) % (baseItinerary.daysPlan.length || 1)];
    const activities = baseDay?.activities || ["Explore local area", "Visit nearby attractions"];

    const morning = activities.slice(0, Math.ceil(activities.length / 3));
    const afternoon = activities.slice(Math.ceil(activities.length / 3), Math.ceil((activities.length * 2) / 3));
    const evening = activities.slice(Math.ceil((activities.length * 2) / 3));

    if (evening.length === 0 && afternoon.length > 0) {
      evening.push(afternoon.pop()!);
    }
    if (afternoon.length === 0 && morning.length > 1) {
      afternoon.push(morning.pop()!);
    }
    if (evening.length === 0) {
      evening.push("Relax at your stay", "Enjoy a local dinner");
    }

    const meals = baseDay?.meals || ["Breakfast", "Lunch", "Dinner"];
    const dailyBudget = parseBudgetValue(baseDay?.budget || destination.budgetPlanner.midRange);

    generatedDays.push({
      day: d,
      title: baseDay?.title || `Day ${d} in ${destination.name}`,
      morning: morning.length ? morning : ["Breakfast & local exploration"],
      afternoon: afternoon.length ? afternoon : ["Sightseeing"],
      evening: evening.length ? evening : ["Dinner & relaxation"],
      meals,
      accommodation: baseDay?.accommodation || (inputs.travelStyle === "Luxury Seeker" ? "Hotel" : "Homestay"),
      transport: baseDay?.transport || "Local taxi",
      dailyBudget,
    });
  }

  // Accommodation
  const matchedStays: (Homestay | Hotel)[] = [];
  const destName = destination.name.toLowerCase();
  const stateName = destination.state.toLowerCase();

  const localHomestays = homestays.filter((h) => h.location.toLowerCase().includes(destName) || destName.includes(h.location.toLowerCase()));
  const localHotels = hotels.filter((h) => h.location.toLowerCase().includes(destName) || destName.includes(h.location.toLowerCase()));

  if (inputs.travelStyle === "Luxury Seeker") {
    matchedStays.push(...localHotels.sort((a, b) => b.pricePerNight - a.pricePerNight).slice(0, 2));
    if (matchedStays.length < 2) matchedStays.push(...localHomestays.sort((a, b) => b.pricePerNight - a.pricePerNight).slice(0, 2 - matchedStays.length));
  } else if (inputs.travelStyle === "Mid-Range Explorer") {
    matchedStays.push(...localHomestays.slice(0, 1));
    matchedStays.push(...localHotels.slice(0, 1));
  } else {
    matchedStays.push(...localHomestays.sort((a, b) => a.pricePerNight - b.pricePerNight).slice(0, 2));
    if (matchedStays.length < 2) matchedStays.push(...localHotels.sort((a, b) => a.pricePerNight - b.pricePerNight).slice(0, 2 - matchedStays.length));
  }

  if (matchedStays.length === 0) {
    // fallback: any stay
    if (inputs.travelStyle === "Luxury Seeker") {
      matchedStays.push(...hotels.slice(0, 2));
    } else {
      matchedStays.push(...homestays.slice(0, 1));
      matchedStays.push(...hotels.slice(0, 1));
    }
  }

  // Transport
  const howToReach = destination.transportation.howToReach.find((t) => {
    if (inputs.vehiclePreference === "Public Transport") return t.mode === "bus" || t.mode === "train";
    if (inputs.vehiclePreference === "Private Taxi") return t.mode === "car";
    if (inputs.vehiclePreference === "Self-Drive") return t.mode === "car";
    if (inputs.vehiclePreference === "Bike") return t.mode === "bike" || t.mode === "car";
    return false;
  }) || destination.transportation.howToReach[0];

  const transportCost = parseBudgetValue(howToReach.cost) * inputs.people;
  const localTransport = destination.transportation.taxiFare || "Local taxis available";

  // Food
  const localDishes = destination.localFood.slice(0, 5);
  const restaurants = destination.restaurants.slice(0, 3).map((r) => r.name);
  const cafes = destination.cafes.slice(0, 2).map((c) => c.name);

  // Packing list
  const packingList = destination.packingList.slice(0, 6);

  // Budget breakdown
  const nights = Math.max(1, inputs.days - 1);
  const avgStayCost = matchedStays.length > 0 ? matchedStays.reduce((sum, s) => sum + ("pricePerNight" in s ? s.pricePerNight : 0), 0) / matchedStays.length : 1500;
  const accommodationCost = Math.round(avgStayCost * nights * Math.ceil(inputs.people / 2));

  const foodPerPersonPerDay = inputs.travelStyle === "Luxury Seeker" ? 1500 : inputs.travelStyle === "Mid-Range Explorer" ? 800 : 400;
  const foodCost = foodPerPersonPerDay * inputs.people * inputs.days;

  const activitiesCost = generatedDays.reduce((sum, d) => sum + d.dailyBudget, 0) * inputs.people;
  const miscCost = Math.round(inputs.budget * 0.1);

  const totalCost = transportCost + accommodationCost + foodCost + activitiesCost + miscCost;

  return {
    destination,
    days: generatedDays,
    accommodation: matchedStays,
    transport: {
      howToReach: `${howToReach.mode === "flight" ? "Fly" : howToReach.mode === "train" ? "Train" : howToReach.mode === "bus" ? "Bus" : "Car"} — ${howToReach.description} (${howToReach.duration})`,
      localTransport,
      estimatedCost: transportCost,
    },
    food: { localDishes, restaurants, cafes },
    packingList,
    budgetBreakdown: {
      transport: transportCost,
      accommodation: accommodationCost,
      food: foodCost,
      activities: activitiesCost,
      miscellaneous: miscCost,
      total: totalCost,
    },
  };
}
