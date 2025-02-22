export interface Region {
  id: string;
  name: string;
  coordinates: [number, number];
  deliveryDay: string;
  deliveryInfo: string;
}

export const selangorRegions: Region[] = [
  {
    id: "sabak-bernam",
    name: "Sabak Bernam",
    coordinates: [101.2, 3.8], // Approximate coordinates
    deliveryDay: "Friday",
    deliveryInfo: "We deliver to Sabak Bernam every Friday. Place your order now to receive it this Friday!"
  },
  {
    id: "hulu-selangor",
    name: "Hulu Selangor",
    coordinates: [101.65, 3.7],
    deliveryDay: "Thursday",
    deliveryInfo: "Hulu Selangor deliveries are scheduled for Thursdays. Order now for next delivery!"
  },
  {
    id: "kuala-selangor",
    name: "Kuala Selangor",
    coordinates: [101.35, 3.4],
    deliveryDay: "Wednesday",
    deliveryInfo: "We deliver to Kuala Selangor every Wednesday. Place your order for next week's delivery!"
  },
  {
    id: "gombak",
    name: "Gombak",
    coordinates: [101.7, 3.35],
    deliveryDay: "Tuesday",
    deliveryInfo: "Gombak area deliveries are done every Tuesday. Order now!"
  },
  {
    id: "petaling",
    name: "Petaling",
    coordinates: [101.5, 3.1],
    deliveryDay: "Monday",
    deliveryInfo: "Petaling area receives deliveries every Monday. Place your order now!"
  },
  {
    id: "klang",
    name: "Klang",
    coordinates: [101.45, 3.05],
    deliveryDay: "Wednesday",
    deliveryInfo: "Klang deliveries are scheduled for Wednesdays. Order now for next delivery!"
  },
  {
    id: "kuala-langat",
    name: "Kuala Langat",
    coordinates: [101.5, 2.9],
    deliveryDay: "Thursday",
    deliveryInfo: "We deliver to Kuala Langat every Thursday. Place your order for next week!"
  },
  {
    id: "sepang",
    name: "Sepang",
    coordinates: [101.7, 2.8],
    deliveryDay: "Tuesday",
    deliveryInfo: "Sepang area deliveries happen every Tuesday. Order now!"
  },
  {
    id: "hulu-langat",
    name: "Hulu Langat",
    coordinates: [101.8, 3.1],
    deliveryDay: "Monday",
    deliveryInfo: "Hulu Langat receives deliveries every Monday. Place your order now!"
  }
]; 