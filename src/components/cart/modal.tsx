"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { createCartAndSetCookie, redirectToCheckout } from "./actions";
import { useCart } from "./cart-context";
import CloseCart from "./close-cart";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import OpenCart from "./open-cart";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { ShoppingBasket, ShoppingCart, ShoppingCartIcon } from "lucide-react";
import { cn, createUrl } from "@/lib/utils";
import Price from "../price";
import { DEFAULT_OPTION } from "@/lib/constants";
import LoadingDots from "../loading-dots";

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartModal() {
  const { cart, updateCartItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  useEffect(() => {
    if (
      cart?.totalQuantity &&
      cart?.totalQuantity !== quantityRef.current &&
      cart?.totalQuantity > 0
    ) {
      if (!isOpen) {
        setIsOpen(true);
      }
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef]);

  return (
    <>
      
      <Sheet>
        <SheetTrigger  className="group -m-2 flex items-center gap-2 p-2">
        <OpenCart quantity={cart?.totalQuantity} />
          <span className="h-6 w-px rounded-full bg-gray-400" />
          <span className="ml-2 mt-2 text-sm font-medium text-gray-400 group-hover:text-gray-800"></span>
          <ShoppingBasket
            aria-hidden="true"
            className="gruop-hover:text-red-500 text-white"
            size={25}
          />
          <svg
            className={cn("w-2 h-2")}
            aria-hidden="true"
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 7.4 20"
            fill="none"
          >
            <path
              fill="currentColor"
              d="M7.4,19.4v-13c0-0.1,0-0.2-0.1-0.3L7.2,6c-0.3-0.1-0.7-0.3-1-0.4C6.1,5.6,6.1,5.5,6,5.5
	c0,0,0-0.1-0.1-0.1c0-0.1,0-0.1-0.1-0.2l0,0c0,0,0,0,0.1-0.1v-2c0,0,0,0-0.1-0.1H5.2l0.1-0.1h2l0,0c0.1-0.1,0.1-0.2,0.1-0.3
	C7,1.9,6.6,1.1,6.1,0.4C6,0.2,5.7,0,5.5,0C5.2,0,0.4,0,0.4,0v1.3h1.1c0,0.1,0,0.1,0,0.1l0.3,0.2C1.6,2,1.4,2.3,1.2,2.6
	C1.1,2.7,1,2.9,0.8,3C0.6,3.2,0.3,3.4,0,3.5c0,0.1,0,0.2,0,0.2s0,0.1,0,0.2c0.5-0.1,0.9-0.4,1.3-0.7C1.4,3.1,1.5,3.1,1.6,3l0.1-0.1
	c0.3-0.3,0.5-0.7,0.7-1l0.8,0.5c0.1,0.1,0.2,0.2,0.2,0.3V3H2.8c0,0-0.1,0-0.1,0.1v2c0,0,0,0,0.1,0.1l0,0c0,0.1,0,0.1,0,0.2
	S2.7,5.5,2.7,5.5H2.6c-0.3,0.1-0.7,0.3-1,0.4C1.4,6,1.4,6.1,1.4,6.3v13c0,0.4,0.3,0.7,0.7,0.7l0,0h4.5C7.1,20.1,7.4,19.8,7.4,19.4"
            ></path>
          </svg>
        </SheetTrigger>
        <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
          <SheetHeader className="space-y-2.5 pr-6">
            <SheetTitle>Cart</SheetTitle>
          </SheetHeader>
          {!cart || cart.lines.length === 0 ? (
            <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
              <ShoppingCartIcon className="h-16" />
              <p className="mt-6 text-center text-2xl font-bold">
                Your cart is empty.
              </p>
            </div>
          ) : (
            <div className="flex h-full flex-col justify-between overflow-hidden p-1">
              <ul className="flex-grow overflow-auto py-4">
                {cart.lines
                  .sort((a, b) =>
                    a.merchandise.product.title.localeCompare(
                      b.merchandise.product.title
                    )
                  )
                  .map((item, i) => {
                    const merchandiseSearchParams =
                      {} as MerchandiseSearchParams;

                    item.merchandise.selectedOptions.forEach(
                      ({ name, value }) => {
                        if (value !== DEFAULT_OPTION) {
                          merchandiseSearchParams[name.toLowerCase()] = value;
                        }
                      }
                    );

                    const merchandiseUrl = createUrl(
                      `/product/${item.merchandise.product.handle}`,
                      new URLSearchParams(merchandiseSearchParams)
                    );

                    return (
                      <li
                        key={i}
                        className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                      >
                        <div className="relative flex w-full flex-row justify-between px-1 py-4">
                          <div className="absolute z-40 -ml-1 -mt-2">
                            <DeleteItemButton
                              item={item}
                              optimisticUpdate={updateCartItem}
                            />
                          </div>
                          <div className="flex flex-row">
                            <div className="relative h-16 w-16 overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                              <Image
                                className="h-full w-full object-cover"
                                width={64}
                                height={64}
                                alt={
                                  item.merchandise.product.featuredImage
                                    .altText || item.merchandise.product.title
                                }
                                src={item.merchandise.product.featuredImage.url}
                              />
                            </div>
                            <Link
                              href={merchandiseUrl}
                              onClick={closeCart}
                              className="z-30 ml-2 flex flex-row space-x-4"
                            >
                              <div className="flex flex-1 flex-col text-base">
                                <span className="leading-tight">
                                  {item.merchandise.product.title}
                                </span>
                                {item.merchandise.title !== DEFAULT_OPTION ? (
                                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                    {item.merchandise.title}
                                  </p>
                                ) : null}
                              </div>
                            </Link>
                          </div>
                          <div className="flex h-16 flex-col justify-between">
                            <Price
                              className="flex justify-end space-y-2 text-right text-sm"
                              amount={item.cost.totalAmount.amount}
                              currencyCode={item.cost.totalAmount.currencyCode}
                            />
                            <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                              <EditItemQuantityButton
                                item={item}
                                type="minus"
                                optimisticUpdate={updateCartItem}
                              />
                              <p className="w-6 text-center">
                                <span className="w-full text-sm">
                                  {item.quantity}
                                </span>
                              </p>
                              <EditItemQuantityButton
                                item={item}
                                type="plus"
                                optimisticUpdate={updateCartItem}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
              <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
                <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
                  <p>Taxes</p>
                  <Price
                    className="text-right text-base text-black dark:text-white"
                    amount={cart.cost.totalTaxAmount.amount}
                    currencyCode={cart.cost.totalTaxAmount.currencyCode}
                  />
                </div>
                <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                  <p>Shipping</p>
                  <p className="text-right">Calculated at checkout</p>
                </div>
                <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                  <p>Total</p>
                  <Price
                    className="text-right text-base text-black dark:text-white"
                    amount={cart.cost.totalAmount.amount}
                    currencyCode={cart.cost.totalAmount.currencyCode}
                  />
                </div>
              </div>
              <form action={redirectToCheckout}>
                <CheckoutButton />
              </form>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}

function CheckoutButton() {
  const { pending } = useFormStatus();

  return (
   
    <button
      className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
      type="submit"
      disabled={pending}
    >
      {pending ? <LoadingDots className="bg-white" /> : 'Proceed to Checkout'}
    </button>
  );
}
