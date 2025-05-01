"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Chip,
  Image,
  Link,
  RadioGroup,
  ScrollShadow,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { cn } from "@heroui/react";
import ColorRadioItem from "./color-radio-item";
import RatingRadioGroup from "./rating-radio-group";
import TagGroupRadioItem from "./tag-group-radio-item";
import CountdownTimer from "@/components/ui/countdown-timer";

export type ProductViewItemColor = {
  name: string;
  hex: string;
};

export type ProductViewItem = {
  id: string;
  name: string;
  description?: string;
  images: string[];
  price: number;
  rating?: number;
  ratingCount?: number;
  ticketOptions?: string[];
  countdownEndDate?: string;
  details?: {
    title: string;
    items: string[];
  }[];
  availableColors?: ProductViewItemColor[];
};

export type ProductViewInfoProps = Omit<React.HTMLAttributes<HTMLDivElement>, "id"> & {
  countdownEndDate?: string;
  isLoading?: boolean;
  removeWrapper?: boolean;
} & ProductViewItem;

const ProductViewInfo = React.forwardRef<HTMLDivElement, ProductViewInfoProps>(
  (
    {
      id,
      name,
      description,
      images,
      price,
      rating,
      ratingCount,
      ticketOptions,
      countdownEndDate,
      details,
      availableColors,
      isLoading,
      removeWrapper,
      className,
      ...props
    },
    ref,
  ) => {
    const [isStarred, setIsStarred] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState(images[0]);
    const [selectedTicketOption, setSelectedTicketOption] = React.useState<string>(ticketOptions?.[0] || "");

    const calculatePrice = (ticketOptionString: string): number => {
      const quantity = parseInt(ticketOptionString.split(" ")[0] || '0', 10);
      if (quantity === 1) {
        return 10;
      } else if (quantity === 2) {
        return 18; // 9€ each
      } else if (quantity === 3) {
        return 25; // ~8.33€ each
      }
      return 0; // Default or error case
    };

    const currentPrice = calculatePrice(selectedTicketOption);
    const buttonText = `${selectedTicketOption} por ${currentPrice}€`;

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8",
          className,
        )}
        {...props}
      >
        {/* Product Gallery */}
        <div className="relative h-full w-full flex-none">
          {countdownEndDate && (
            <Chip
              className="absolute left-3 top-3 z-20 h-10 gap-1 bg-background/60 pl-3 pr-2 text-foreground/90 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
              size="lg"
              startContent={<Icon icon="solar:clock-circle-bold" width={20} />}
            >
              <CountdownTimer endDate={countdownEndDate} />
            </Chip>
          )}
          {/* Main Image */}
          <Image 
            alt={name} 
            className="h-[528px] w-[528px] object-cover" 
            radius="lg" 
            src={selectedImage} 
          />
          {/* Image Gallery */}
          <ScrollShadow
            className="-mx-2 -mb-4 mt-4 flex w-full max-w-full gap-4 px-2 pb-4 pt-2"
            orientation="horizontal"
          >
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                className="relative h-24 w-24 flex-none cursor-pointer items-center justify-center rounded-medium ring-offset-background transition-shadow data-[selected=true]:outline-none data-[selected=true]:ring-2 data-[selected=true]:ring-primary data-[selected=true]:ring-offset-2"
                data-selected={image === selectedImage}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  removeWrapper
                  alt={name}
                  classNames={{
                    img: "h-24 w-24 object-cover",
                  }}
                  radius="lg"
                  src={image}
                />
              </button>
            ))}
          </ScrollShadow>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-tight">{name}</h1>
          <h2 className="sr-only">Product information</h2>
          <div className="mt-4">
            <p className="sr-only">Product description</p>
            <p className="line-clamp-3 text-medium text-default-500">{description}</p>
          </div>

          {/* Add House Details Section */}
          <div className="mt-6 flex flex-wrap gap-2">
             <Chip
                size="sm"
                variant="flat"
                startContent={<Icon icon="solar:bed-linear" width={16} />}
             >
                T2
             </Chip>
             <Chip
                size="sm"
                variant="flat"
                startContent={<Icon icon="solar:ruler-linear" width={16} />}
             >
                95 m²
             </Chip>
             <Chip
                size="sm"
                variant="flat"
                startContent={<Icon icon="solar:gallery-minimalistic-linear" width={16} />}
             >
                Terraço
             </Chip>
             <Chip
                size="sm"
                variant="flat"
                startContent={<Icon icon="solar:eye-linear" width={16} />}
             >
                Vista Mar
             </Chip>
             <Chip
                size="sm"
                variant="flat"
                startContent={<Icon icon="solar:garage-linear" width={16} />}
             >
                Garagem
             </Chip>
             <Chip
                size="sm"
                variant="flat"
                startContent={<Icon icon="solar:map-point-linear" width={16} />}
             >
                Lagos
             </Chip>
          </div>

          {/* Divider */}
          <div className="my-4 border-t border-default-200"></div>

          {/* Ticket Quantity Selector / Info Section */}
          <div className="flex flex-col gap-1">
            <RadioGroup
              aria-label="Selecionar quantidade de bilhetes"
              className="gap-1"
              value={selectedTicketOption}
              onValueChange={setSelectedTicketOption}
              orientation="horizontal"
            >
              {ticketOptions?.map((option) => {
                const quantity = parseInt(option.split(" ")[0] || '0', 10);
                return (
                  <TagGroupRadioItem
                    key={option}
                    size="lg"
                    value={option}
                    isPromo={quantity > 1}
                  >
                    {option}
                  </TagGroupRadioItem>
                );
              })}
            </RadioGroup>
          </div>
          <Accordion
            className="-mx-1 mt-2"
            itemClasses={{
              title: "text-default-400",
              content: "pt-0 pb-6 text-base text-default-500",
            }}
            items={details}
            selectionMode="multiple"
          >
            {details
              ? details.map(({title, items}) => (
                  <AccordionItem key={title} title={title}>
                    <ul className="list-inside list-disc">
                      {items.map((item) => (
                        <li key={item} className="text-default-500">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </AccordionItem>
                ))
              : []}
          </Accordion>
          <div className="mt-2 flex gap-2">
            <Button
              fullWidth
              className="text-medium font-medium"
              color="primary"
              size="lg"
              startContent={<Icon icon="solar:cart-large-2-bold" width={24} />}
            >
              {buttonText}
            </Button>
            <Button
              isIconOnly
              className="text-default-600"
              size="lg"
              variant="flat"
              onPress={() => setIsStarred(!isStarred)}
            >
              {isStarred ? (
                <Icon icon="solar:heart-bold" width={24} />
              ) : (
                <Icon icon="solar:heart-linear" width={24} />
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  },
);

ProductViewInfo.displayName = "ProductViewInfo";

export default ProductViewInfo; 