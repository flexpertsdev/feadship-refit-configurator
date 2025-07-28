// ==================================================
// AI EXPLANATION: activitiesData.ts
// ==================================================
// WHAT: Static data file containing 17 yacht activities with IDs, names, and image paths (yoga, diving, cinema, etc.) for activity selection
// WHY: Without this, activity selection grid has no data - provides all available activities users can choose for their yacht experience
// USED BY: ActivityGridView, Operations3Page, ActivitiesSection, activity selection components in operations flow
// CRITICAL: NO - Static activity data, can add/remove activities without breaking functionality
// ==================================================


export interface Activity {
  id: string;
  name: string;
  image: string;
}

// Activities data with high-quality images
export const ACTIVITIES: Activity[] = [
  { id: 'yoga', name: 'Yoga', image: '/assets/step6/activities/yoga.jpg' },
  { id: 'sauna', name: 'Sauna', image: '/assets/step6/activities/sauna.jpg' },
  { id: 'jacuzzi', name: 'Jacuzzi', image: '/assets/step6/activities/jacuzzi.jpg' },
  { id: 'massage', name: 'Massage', image: '/assets/step6/activities/massage.jpg' },
  { id: 'gym', name: 'Gym', image: '/assets/step6/activities/gym.jpg' },
  { id: 'foiling', name: 'Foiling', image: '/assets/step6/activities/folling.jpg' },
  { id: 'water-toys', name: 'Water toys', image: '/assets/step6/activities/water-toys.jpg' },
  { id: 'jet-skis', name: 'Jet ski\'s', image: '/assets/step6/activities/jet-skis.jpg' },
  { id: 'swimming', name: 'Swimming', image: '/assets/step6/activities/swimming.jpg' },
  { id: 'diving', name: 'Diving', image: '/assets/step6/activities/diving.jpg' },
  { id: 'wildlife', name: 'Wildlife Spotting', image: '/assets/step6/activities/wildlife-spotting.jpg' },
  { id: 'remote', name: 'Remote places', image: '/assets/step6/activities/remote-places.jpg' },
  { id: 'dining', name: 'Michelin dining', image: '/assets/step6/activities/in-out-dining.jpg' },
  { id: 'cooking', name: 'Family cooking', image: '/assets/step6/activities/family-cooking.jpg' },
  { id: 'wine', name: 'Wine tasting', image: '/assets/step6/activities/wine-tasrting.jpg' },
  { id: 'karaoke', name: 'Karaoke night', image: '/assets/step6/activities/karaoke-night.jpg' },
  { id: 'cinema', name: 'Cinema', image: '/assets/step6/activities/cinema.jpg' }
];
