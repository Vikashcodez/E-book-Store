import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`absolute top-1/2 left-1/2 rounded-xl border-2 border-lavender-200 bg-white shadow-xl [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
  />
));
Card.displayName = 'Card';

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children
}) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef(null);
  const intervalRef = useRef();
  const container = useRef(null);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: '+=500',
        duration: config.durDrop,
        ease: config.ease
      });

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        'return'
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease
        },
        'return'
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    swap();
    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      return () => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        clearInterval(intervalRef.current);
      };
    }
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: e => {
            child.props.onClick?.(e);
            onCardClick?.(i);
          }
        })
      : child
  );

  return (
    <div
      ref={container}
      className="absolute bottom-0 right-0 transform translate-x-[5%] translate-y-[20%] origin-bottom-right perspective-[900px] overflow-visible max-[768px]:translate-x-[25%] max-[768px]:translate-y-[25%] max-[768px]:scale-[0.75] max-[480px]:translate-x-[25%] max-[480px]:translate-y-[25%] max-[480px]:scale-[0.55]"
      style={{ width, height }}
    >
      {rendered}
    </div>
  );
};

// Demo Hero Section with Lavender Theme
function HeroSection() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-lavender-50 via-white to-purple-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-lavender-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-lavender-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Discover Your Next
              <span className="block text-lavender-600 mt-2">Great Read</span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              Explore thousands of books, blogs, and resources in our digital library. 
              From timeless classics to modern bestsellers, find your perfect book today.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-lavender-600 text-white font-medium rounded-xl hover:bg-lavender-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                Browse Collection
              </button>
              <button className="px-8 py-4 bg-white text-lavender-600 font-medium rounded-xl hover:bg-lavender-50 transition-all duration-300 border-2 border-lavender-200 hover:border-lavender-300">
                Learn More
              </button>
            </div>

            <div className="flex items-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-lavender-600">10K+</div>
                <div className="text-sm text-gray-600 mt-1">Books Available</div>
              </div>
              <div className="w-px h-12 bg-lavender-200"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-lavender-600">500+</div>
                <div className="text-sm text-gray-600 mt-1">Daily Readers</div>
              </div>
              <div className="w-px h-12 bg-lavender-200"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-lavender-600">4.9★</div>
                <div className="text-sm text-gray-600 mt-1">User Rating</div>
              </div>
            </div>
          </div>

          {/* Right side - Card Stack */}
          <div className="relative h-[600px] lg:h-[700px]">
            <CardSwap
              width={400}
              height={500}
              cardDistance={50}
              verticalDistance={60}
              delay={4000}
              pauseOnHover={true}
              skewAmount={5}
              easing="elastic"
            >
              <Card className="bg-gradient-to-br from-lavender-400 to-purple-500 p-8 flex flex-col justify-between">
                <div>
                  <div className="text-white/80 text-sm font-medium mb-2">Featured Book</div>
                  <h3 className="text-3xl font-bold text-white mb-4">The Art of Reading</h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Discover the transformative power of books and how they shape our understanding of the world.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-semibold">
                    SA
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">Safiya Abdul</div>
                    <div className="text-white/70 text-xs">Author & Curator</div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-purple-400 to-lavender-500 p-8 flex flex-col justify-between">
                <div>
                  <div className="text-white/80 text-sm font-medium mb-2">Popular Choice</div>
                  <h3 className="text-3xl font-bold text-white mb-4">Digital Wisdom</h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Navigate the modern world with insights from technology, philosophy, and innovation.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-semibold">
                    4.8
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">★★★★★</div>
                    <div className="text-white/70 text-xs">2,400 reviews</div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-lavender-500 to-purple-600 p-8 flex flex-col justify-between">
                <div>
                  <div className="text-white/80 text-sm font-medium mb-2">New Release</div>
                  <h3 className="text-3xl font-bold text-white mb-4">Modern Stories</h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Contemporary narratives that capture the essence of our interconnected world.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                    <span className="text-white font-medium text-sm">Just Added</span>
                  </div>
                </div>
              </Card>
            </CardSwap>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-lavender-50 { background-color: #f5f3ff; }
        .bg-lavender-200 { background-color: #ddd6fe; }
        .bg-lavender-300 { background-color: #c4b5fd; }
        .bg-lavender-400 { background-color: #a78bfa; }
        .bg-lavender-500 { background-color: #8b5cf6; }
        .bg-lavender-600 { background-color: #9333ea; }
        .bg-lavender-700 { background-color: #7e22ce; }
        .from-lavender-50 { --tw-gradient-from: #f5f3ff; }
        .from-lavender-400 { --tw-gradient-from: #a78bfa; }
        .from-lavender-500 { --tw-gradient-from: #8b5cf6; }
        .to-lavender-500 { --tw-gradient-to: #8b5cf6; }
        .to-purple-500 { --tw-gradient-to: #a855f7; }
        .to-purple-600 { --tw-gradient-to: #9333ea; }
        .text-lavender-600 { color: #9333ea; }
        .text-lavender-700 { color: #7e22ce; }
        .border-lavender-200 { border-color: #ddd6fe; }
        .border-lavender-300 { border-color: #c4b5fd; }
        .hover\\:bg-lavender-50:hover { background-color: #f5f3ff; }
        .hover\\:bg-lavender-700:hover { background-color: #7e22ce; }
        .hover\\:border-lavender-300:hover { border-color: #c4b5fd; }

        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}

export default HeroSection;