import React from "react";


type props = {
    image: string,
    onClick(): void
};

const ImageGrid: React.FC<props> = (props) => {
    const { image, onClick } = props;
    return (
        <div className="w-full rounded-2xl cursor-pointer" onClick={onClick}>
            <div className="relative py-3 w-full sm:max-w-xl sm:mx-auto h-64" >
                <div className="absolute "></div>
                <div className="relative h-64 w-full bg-white shadow-lg ">
                    <img
                        style={{ 'height': '100%', 'width': '100%', 'objectFit': 'cover' }}
                        className="bg-gray-100"
                        src={image}
                    />
                </div>
            </div>
        </div>
    );
};

export default ImageGrid;
