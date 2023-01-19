import './Launches.scss';

import { useState, useEffect } from 'react';

import noImg from 'assets/img/no-image.svg';
import { Link } from 'react-router-dom';

interface ILaunch {
  id: string;
  name: string;
  launchpad: string;
  date_utc: number;
  crew: string[];
  upcoming: boolean;
  payloads: string[];
  failures: string[];
  ships: string[];
  links: {
    patch: {
      large: string;
    }
  }
}

const MAX_RES_PER_PAGE = 10;

const Launches = () => {
  const [launches, setLaunches] = useState<ILaunch[] | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = () => {
    fetch('https://api.spacexdata.com/v4/launches')
      .then((res) => res.json())
      .then((d) => setLaunches(d));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getRange = (start: number, end: number) => {
    return Array(end - start + 1).fill(0)
      .map((v, i) => i + start);
  };

  const pagination = (currentPage: number, pageCount: number) => {
    let delta: number;
    if (pageCount <= 7) {
      delta = 7;
    } else {
      delta = currentPage > 4 && currentPage < pageCount - 3 ? 2 : 4;
    }

    const range = {
      start: Math.round(currentPage - delta / 2),
      end: Math.round(currentPage + delta / 2),
    };

    if (range.start - 1 === 1 || range.end + 1 === pageCount) {
      range.start += 1;
      range.end += 1;
    }

    let pages: any =
      currentPage > delta
        ? getRange(
          Math.min(range.start, pageCount - delta),
          Math.min(range.end, pageCount)
        )
        : getRange(1, Math.min(pageCount, delta + 1));

    const withDots = (value: number, pair: any) =>
      pages.length + 1 !== pageCount ? pair : [value];

    if (pages[0] !== 1) {
      pages = withDots(1, [1, '...']).concat(pages);
    }

    if (pages[pages.length - 1] < pageCount) {
      pages = pages.concat(withDots(pageCount, ['...', pageCount]));
    }

    return pages;
  };

  return (
    <>
      <section className="top-launches">
        <h1>SpaceX Launch Schedule: Past and Upcoming Missions</h1>
      </section>
      {launches && (
        <section className="wrapper launches">
          <span>
            Showing {currentPage === 1 ? 1 : MAX_RES_PER_PAGE * currentPage - MAX_RES_PER_PAGE + 1} to{' '}
            {currentPage === 1 ? MAX_RES_PER_PAGE : (MAX_RES_PER_PAGE * currentPage) > launches.length ? launches.length : MAX_RES_PER_PAGE * currentPage}{' '}
            of {launches.length} entries
          </span>
          <div className="list">
            {launches
              .slice((currentPage - 1) * MAX_RES_PER_PAGE, currentPage * MAX_RES_PER_PAGE)
              .map((launch) => (
                <article key={launch.id}>
                  <figure>
                    <img src={launch.links.patch.large || noImg} alt="" />
                  </figure>
                  <div className="content">
                    <div className="title">
                      {launch.upcoming && (<span className="upcoming">Up Coming</span>)}
                      <h3><strong>{launch.name}</strong></h3>
                    </div>
                    <p>{new Date(launch.date_utc).toLocaleDateString('fr')}</p>
                    <ul>
                      <li>Ships: <strong>{launch.ships.length}</strong></li>
                      <li>Payloads: <strong>{launch.payloads.length}</strong></li>
                      <li>Failures: <strong>{launch.failures.length}</strong></li>
                    </ul>
                    <Link to={`/launch/${launch.id}`} className="btn">En savoir plus</Link>
                  </div>
                </article>
              ))}
          </div>
          <div className="list-bottom">
            <ul className="pagination">
              {launches &&
            pagination(currentPage, Math.round(launches.length / MAX_RES_PER_PAGE)).map(
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
              {currentPage === 1 ? MAX_RES_PER_PAGE : (MAX_RES_PER_PAGE * currentPage) > launches.length ? launches.length : MAX_RES_PER_PAGE * currentPage}{' '}
              of {launches.length} entries
            </span>
          </div>
        </section>
      )}
    </>
  );
};

export default Launches;
