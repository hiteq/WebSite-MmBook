import { useDomEvent } from "framer-motion";
import { spring } from "popmotion";
import { mix } from "@popmotion/popcorn";
import { debounce } from "lodash";
// Absolute distance a wheel scroll event can travel outside of
// the defined constraints before we fire a "snap back" animation
const deltaThreshold = 5;
// If wheel event fires beyond constraints, multiple the delta by this amount
const elasticFactor = 0.2;
function springTo(value, from, to) {
  // isAnimating() 메서드 체크 개선
  try {
    if (value.isAnimating && value.isAnimating()) return;
  } catch (error) {
    // isAnimating 메서드가 없거나 실패하는 경우 무시
  }
  
  value.start(complete => {
    const animation = spring({
      from,
      to,
      velocity: value.getVelocity(),
      stiffness: 400,
      damping: 40
    }).start({
      update: v => value.set(v),
      complete
    });
    return () => {
      try {
        animation.stop();
      } catch (error) {
        console.warn('Animation stop failed:', error);
      }
    };
  });
}
const debouncedSpringTo = debounce(springTo, 100);
/**
 * Re-implements wheel scroll for overlflow: hidden elements.
 *
 * Adds Apple Watch crown-style constraints, where the user
 * must continue to input wheel events of a certain delta at a certain
 * speed or the scrollable container will spring back to the nearest
 * constraint.
 *
 * Currently achieves this using event.deltaY and a debounce, which
 * feels pretty good during direct input but it'd be better to increase
 * the deltaY threshold during momentum scroll.
 *
 * TODOs before inclusion in Framer Motion:
 * - Detect momentum scroll and increase delta threshold before spring
 * - Remove padding hack
 * - Handle x-axis
 * - Perhaps handle arrow and space keyboard events?
 *
 * @param ref - Ref of the Element to attach listener to
 * @param y - MotionValue for the scrollable element - might be different to the Element
 * @param constraints - top/bottom scroll constraints in pixels.
 * @param isActive - `true` if this listener should fire.
 */
export function useWheelScroll(ref, y, constraints, onWheelCallback, isActive) {
  const onWheel = event => {
    event.preventDefault();
    const currentY = y.get();
    let newY = currentY - event.deltaY;
    let startedAnimation = false;
    const isWithinBounds =
      constraints && newY >= constraints.top && newY <= constraints.bottom;
    if (constraints && !isWithinBounds) {
      newY = mix(currentY, newY, elasticFactor);
      if (newY < constraints.top) {
        if (event.deltaY <= deltaThreshold) {
          springTo(y, newY, constraints.top);
          startedAnimation = true;
        } else {
          debouncedSpringTo(y, newY, constraints.top);
        }
      }
      if (newY > constraints.bottom) {
        if (event.deltaY >= -deltaThreshold) {
          springTo(y, newY, constraints.bottom);
          startedAnimation = true;
        } else {
          debouncedSpringTo(y, newY, constraints.bottom);
        }
      }
    }
    if (!startedAnimation) {
      // 진행 중인 애니메이션이 있다면 중단하고 새 값 설정
      try {
        if (y.stop && typeof y.stop === 'function') {
          y.stop();
        }
      } catch (error) {
        // stop 메서드 호출 실패 시 무시하고 계속 진행
        console.warn('MotionValue.stop() failed:', error);
      }
      y.set(newY);
    } else {
      debouncedSpringTo.cancel();
    }
    onWheelCallback(event);
  };
  useDomEvent(ref, "wheel", isActive && onWheel, { passive: false });
}
