// src/components/products/ImageGallery.jsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, X, Image as ImageIcon } from 'lucide-react';

const ImageGallery = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-[400px] flex items-center justify-center border border-[#D1D5DB]">
        <div className="text-center">
          <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No images available</p>
          <p className="text-sm text-gray-500 mt-2">This tool doesn't have images yet</p>
        </div>
      </div>
    );
  }

  const selectedImage = images[selectedIndex];

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isFullscreen) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, selectedIndex]);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative rounded-xl overflow-hidden bg-white border border-[#D1D5DB] group">
        <img
          src={selectedImage.image}
          alt={`Tool image ${selectedIndex + 1}`}
          className="w-full h-[400px] object-cover cursor-zoom-in hover:scale-105 transition-transform duration-500"
          onClick={() => setIsFullscreen(true)}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23F3F4F6'/%3E%3Ctext x='50' y='60' text-anchor='middle' font-size='12' fill='%239CA3AF'%3ETool%3C/text%3E%3C/svg%3E";
          }}
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-[#111827] hover:bg-white hover:shadow-lg transition-all border border-[#D1D5DB]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-[#111827] hover:bg-white hover:shadow-lg transition-all border border-[#D1D5DB]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
        
        {/* Zoom Button */}
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute top-4 right-4 h-10 w-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-[#111827] hover:bg-white hover:shadow-lg transition-all border border-[#D1D5DB] group-hover:opacity-100 opacity-0"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        
        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#111827]/80 text-white px-3 py-1 rounded-lg text-sm font-medium">
            {selectedIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                idx === selectedIndex
                  ? 'border-[#1E3A8A] ring-2 ring-[#1E3A8A]/20'
                  : 'border-transparent hover:border-[#D1D5DB]'
              }`}
            >
              <img
                src={img.image}
                alt={`Thumbnail ${idx + 1}`}
                className="h-20 w-24 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23F3F4F6'/%3E%3Ctext x='50' y='60' text-anchor='middle' font-size='10' fill='%239CA3AF'%3EImg%3C/text%3E%3C/svg%3E";
                }}
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-50 bg-[#111827] bg-opacity-95 flex items-center justify-center p-4"
          onClick={() => setIsFullscreen(false)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFullscreen(false);
            }}
            className="absolute top-6 right-6 h-12 w-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-all z-10"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Fullscreen Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 h-12 w-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-all z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 h-12 w-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-all z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
          
          {/* Fullscreen Image */}
          <div 
            className="max-w-6xl max-h-[80vh] cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.image}
              alt={`Tool image ${selectedIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23111827'/%3E%3Ctext x='50' y='60' text-anchor='middle' font-size='14' fill='%239CA3AF'%3ETool%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
          
          {/* Thumbnails in Fullscreen */}
          {images.length > 1 && (
            <div 
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    idx === selectedIndex
                      ? 'w-8 bg-[#FACC15]'
                      : 'w-3 bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Download/Info Bar */}
          <div 
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-sm text-white/80 flex items-center space-x-4"
            onClick={(e) => e.stopPropagation()}
          >
            <span>Image {selectedIndex + 1} of {images.length}</span>
            <a 
              href={selectedImage.image} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#FACC15] hover:text-[#FACC15]/80"
              onClick={(e) => e.stopPropagation()}
            >
              Open in new tab
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;