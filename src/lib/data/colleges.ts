import annaImg from "@/assets/college-anna.jpg";
import psgImg from "@/assets/college-psg.jpg";
import citImg from "@/assets/college-cit.jpg";
import tceImg from "@/assets/college-tce.jpg";
import srmImg from "@/assets/college-srm.jpg";

export type CollegeType = "Government" | "Private" | "Aided";
export type Course =
  | "CSE" | "IT" | "ECE" | "EEE" | "Mechanical" | "Civil"
  | "Medical" | "Arts" | "Commerce" | "BBA";

export interface College {
  id: string;
  name: string;
  location: string;
  district: string;
  type: CollegeType;
  naac: string;
  image: string;
  courses: Course[];
  cutoff: number;            // typical cutoff (out of 200)
  cutoffTrend: [number, number, number, number]; // last 4 yrs
  fees: number;              // INR per year
  placement: string;
  avgPackage: string;
  hostel: boolean;
}

export const colleges: College[] = [
  {
    id: "ceg-anna",
    name: "College of Engineering, Guindy (Anna University)",
    location: "Chennai",
    district: "Chennai",
    type: "Government",
    naac: "A++",
    image: annaImg,
    courses: ["CSE", "IT", "ECE", "EEE", "Mechanical", "Civil"],
    cutoff: 198.5,
    cutoffTrend: [197.0, 197.5, 198.0, 198.5],
    fees: 55000,
    placement: "98% placement record",
    avgPackage: "₹12.5 LPA",
    hostel: true,
  },
  {
    id: "psg-tech",
    name: "PSG College of Technology",
    location: "Coimbatore",
    district: "Coimbatore",
    type: "Aided",
    naac: "A+",
    image: psgImg,
    courses: ["CSE", "IT", "ECE", "Mechanical", "EEE"],
    cutoff: 194.0,
    cutoffTrend: [192.5, 193.0, 193.5, 194.0],
    fees: 95000,
    placement: "95% placement",
    avgPackage: "₹8.5 LPA",
    hostel: true,
  },
  {
    id: "cit",
    name: "Coimbatore Institute of Technology",
    location: "Coimbatore",
    district: "Coimbatore",
    type: "Aided",
    naac: "A+",
    image: citImg,
    courses: ["CSE", "IT", "ECE", "Mechanical"],
    cutoff: 192.0,
    cutoffTrend: [190.0, 190.5, 191.5, 192.0],
    fees: 90000,
    placement: "92% placement",
    avgPackage: "₹7 LPA",
    hostel: true,
  },
  {
    id: "tce",
    name: "Thiagarajar College of Engineering",
    location: "Madurai",
    district: "Madurai",
    type: "Aided",
    naac: "A",
    image: tceImg,
    courses: ["CSE", "IT", "ECE", "EEE", "Mechanical"],
    cutoff: 188.0,
    cutoffTrend: [186.0, 187.0, 187.5, 188.0],
    fees: 75000,
    placement: "88% placement",
    avgPackage: "₹6 LPA",
    hostel: true,
  },
  {
    id: "srm",
    name: "SRM Institute of Science and Technology",
    location: "Chennai",
    district: "Kancheepuram",
    type: "Private",
    naac: "A++",
    image: srmImg,
    courses: ["CSE", "IT", "ECE", "Mechanical", "BBA", "Arts"],
    cutoff: 175.0,
    cutoffTrend: [170.0, 172.0, 174.0, 175.0],
    fees: 250000,
    placement: "85% placement",
    avgPackage: "₹6.5 LPA",
    hostel: true,
  },
  {
    id: "ssn",
    name: "SSN College of Engineering",
    location: "Chennai",
    district: "Chennai",
    type: "Private",
    naac: "A+",
    image: srmImg,
    courses: ["CSE", "IT", "ECE", "EEE", "Mechanical"],
    cutoff: 190.0,
    cutoffTrend: [188.0, 189.0, 189.5, 190.0],
    fees: 195000,
    placement: "93% placement",
    avgPackage: "₹8 LPA",
    hostel: true,
  },
  {
    id: "mcc",
    name: "Madras Christian College",
    location: "Chennai",
    district: "Chennai",
    type: "Aided",
    naac: "A++",
    image: annaImg,
    courses: ["Arts", "Commerce", "BBA"],
    cutoff: 92,
    cutoffTrend: [90, 91, 91.5, 92],
    fees: 35000,
    placement: "80% placement",
    avgPackage: "₹4.5 LPA",
    hostel: true,
  },
  {
    id: "stella",
    name: "Stella Maris College",
    location: "Chennai",
    district: "Chennai",
    type: "Aided",
    naac: "A+",
    image: annaImg,
    courses: ["Arts", "Commerce", "BBA"],
    cutoff: 88,
    cutoffTrend: [86, 87, 87.5, 88],
    fees: 28000,
    placement: "75% placement",
    avgPackage: "₹4 LPA",
    hostel: true,
  },
  {
    id: "mmc",
    name: "Madras Medical College",
    location: "Chennai",
    district: "Chennai",
    type: "Government",
    naac: "A++",
    image: annaImg,
    courses: ["Medical"],
    cutoff: 670,
    cutoffTrend: [660, 665, 668, 670],
    fees: 18000,
    placement: "Government posting",
    avgPackage: "Govt scale",
    hostel: true,
  },
];

export type Chance = "High" | "Medium" | "Low";

export function calculateChance(studentMarks: number, cutoff: number): Chance {
  const diff = studentMarks - cutoff;
  if (diff >= 0) return "High";
  if (diff >= -8) return "Medium";
  return "Low";
}
