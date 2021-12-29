import React from "react";


type props = {
    image: string,
    onClick(): void,
    isActive: boolean,
};

const ImageGrid: React.FC<props> = (props) => {
    const { image, onClick, isActive } = props;
    return (
        <div>

            <div className="w-full rounded-2xl cursor-pointer" onClick={onClick}>
                <div className="relative py-3 w-full sm:max-w-xl sm:mx-auto h-64" >
                    <div className="absolute "></div>
                    <div className="relative h-64 w-full bg-white shadow-lg ">
                        <div className="px-2 py-1 bg-gray-200 text-gray-600 rounded uppercase text-xs tracking-wide font-semibold">
                            {!isActive ? "Voting Complete!" : "Voting In Progress!"}
                            <span className="text-gray-900 font-light"></span>
                        </div>
                        <img
                            style={{ 'height': '100%', 'width': '100%', 'objectFit': 'cover' }}
                            className="bg-gray-100"
                            src={image}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ImageGrid;
