import './Home.scss';

import { useState, useEffect } from 'react';

interface ICompany {
  summary: string;
  founder: string;
  employees: string;
  links: {
    website: string;
    twitter: string;
  };
}

interface ILandpad {
  name: string;
  full_name: string;
  status: string;
  latitude: number;
  longitude: number;
  launches: string[];
  images: {
    large: string;
  };
}

const Home = () => {
  const [launches, setLaunches] = useState(0);
  const [capsules, setCapsules] = useState(0);
  const [crew, setCrew] = useState(0);
  const [company, setCompanyInformations] = useState<ICompany | undefined>(
    undefined
  );
  const [landpads, setLandpads] = useState<ILandpad[] | undefined>(undefined);

  const stats = [
    {
      key: 'launches',
      title: 'Number of launches',
      data: launches,
    },
    {
      key: 'capsules',
      title: 'Number of capsules',
      data: capsules,
    },
    {
      key: 'crew',
      title: 'Number of astronauts',
      data: crew,
    },
  ];

  const fetchData = () => {
    fetch('https://api.spacexdata.com/v4/launches')
      .then((res) => res.json())
      .then((d) => setLaunches(d.length));
    fetch('https://api.spacexdata.com/v4/capsules')
      .then((res) => res.json())
      .then((d) => setCapsules(d.length));
    fetch('https://api.spacexdata.com/v4/crew')
      .then((res) => res.json())
      .then((d) => setCrew(d.length));
    fetch('https://api.spacexdata.com/v4/company')
      .then((res) => res.json())
      .then((d) => setCompanyInformations(d));
    fetch('https://api.spacexdata.com/v4/landpads')
      .then((res) => res.json())
      .then((d) => setLandpads(d));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className="top-homepage">
        <div className="content">
          <h1>Welcome on SpaceX data viewer</h1>
          <p>
            Introducing the ultimate tool for SpaceX enthusiasts - a website
            that provides real-time statistics and information from SpaceX's
            open API. This website offers a comprehensive collection of data on
            SpaceX's launches, rockets, and spacecrafts.
          </p>
        </div>
      </section>
      <section className="stats wrapper">
        <h2>Statistics about SpaceX</h2>
        <div className="grid">
          {stats.map((stats) => (
            <article key={stats.key}>
              <h3>{stats.title}</h3>
              <p className="stats-data">{stats.data}</p>
            </article>
          ))}
        </div>
      </section>
      {company && (
        <section className="spacex wrapper">
          <h2>About SpaceX</h2>
          <p>{company.summary}</p>
          <ul>
            <li>
              Founded by <strong>{company.founder}</strong>
            </li>
            <li>
              <strong>{company.employees}</strong> employees
            </li>
          </ul>
          <a
            href={company.links.website}
            target="_blank"
            className="btn"
            rel="noreferrer"
          >
            See SpaceX website
          </a>
        </section>
      )}
      <section className="landpads">
        <h2>SpaceX Launchpads</h2>
        <ul>
          {landpads &&
            landpads.map((landpad) => (
              <li key={landpad.name}>
                <figure>
                  <img
                    src={landpad.images.large}
                    alt={`Image of ${landpad.full_name}`}
                  />
                </figure>
                <div className="content">
                  <span>{landpad.name}</span>
                  <h3>{landpad.full_name}</h3>
                  <p>
                    <strong>Position</strong>
                  </p>
                  <p>Lat: {landpad.latitude}</p>
                  <p>Long: {landpad.longitude}</p>
                </div>
              </li>
            ))}
        </ul>
      </section>
    </>
  );
};

export default Home;
