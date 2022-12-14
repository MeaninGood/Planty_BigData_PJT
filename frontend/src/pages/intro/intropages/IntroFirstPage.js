import { Link, useNavigate } from 'react-router-dom';

const IntroFirstPage = ({ screenWidth, screenHeight, currentPage }) => {
  return (
    <div
      className="full-height first-page"
      style={{
        background: 'url(' + require('../css/First.webp') + ') no-repeat',
        backgroundSize: `${screenWidth}px ${screenHeight}px`,
      }}
    >
      <div className="first-line">
        <p className={currentPage === 0 ? 'first-page-ani-1' : ''}>식</p>
        <p className={currentPage === 0 ? 'first-page-ani-2' : ''}>물</p>
        <p className={currentPage === 0 ? 'first-page-ani-3' : ''}>로</p>
        <p className={currentPage === 0 ? 'first-page-ani-4' : ''}>&nbsp;</p>
        <p className={currentPage === 0 ? 'first-page-ani-5' : ''}>가</p>
        <p className={currentPage === 0 ? 'first-page-ani-6' : ''}>득</p>
        <p className={currentPage === 0 ? 'first-page-ani-7' : ''}>한</p>
        <p className={currentPage === 0 ? 'first-page-ani-8' : ''}>&nbsp;</p>
        <p className={currentPage === 0 ? 'first-page-ani-9' : ''}>이</p>
        <p className={currentPage === 0 ? 'first-page-ani-10' : ''}>&nbsp;</p>
        <p className={currentPage === 0 ? 'first-page-ani-11' : ''}>곳</p>
      </div>
      <div className="second-line">
        <Link to="/index">
          <p className={currentPage === 0 ? 'first-page-ani-12' : ''}>플</p>
          <p className={currentPage === 0 ? 'first-page-ani-13' : ''}>랜</p>
          <p className={currentPage === 0 ? 'first-page-ani-14' : ''}>티</p>
        </Link>
      </div>
    </div>
  );
};

export default IntroFirstPage;
