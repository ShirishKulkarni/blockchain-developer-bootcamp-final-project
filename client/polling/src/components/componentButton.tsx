import React from "react";

type props = {
    text: string;
    onClick(e: any): void;
    red?: boolean;
    header?: boolean;
    modal?: boolean;
    padding?: boolean;
    alert?: boolean;
    green?: boolean;
    auction?: boolean;
};

const Button: React.FC<props> = (props) => {
    const {
        text,
        red = false,
        modal = false,
        onClick,
        padding = false,
        alert = false,
        header = false,
        green = false,
        auction = false
    } = props;
    const colours = red
        ? "text-red-900 bg-white"
        : alert
        ? "text-white bg-red-600"
        : green
        ? "text-white bg-green-600"
        : auction
        ? "text-white bg-red-600"
        : "text-white bg-red-600";

    return (
        <button
            className={`font-medium  text-sm lg:text-base rounded-button shadow-button cursor-pointer ${colours} ${
                modal ? "w-full lg:text-base" : "px-3 lg:px-6" 
            } 
            ${padding ? "mb-10" : ""}
            ${header ? "py-1" : "py-3"}
            `}
            {...{ onClick }}
        >
            {text}
        </button>
    );
};

export default Button;
