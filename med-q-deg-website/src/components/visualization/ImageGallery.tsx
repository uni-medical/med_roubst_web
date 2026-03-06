import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageGalleryProps {
  // Future: Can add props for dynamic image data
}

export default function ImageGallery({}: ImageGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Listen for gallery open events from example cards
    const handleOpenGallery = (event: CustomEvent) => {
      const { imageSrc, allImages, index } = event.detail;
      setCurrentImage(imageSrc);
      setImages(allImages);
      setCurrentIndex(index);
      setIsOpen(true);
    };

    window.addEventListener('open-gallery' as any, handleOpenGallery);

    return () => {
      window.removeEventListener('open-gallery' as any, handleOpenGallery);
    };
  }, []);

  useEffect(() => {
    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          setIsOpen(false);
          break;
        case 'ArrowLeft':
          navigatePrevious();
          break;
        case 'ArrowRight':
          navigateNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images]);

  const navigateNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentImage(images[currentIndex + 1] ?? null);
    }
  };

  const navigatePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentImage(images[currentIndex - 1] ?? null);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center"
        onClick={() => setIsOpen(false)}
      >
        {/* Backdrop - keep dark for image viewing */}
        <div className="absolute inset-0 bg-black/85 backdrop-blur-xl" />

        {/* Content */}
        <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative max-w-6xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Container - explicit dark for image viewer */}
            <div className="relative aspect-video bg-zinc-900/80 rounded-2xl overflow-hidden border border-zinc-700/50 backdrop-blur-xl">
              {currentImage ? (
                <img
                  src={currentImage}
                  alt="Example"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-500">
                  <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={navigatePrevious}
                    disabled={currentIndex === 0}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-zinc-800/80 border border-zinc-700/50 backdrop-blur-sm flex items-center justify-center text-zinc-300 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    onClick={navigateNext}
                    disabled={currentIndex === images.length - 1}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-zinc-800/80 border border-zinc-700/50 backdrop-blur-sm flex items-center justify-center text-zinc-300 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Controls */}
            <div className="absolute -top-16 right-0 flex items-center gap-3">
              {/* Counter */}
              {images.length > 1 && (
                <div className="bg-zinc-800/80 border border-zinc-700/50 backdrop-blur-sm px-4 py-2 rounded-xl text-sm">
                  <span className="text-white font-medium">{currentIndex + 1}</span>
                  <span className="text-zinc-400"> / {images.length}</span>
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-zinc-700/50 backdrop-blur-sm flex items-center justify-center text-zinc-300 hover:text-white transition-all hover:scale-110"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Info Panel */}
            <div className="mt-6 bg-zinc-800/80 border border-zinc-700/50 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">
                    Use arrow keys to navigate · Press ESC to close
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
