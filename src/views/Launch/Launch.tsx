import './Launch.scss';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import DefaultBanner from 'assets/img/fh_feature.webp';

interface ILaunch {
  id: string;
  details: string;
  name: string;
  launchpad: string;
  date_utc: number;
  crew: string[];
  payloads: string[];
  failures: IFailure[];
  links: {
    flickr: {
      original: string[];
    }
    youtube_id: string;
  }
}

interface IFailure {
  altitude: number | null;
  time: number;
  reason: number;
}

interface IPayload {
  name: string;
  type: number;
  mass_kg: number;
  orbit: string;
}

const Launch = () => {
  const { launchId } = useParams();
  const [launch, setLaunch] = useState<ILaunch | undefined>(undefined);
  const [payloads, setPayloads] = useState<IPayload[] | undefined>(undefined);

  const fetchData = () => {
    fetch(`https://api.spacexdata.com/v4/launches/${launchId}`)
      .then((res) => res.json())
      .then((d) => setLaunch(d));
  };

  const fetchLinkedData = () => {
    launch?.payloads.map((payload) => {
      fetch(`https://api.spacexdata.com/v4/payloads/${payload}`)
        .then((res) => res.json())
        .then((d) => setPayloads((prev) => [...(prev ?? []), d]));
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    setPayloads([]);
    console.log(launch);
    
    fetchLinkedData();
  }, [launch]);

  return launch ? (
    <>
      <section className="top-launch">
        <figure>
          <img src={launch.links.flickr.original[0] || DefaultBanner } alt={`Image of ${launch.name} launch`} />
        </figure>
        <h1>{launch.name}</h1>
      </section>
      <article className="wrapper article-launch">
        <div>
          <h2>Informations</h2>
          <p>{launch.details}</p>
        </div>
        {launch.failures && launch.failures.length > 0 && (
          <div>
            <h2>Failures</h2>
            <table>
              <thead>
                <tr>
                  <th>Reason</th>
                  <th>Time</th>
                  <th>Altitude</th>
                </tr>
              </thead>
              <tbody>
                {launch.failures.map((failure, i) => (
                  <tr key={`failure-${i}`}>
                    <td>{failure.reason}</td>
                    <td>{failure.time}</td>
                    <td>{failure.altitude ?? 'Unknown'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {payloads && payloads.length > 0 && (
          <div>
            <h2>Payloads</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Orbit</th>
                  <th>Mass (kg)</th>
                </tr>
              </thead>
              <tbody>
                {payloads.map((payload, i) => (
                  <tr key={`payload-${i}`}>
                    <td>{payload.name}</td>
                    <td>{payload.type}</td>
                    <td>{payload.orbit}</td>
                    <td>{payload.mass_kg} kg</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {launch.links.flickr.original.length > 0 && (
          <div>
            <h2>Pictures</h2>
            <ul>
              {launch.links.flickr.original.map((pic, i) => (<li key={`pic-${i}`}>
                <figure>
                  <img src={pic} alt={`Image of ${launch.name} launch`} />
                </figure>
              </li>))}
            </ul>
          </div>
        )}
        {launch.links.youtube_id && (
          <div>
            <h2>Video</h2>
            <iframe src={`https://www.youtube.com/embed/${launch.links.youtube_id}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
          </div>
        )}
      </article>
    </>
  ) : (<p>Loading...</p>);
};

export default Launch;
