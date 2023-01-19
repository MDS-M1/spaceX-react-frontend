import './Capsules.scss';

import { useState, useEffect } from 'react';

import { pagination } from 'utils/pagination';

interface ICapsule {
  id: string;
  type: string;
  status: string;
  serial: string;
  last_update: string;
  reuse_count: number;
  water_landings: number;
  land_landings: number;
}

const MAX_RES_PER_PAGE = 10;

const Capsules = () => {
  const [capsules, setCapsules] = useState<ICapsule[] | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = () => {
    fetch('https://api.spacexdata.com/v4/capsules')
      .then((res) => res.json())
      .then((d) => setCapsules(d));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className="top-capsules">
        <h1>SpaceX capsules</h1>
      </section>
      {capsules && (
        <section className="wrapper capsules">
          <span>
            Showing {currentPage === 1 ? 1 : MAX_RES_PER_PAGE * currentPage - MAX_RES_PER_PAGE + 1} to{' '}
            {currentPage === 1 ? MAX_RES_PER_PAGE : (MAX_RES_PER_PAGE * currentPage) > capsules.length ? capsules.length : MAX_RES_PER_PAGE * currentPage}{' '}
            of {capsules.length} entries
          </span>
          <div className="list">
            {capsules
              .slice((currentPage - 1) * MAX_RES_PER_PAGE, currentPage * MAX_RES_PER_PAGE)
              .map((capsule) => (
                <article key={capsule.id}>
                  <div className="title">
                    <span className={`status ${capsule.status}`}>{capsule.status}</span>
                    <h3><strong>{capsule.serial}</strong></h3>
                  </div>
                  <ul>
                    <li>Reused: <strong>{capsule.reuse_count}</strong></li>
                    <li>Water landings: <strong>{capsule.water_landings}</strong></li>
                    <li>Land landings: <strong>{capsule.land_landings}</strong></li>
                  </ul>
                </article>
              ))}
          </div>
          <div className="list-bottom">
            <ul className="pagination">
              {capsules &&
            pagination(currentPage, Math.round(capsules.length / MAX_RES_PER_PAGE)).map(
              (page: number | string, i: number) => (
                <li key={`page-${i}`} onClick={() => {
                  if (typeof page !== 'string') {
                    setCurrentPage(page);
                    window.scrollTo({
                      top: 0,
                      left: 0,
                      behavior: 'smooth'
                    });
                  }}} className={page === currentPage ? 'current' : ''}>
                  {page}
                </li>
              )
            )}
            </ul>
            <span>
              Showing {currentPage === 1 ? 1 : MAX_RES_PER_PAGE * currentPage - MAX_RES_PER_PAGE + 1} to{' '}
              {currentPage === 1 ? MAX_RES_PER_PAGE : (MAX_RES_PER_PAGE * currentPage) > capsules.length ? capsules.length : MAX_RES_PER_PAGE * currentPage}{' '}
              of {capsules.length} entries
            </span>
          </div>
        </section>
      )}
    </>
  );
};

export default Capsules;
