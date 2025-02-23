import * as HoverCard from "@radix-ui/react-hover-card";
import { type Region } from "./locationData";

interface DeliveryInfoProps {
  region: Region;
  children: React.ReactNode;
}

export function DeliveryInfo({ region, children }: DeliveryInfoProps) {
  return (
    <HoverCard.Root openDelay={0} closeDelay={0}>
      <HoverCard.Trigger asChild>{children}</HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className="z-50 w-[300px] rounded-md bg-white p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:animate-slideUpAndFade"
          sideOffset={5}
          align="center"
        >
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">{region.name}</h3>
            <div className="text-sm">
              <p className="font-medium">Delivery Schedule</p>
              <p className="mt-1 text-gray-600">{region.deliveryInfo}</p>
            </div>
          </div>
          <HoverCard.Arrow className="fill-white" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
