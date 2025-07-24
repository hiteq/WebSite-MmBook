import * as React from "react";
import { memo, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ContentPlaceholder } from "./ContentPlaceholder";
import { Title } from "./Title";
import { Image } from "./Image";
import { openSpring, closeSpring } from "./animations";
import { useScrollConstraints } from "../utils/use-scroll-constraints";
import { useWheelScroll } from "../utils/use-wheel-scroll";
// Distance in pixels a user has to scroll a card down before we recognise
// a swipe-to dismiss action.
const dismissDistance = 150;
export const Card = memo(
  ({
    isSelected,
    id,
    title,
    category,
    // history prop 제거
    pointOfInterest,
    backgroundColor,
    article
  }) => {
    const navigate = useNavigate(); // useNavigate hook 사용
    const y = useMotionValue(0);
    const zIndex = useMotionValue(isSelected ? 2 : 0);
    // We'll use the opened card element to calculate the scroll constraints
    const cardRef = useRef(null);
    const constraints = useScrollConstraints(cardRef, isSelected);
    
    const checkSwipeToDismiss = React.useCallback(() => {
      if (y.get() > dismissDistance) {
        navigate("/");
      }
    }, [y, navigate]);
    
    // 스크롤 위치와 카드 위치 추적
    const initialPositionRef = useRef(null);
    const containerRefForPosition = useRef(null);
    
    const handleDragEnd = React.useCallback(() => {
      checkSwipeToDismiss();
    }, [checkSwipeToDismiss]);
    
    // z-index를 isSelected 상태에 따라 관리
    React.useEffect(() => {
      zIndex.set(isSelected ? 2 : 0);
      
      // 카드가 열릴 때 초기 위치 정보 저장
      if (isSelected && containerRefForPosition.current) {
        const rect = containerRefForPosition.current.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        initialPositionRef.current = {
          top: rect.top + scrollTop,
          scrollTop: scrollTop,
          viewportTop: rect.top
        };
      }
    }, [isSelected, zIndex]);
    
    // When this card is selected, attach a wheel event listener
    const containerRef = useRef(null);
    useWheelScroll(
      containerRef,
      y,
      constraints,
      checkSwipeToDismiss,
      isSelected
    );
    return (
      <li ref={(el) => {
        containerRef.current = el;
        containerRefForPosition.current = el;
      }} className={`card`}>
        <Overlay isSelected={isSelected} />
        <div className={`card-content-container ${isSelected && "open"}`}>
          <motion.img 
            className="close" 
            src={`${process.env.PUBLIC_URL}/images/btn_close.svg`}
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
          <motion.div
            ref={cardRef}
            className="card-content"
            style={{ zIndex, y }}
            layout
            layoutId={`card-${id}`}
            transition={isSelected ? openSpring : closeSpring}
            drag={isSelected ? "y" : false}
            dragConstraints={constraints}
            onDragEnd={handleDragEnd}
                          onLayoutAnimationStart={() => {
                // 레이아웃 애니메이션 시작 시 위치 보정
                if (isSelected) {
                  y.set(0);
                } else if (initialPositionRef.current && containerRefForPosition.current) {
                  // 닫힐 때: 정확한 위치 계산
                  const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
                  const currentRect = containerRefForPosition.current.getBoundingClientRect();
                  
                  // 원래 위치와 현재 위치의 차이 계산
                  const expectedViewportTop = initialPositionRef.current.top - currentScrollTop;
                  const actualViewportTop = currentRect.top;
                  
                  // y 오프셋만큼 차이가 있다면 그것을 보정
                  const offsetDifference = actualViewportTop - expectedViewportTop;
                  
                  // 부드럽게 보정
                  y.set(-offsetDifference);
                }
              }}
            onLayoutAnimationComplete={() => {
              // 레이아웃 애니메이션 완료 후 y 값 초기화
              if (!isSelected) {
                // 애니메이션 완료 후 최종 위치 조정
                setTimeout(() => {
                  y.set(0);
                }, 50);
              }
            }}
          >
            <Image
              id={id}
              isSelected={isSelected}
              pointOfInterest={pointOfInterest}
              backgroundColor={backgroundColor}
            />

            <Title title={title} category={category} isSelected={isSelected} />
            <ContentPlaceholder article={article} />
          </motion.div>
        </div>
        {!isSelected && <Link to={id} className={`card-open-link`} />}
      </li>
    );
  },
  (prev, next) => prev.isSelected === next.isSelected
);
const Overlay = ({ isSelected }) => (
  <motion.div
    initial={false}
    animate={{ opacity: isSelected ? 1 : 0 }}
    transition={{ duration: 0.2 }}
    style={{ pointerEvents: isSelected ? "auto" : "none" }}
    className="overlay"
  >
    <Link 
      to="/" 
      aria-label="Close card"
    />
  </motion.div>
);
