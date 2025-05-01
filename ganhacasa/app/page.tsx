"use client";

import type { ProductViewItem } from "@/components/product/product-view-item";
import React from "react";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import ProductViewInfo from "@/components/product/product-view-item";

// Product data - NOTE: countdownEndDate will be overridden below
const itemData: Omit<ProductViewItem, 'countdownEndDate'> = {
  id: "942837-003",
  name: "Todos os domingos, às 20h, sorteamos uma casa. Participa e torna-o realidade!",
  description:
    "Ganhe um apartamento T2 de 95 m² em Lagos, Algarve, com terraço panorâmico e vista para o mar, garagem incluída e a 5 min a pé de restaurantes e da Praia Dona Ana!",
  images: [
    "https://i.ibb.co/q3NHqTMN/ISM34670.jpg",
    "https://i.ibb.co/bRFSDVJt/ISM34610.jpg",
    "https://i.ibb.co/PvF47Cqs/ISM34485.jpg",
    "https://i.ibb.co/F44BL8s2/ISM39085.jpg",
    "https://i.ibb.co/G3FppV65/ISM39075.jpg",
    "https://i.ibb.co/dJG03b7y/A739364-E.jpg"
  ],
  price: 80.97,
  rating: 4.8,
  ratingCount: 669,
  ticketOptions: ["1 Bilhete", "2 Bilhetes", "3 Bilhetes"],
  // countdownEndDate will be calculated dynamically
  availableColors: [
    { name: "Gray", hex: "#808080" },
    { name: "White", hex: "#ffffff" },
    { name: "Black", hex: "#222222" },
  ],
  details: [
    {
      title: "Como Funciona o Sorteio",
      items: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      ],
    },
    {
      title: "Regras e Regulamento",
      items: [
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
        "Nisi ut aliquip ex ea commodo consequat.",
      ],
    },
    {
      title: "Segurança e Privacidade",
      items: [
        "Duis aute irure dolor in reprehenderit in voluptate velit.",
        "Esse cillum dolore eu fugiat nulla pariatur.",
      ],
    },
  ],
};

// Function to calculate the next Sunday 8 PM in Lisbon
const getNextDrawIsoString = (): string => {
  const now = new Date();
  const targetHour = 20; // 8 PM
  const targetDayOfWeek = 0; // 0 for Sunday

  // Get current date details in Lisbon time zone
  const nowLisbonStr = now.toLocaleString('en-US', { timeZone: 'Europe/Lisbon' });
  const nowLisbon = new Date(nowLisbonStr);
  const currentDayOfWeekLisbon = nowLisbon.getDay(); // 0 = Sunday, 6 = Saturday
  const currentHourLisbon = nowLisbon.getHours();

  // Calculate days until the next target day (Sunday)
  let daysToAdd = (targetDayOfWeek - currentDayOfWeekLisbon + 7) % 7;

  // If today IS the target day (Sunday)
  if (daysToAdd === 0) {
    // And if the current time is already past the target hour
    if (currentHourLisbon >= targetHour) {
      // Then aim for next week's target day
      daysToAdd = 7;
    }
    // Otherwise (it's Sunday before 8 PM), daysToAdd remains 0, targeting today.
  }

  // Create the target date object based on Lisbon time
  const targetDate = new Date(nowLisbonStr);
  targetDate.setDate(targetDate.getDate() + daysToAdd);
  targetDate.setHours(targetHour, 0, 0, 0); // Set to 8 PM

  // Return the date in ISO 8601 format (UTC)
  return targetDate.toISOString();
};

export default function Page() {
  // Calculate the dynamic end date string
  const dynamicEndDate = getNextDrawIsoString();

  // Combine static data with dynamic date
  const item: ProductViewItem = {
    ...itemData,
    countdownEndDate: dynamicEndDate,
  };

  return (
    <div className="max-w-8xl h-full w-full px-2 lg:px-24">
      {/* <nav className="my-4 py-2">
        <Breadcrumbs>
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Shoes Category</BreadcrumbItem>
          <BreadcrumbItem>Training Shoes</BreadcrumbItem>
        </Breadcrumbs>
      </nav> */}
      <ProductViewInfo {...item} />
    </div>
  );
}
