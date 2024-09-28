import React from 'react';

const MenuGallery = ({ images }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-4">
            {images.map((image, index) => (
                <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
                    <img
                        src={image}
                        alt={`Menu item ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                </div>
            ))}
        </div>
    );
};

export default MenuGallery;