import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Firebase Config
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "AIzaSyAIWRuRXEdji61pquVFDsAnhX65fc3x8jw",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "mumbai-real-state.firebaseapp.com",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || "mumbai-real-state",
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "mumbai-real-state.firebasestorage.app",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "350351661251",
  appId: process.env.VITE_FIREBASE_APP_ID || "1:350351661251:web:078b93cae48463ad332a76",
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID || "G-BB9NS5DG4N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const mockProperties = [
  {
    title: "Seaside Luxury Penthouse",
    price: "₹4,50,00,000",
    specs: "3 beds | 4 baths | 3,200 sqft",
    address: "Marine Drive, Nariman Point, Mumbai, Maharashtra 400021",
    description: "Panoramic Arabian Sea views with state-of-the-art interior design, private terrace, and 24/7 concierge services.",
    listingType: "Buy",
    view: "Ocean",
    attachedYn: "true",
    seniorCommunity: "No",
    areaNode: "South Mumbai (S-MUM)",
    stories: "2",
    yearBuilt: "2022",
    buildingSize: "3,200 Sq Ft",
    listingStatus: "Active Listing",
    assetClass: "Apartment Suite / Condo",
    landmarks: [
      { name: "Gateway of India", url: "https://maps.google.com" },
      { name: "Taj Mahal Palace", url: "https://maps.google.com" }
    ],
    additionalSpecs: [
      { key: "Car Parking", value: "3 Covered Slots" },
      { key: "Furnishing", value: "Fully Furnished" }
    ],
    imgCounter: "1/2",
    badges: [{ text: "For Sale", bg: "#8b5cf6" }],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
    ],
    agent: {
      name: process.env.VITE_ADMIN_NAME || "MR. Jugal Modi",
      phone: process.env.VITE_ADMIN_CONTACT_NUMBER || "99139010000",
      img: "images/avatar.png"
    },
    createdAt: new Date()
  },
  {
    title: "Greenwood Modern Villa",
    price: "₹8,25,00,000",
    specs: "5 beds | 6 baths | 5,500 sqft | 0.75 acres",
    address: "Pali Hill, Bandra West, Mumbai, Maharashtra 400050",
    description: "Ultra-luxury standalone villa with private swimming pool, landscaped garden, and high-end security systems.",
    listingType: "Buy",
    view: "Garden / Forest",
    attachedYn: "false",
    seniorCommunity: "No",
    areaNode: "Bandra West Node",
    stories: "3",
    yearBuilt: "2023",
    buildingSize: "5,500 Sq Ft",
    listingStatus: "Active Listing",
    assetClass: "Single Family Residence",
    landmarks: [
      { name: "Carter Road Promenade", url: "https://maps.google.com" },
      { name: "Lilavati Hospital", url: "https://maps.google.com" }
    ],
    additionalSpecs: [
      { key: "Private Pool", value: "Yes (Heated)" },
      { key: "Security", value: "Biometric & 24/7 CCTV" }
    ],
    imgCounter: "1/2",
    badges: [{ text: "Featured", bg: "#10b981" }],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    agent: {
      name: process.env.VITE_ADMIN_NAME || "MR. Jugal Modi",
      phone: process.env.VITE_ADMIN_CONTACT_NUMBER || "99139010000",
      img: "images/avatar.png"
    },
    createdAt: new Date()
  },
  {
    title: "Skyline Business Tower Hub",
    price: "₹12,00,00,000",
    specs: "0 beds | 4 baths | 8,000 sqft",
    address: "BKC Complex, Bandra East, Mumbai, Maharashtra 400051",
    description: "Premium commercial office space equipped with modern conference rooms, high-speed elevators, and EV charging stations.",
    listingType: "Buy",
    view: "City Skyline",
    attachedYn: "true",
    seniorCommunity: "No",
    areaNode: "BKC Business Hub",
    stories: "1",
    yearBuilt: "2021",
    buildingSize: "8,000 Sq Ft",
    listingStatus: "Active Listing",
    assetClass: "Commercial Complex",
    landmarks: [
      { name: "Jio World Drive", url: "https://maps.google.com" },
      { name: "US Consulate", url: "https://maps.google.com" }
    ],
    additionalSpecs: [
      { key: "Power Backup", value: "100% Generator Backup" },
      { key: "Floor Level", value: "14th Floor" }
    ],
    imgCounter: "1/2",
    badges: [{ text: "Commercial", bg: "#06b6d4" }],
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
    ],
    agent: {
      name: process.env.VITE_ADMIN_NAME || "MR. Jugal Modi",
      phone: process.env.VITE_ADMIN_CONTACT_NUMBER || "99139010000",
      img: "images/avatar.png"
    },
    createdAt: new Date()
  }
];

async function seedData() {
  console.log("🚀 Connecting to Firebase Firestore...");
  try {
    for (const prop of mockProperties) {
      const docRef = await addDoc(collection(db, "properties"), prop);
      console.log(`✅ Added: ${prop.title} (ID: ${docRef.id})`);
    }
    console.log("\n🎉 Done! 3 Mock properties uploaded successfully.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error uploading data:", err);
    process.exit(1);
  }
}

seedData();