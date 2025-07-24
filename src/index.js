import * as React from "react";
import { createRoot } from "react-dom/client";
import { Header } from "./Header";
import { CardList } from "./CardList";
import "./styles.css";

// Stagewise toolbar 관련 import
import { StagewiseToolbar } from "@stagewise/toolbar-react";
import ReactPlugin from "@stagewise-plugins/react";

function App() {
  // 개발 환경에서 불필요한 경고 숨기기
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // CSP 경고는 stagewise 툴바 정상 동작을 위해 필요하므로 무시
      const originalError = console.error;
      console.error = (...args) => {
        const message = args[0]?.toString() || '';
        if (message.includes('Content Security Policy') || 
            message.includes('X-Frame-Options') ||
            message.includes('iframe')) {
          return; // stagewise 관련 경고 무시
        }
        originalError.apply(console, args);
      };
    }
  }, []);

  return (
    <div className="container">
      {/* Stagewise 툴바는 개발 모드에서만 렌더링 */}
      {process.env.NODE_ENV === 'development' && (
        <StagewiseToolbar config={{ plugins: [ReactPlugin] }} />
      )}
      
      <Header />
      <CardList />
      <div className="link-stack">
        <div className="four-link">
          <img
            className="four-link-img"
            alt="전시 서문, 전시장 도면"
            src={`${process.env.PUBLIC_URL}/images/link-group-1.svg`}
          />
          <div className="fake-link-group">
            <a
              href="https://drive.google.com/open?id=11-iMd2N_CpTQOUhLFIvZ9QfDhnOoyfnq"
              // alt="전시 서문"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="fake-link" />
            </a>
            <a
              href="https://drive.google.com/open?id=1mvXOKqDstIKf64bfJaEDhDC5LNhvKLOy"
              // alt="전시장 도면"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="fake-link" />
            </a>
          </div>
        </div>
        <div className="four-link">
          <img
            className="four-link-img"
            alt="작가 노트, 우한나 CV"
            src={`${process.env.PUBLIC_URL}/images/link-group-2.svg`}
          />
          <div className="fake-link-group">
            <a
              href="https://drive.google.com/open?id=1fycwv3GvUJ0SmmzMiFSDu-xwHHSqqv3W"
              // alt="작가 노트"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="fake-link" />
            </a>
            <a
              href="https://drive.google.com/open?id=1MqWbn3VanJlNYZlT-eRRjUDaDTyC1m2h"
              // alt="우한나 CV"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="fake-link" />
            </a>
          </div>
        </div>
      </div>
      <h3>
        물라쥬 멜랑콜리크
        <br />
        우한나 개인전
        <br />
        2019.10.16 - 11.15
      </h3>
      <h4>
        PROJECT SPACE 사루비아다방
        <br />
        서울 종로구 자하문로 16길 4 지하
        <br />
        <a
          href="http://www.sarubia.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.sarubia.org
        </a>
      </h4>
      <div className="sns_button_container">
        <a
          href="https://www.facebook.com/sarubiadabang"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="sns_button"
            src={`${process.env.PUBLIC_URL}/images/fb-sarubia.svg`}
            alt="사루비아다방 페이스북 계정으로 연결"
          />
        </a>

        <a
          href="https://twitter.com/sarubiadabang"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="sns_button"
            src={`${process.env.PUBLIC_URL}/images/tw-sarubia.svg`}
            alt="사루비아다방 트위터 계정으로 연결"
          />
        </a>
        <a
          href="https://www.instagram.com/sarubia_official"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="sns_button"
            src={`${process.env.PUBLIC_URL}/images/insta-sarubia.svg`}
            alt="사루비아다방 인스타그램 계정으로 연결"
          />
        </a>
      </div>
      <p className="footer">
        <br />
        <br />
        Curator : 이관훈
        <br />
        Assistant curator : 문소영
        <br />
        Intern : 김재연
        <br />
        Poster design & motion graphic : 스트로크
        <br />
        Exhibition technician : 정기훈 조현수 최민규 최병석
        <br />
        Sound technician : 박이현
        <br />
        Objects photo : 이의록
        <br />
        Video recording : 김혜원
        <br />
        Steel modeling : 오병준
        <br />
        Dress making : 남화영
        <br />
        Pattern making : 노양원
        <br />
        Props donator : 구혜경 김태연 박선희
        <br />
        Endless cheer-up : 우정수 정수정
        <br />
        <br />
        <strong>후원</strong>
        <br />
        서울문화재단
        <br />
        한국문화예술위원회 시각예술창작산실
        <br />
        <br />
        우한나는 2020년 9월 네 번째 개인전을 앞두고 있습니다.
        <br />
        <a
          href="https://instagram.com/hannah.flashed.that"
          target="_blank"
          rel="noopener noreferrer"
        >
          instagram @hannah.flashed.that
        </a>
        <br />
        <br />
        Copyright 2020 Hannah Woo. All Rights Reserved.
      </p>
    </div>
  );
}
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(React.createElement(App, null));
