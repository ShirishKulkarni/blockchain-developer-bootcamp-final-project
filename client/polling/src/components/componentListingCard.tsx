import React from "react";

/*
ListingCard Component

This component creates the listing card used on the listings page.
*/

type props = {
    id: string;
    name: string;
    price: string | number;
    rooms: string | number;
    bathrooms: string | number;
    image: string;
    renter: string | undefined;
    rented_till: string;
    accumulated_rent: string;
    rented: boolean;
    user_is_host: boolean;
    royalty_type: string;
    onClick(): void;
};

const ListingCard: React.FC<props> = (props) => {
    const { name, price, rooms, bathrooms, image, rented, onClick, royalty_type } = props;
    return (
        <div className="w-full cursor-pointer" onClick={onClick}>
            <div
                className="w-full h-64 mb-2 bg-red-100 flex justify-end items-start p-2"
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                }}
            >
            </div>
            <p className="text-red-600 font-bolder">
                {price} ETH
                <span className="text-red-600 font-light"></span>
            </p>
        </div>
    );
};

export default ListingCard;
