'use client';

import { useMemo, useState } from 'react';

type Raw = {
  ts?: string;
  endTime?: string;
  ms_played?: number;
  msPlayed?: number;
  master_metadata_track_name?: string | null;
  master_metadata_album_artist_name?: string | null;
  master_metadata_album_album_name?: string | null;
  trackName?: string | null;
  artistName?: string | null;
  albumName?: string | null;
};

type Play = {
  at: Date;
  ms: number;
  artist: string;
  track: string;
  album: string;
};

type Ranked = { name: string; detail?: string; ms: number; plays: number };

type Wrapped = {
  total: number;
  records: number;
  qualified: number;
  first: Date;
  last: Date;
  artists: Ranked[];
  tracks: Ranked[];
  albums: Ranked[];
  years: { year: number; ms: number; artist: string }[];
  hours: number[];
};

const fmt = new Intl.NumberFormat('en-CA');
const short = new Intl.NumberFormat('en-CA', { notation: 'compact', maximumFractionDigits: 1 });

function dateOf(value?: string) {
  if (!value) return null;
  const normalized = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(value)
    ? `${value.replace(' ', 'T')}:00Z`
    : value;
  const date = new Date(normalized);
  return Number.isNaN(date.valueOf()) ? null : date;
}

function arrays(value: unknown): Raw[] {
  if (Array.isArray(value)) return value as Raw[];
  if (!value || typeof value !== 'object') return [];
  const object = value as Record<string, unknown>;
  for (const key of ['items', 'streams', 'history', 'data']) {
    if (Array.isArray(object[key])) return object[key] as Raw[];
  }
  return Object.values(object).flatMap((entry) => (Array.isArray(entry) ? (entry as Raw[]) : []));
}

function normalize(rows: Raw[]) {
  return rows.flatMap((row): Play[] => {
    const at = dateOf(row.ts ?? row.endTime);
    const ms = Number(row.ms_played ?? row.msPlayed ?? 0);
    const artist = row.master_metadata_album_artist_name ?? row.artistName ?? '';
    const track = row.master_metadata_track_name ?? row.trackName ?? '';
    const album = row.master_metadata_album_album_name ?? row.albumName ?? 'Unknown album';
    return at && ms > 0 && artist && track ? [{ at, ms, artist, track, album }] : [];
  });
}

function rank(map: Map<string, Ranked>) {
  return [...map.values()].sort((a, b) => b.ms - a.ms || b.plays - a.plays);
}

function add(map: Map<string, Ranked>, key: string, name: string, ms: number, detail?: string) {
  const item = map.get(key);
  if (item) {
    item.ms += ms;
    item.plays += 1;
  } else {
    map.set(key, { name, detail, ms, plays: 1 });
  }
}

function calculate(plays: Play[]): Wrapped {
  const sorted = [...plays].sort((a, b) => a.at.valueOf() - b.at.valueOf());
  const artists = new Map<string, Ranked>();
  const tracks = new Map<string, Ranked>();
  const albums = new Map<string, Ranked>();
  const yearly = new Map<number, { ms: number; artists: Map<string, number> }>();
  const hours = Array(24).fill(0) as number[];
  let total = 0;

  for (const play of sorted) {
    total += play.ms;
    add(artists, play.artist, play.artist, play.ms);
    add(tracks, `${play.artist}|${play.track}`, play.track, play.ms, play.artist);
    add(albums, `${play.artist}|${play.album}`, play.album, play.ms, play.artist);
    hours[play.at.getHours()] += play.ms;

    const year = play.at.getFullYear();
    const row = yearly.get(year) ?? { ms: 0, artists: new Map<string, number>() };
    row.ms += play.ms;
    row.artists.set(play.artist, (row.artists.get(play.artist) ?? 0) + play.ms);
    yearly.set(year, row);
  }

  return {
    total,
    records: sorted.length,
    qualified: sorted.filter((play) => play.ms >= 30_000).length,
    first: sorted[0].at,
    last: sorted[sorted.length - 1].at,
    artists: rank(artists),
    tracks: rank(tracks),
    albums: rank(albums),
    hours,
    years: [...yearly.entries()]
      .sort(([a], [b]) => a - b)
      .map(([year, row]) => ({
        year,
        ms: row.ms,
        artist: [...row.artists.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'Unknown',
      })),
  };
}

function demo(): Play[] {
  const people = ['Northbound Static', 'Velvet Transit', 'Paper Satellites', 'Low Tide Radio'];
  const songs = ['Signals at 2AM', 'A Map Without Roads', 'Sunday in Reverse', 'Half-Light'];
  const rows: Play[] = [];
  let seed = 83177;
  const random = () => ((seed = (seed * 48271) % 2147483647) / 2147483647);
  const start = new Date(2015, 0, 1).valueOf();
  const end = Date.now();

  for (let index = 0; index < 3400; index += 1) {
    const artist = people[Math.floor(Math.pow(random(), 1.7) * people.length)];
    const track = songs[Math.floor(Math.pow(random(), 1.35) * songs.length)];
    const at = new Date(start + random() * (end - start));
    at.setHours(Math.floor(random() * 24));
    rows.push({
      at,
      ms: 65_000 + Math.floor(random() * 245_000),
      artist,
      track: index % 17 ? track : `${track} ${index}`,
      album: `Volume ${1 + Math.floor(random() * 5)}`,
    });
  }
  return rows;
}

function hours(ms: number) {
  return Math.round(ms / 3_600_000);
}

function date(date: Date) {
  return new Intl.DateTimeFormat('en-CA', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}

function Top({ title, items }: { title: string; items: Ranked[] }) {
  const max = items[0]?.ms || 1;
  return (
    <section className="panel list">
      <p className="eyebrow">{title}</p>
      {items.slice(0, 5).map((item, index) => (
        <article key={`${item.name}-${item.detail ?? ''}`}>
          <b>0{index + 1}</b>
          <div>
            <h3>{item.name}</h3>
            <small>{item.detail ? `${item.detail} · ` : ''}{fmt.format(item.plays)} plays · {short.format(hours(item.ms))}h</small>
            <i style={{ width: `${Math.max(7, (item.ms / max) * 100)}%` }} />
          </div>
        </article>
      ))}
    </section>
  );
}

export default function SpotifyLifetimePage() {
  const [plays, setPlays] = useState<Play[] | null>(null);
  const [sample, setSample] = useState(false);
  const [error, setError] = useState('');
  const stats = useMemo(() => (plays?.length ? calculate(plays) : null), [plays]);

  async function read(files: File[]) {
    setError('');
    try {
      const json = await Promise.all(
        files
          .filter((file) => file.name.toLowerCase().endsWith('.json'))
          .map(async (file) => arrays(JSON.parse(await file.text()))),
      );
      const next = normalize(json.flat());
      if (!next.length) throw new Error('No music rows');
      setSample(false);
      setPlays(next);
    } catch {
      setError('No Spotify music history found. Choose every StreamingHistory*.json or endsong_*.json file.');
    }
  }

  if (!stats) {
    return (
      <main className="wrapped landing">
        <div className="glow one" /><div className="glow two" />
        <nav><b><i /> Lifetime Wrapped</b><span>Private by design</span></nav>
        <div className="hero">
          <section>
            <p className="eyebrow">Not just this year</p>
            <h1>Your whole life<br />on <em>play.</em></h1>
            <p className="lead">A cinematic, factual Spotify Wrapped made from your full listening export—processed only inside this browser.</p>
          </section>
          <label className="drop">
            <input type="file" accept=".json,application/json" multiple onChange={(event) => void read(Array.from(event.target.files ?? []))} />
            <span>↗</span>
            <h2>Drop your Spotify history here</h2>
            <p>Select all JSON files from the basic or extended streaming-history export.</p>
            <strong>Choose files</strong>
          </label>
        </div>
        <footer>
          <button onClick={() => { setSample(true); setPlays(demo()); }}>Preview with clearly marked sample data</button>
          <span>Nothing is uploaded, stored, or tracked.</span>
        </footer>
        {error ? <aside>{error}</aside> : null}
        <Style />
      </main>
    );
  }

  const peak = stats.hours.indexOf(Math.max(...stats.hours));
  const maxHour = Math.max(...stats.hours, 1);
  const maxYear = Math.max(...stats.years.map((year) => year.ms), 1);

  return (
    <main className="wrapped story">
      <nav className="fixed">
        <button onClick={() => setPlays(null)}><i /> lifetime/wrapped</button>
        <span>{sample ? 'Sample preview' : 'Local Spotify export'}</span>
      </nav>

      <section className="slide intro">
        <p className="eyebrow">Your entire listening life</p>
        <h1>This wasn’t a year.<br />This was an <em>era.</em></h1>
        <p>{date(stats.first)} — {date(stats.last)}</p>
        {sample ? <mark>Sample data · import your export for real numbers</mark> : null}
      </section>

      <section className="slide numbers">
        <p className="eyebrow">Time well spent</p>
        <strong className="giant">{short.format(Math.round(stats.total / 60_000))}</strong>
        <h2>minutes with music</h2>
        <div className="metrics">
          <span><b>{short.format(stats.records)}</b>records</span>
          <span><b>{short.format(stats.qualified)}</b>30s+ plays</span>
          <span><b>{short.format(stats.artists.length)}</b>artists</span>
          <span><b>{short.format(stats.tracks.length)}</b>tracks</span>
        </div>
      </section>

      <section className="slide favorite">
        <p className="eyebrow">Your forever artist</p>
        <small>#1</small>
        <h2>{stats.artists[0]?.name}</h2>
        <p>{fmt.format(stats.artists[0]?.plays ?? 0)} plays · {fmt.format(hours(stats.artists[0]?.ms ?? 0))} hours</p>
        <div>{stats.artists.slice(1, 4).map((artist, index) => <span key={artist.name}>0{index + 2}<b>{artist.name}</b></span>)}</div>
      </section>

      <section className="slide rankings">
        <Top title="The artists that stayed" items={stats.artists} />
        <Top title="The songs that stayed" items={stats.tracks} />
      </section>

      <section className="slide clock">
        <header>
          <p className="eyebrow">Your listening clock</p>
          <h2>{new Intl.DateTimeFormat('en-CA', { hour: 'numeric' }).format(new Date(2026, 0, 1, peak))} is your power hour.</h2>
        </header>
        <div className="bars">
          {stats.hours.map((value, hour) => (
            <span key={hour} title={`${hour}:00 · ${hours(value)} hours`}>
              <i style={{ height: `${Math.max(4, (value / maxHour) * 100)}%` }} />
              {hour % 6 === 0 ? <small>{hour === 0 ? '12a' : hour < 12 ? `${hour}a` : hour === 12 ? '12p' : `${hour - 12}p`}</small> : null}
            </span>
          ))}
        </div>
      </section>

      <section className="slide timeline">
        <header>
          <p className="eyebrow">Every chapter had a soundtrack</p>
          <h2>{stats.years.length} years of evolving taste.</h2>
        </header>
        <div>
          {stats.years.map((year) => (
            <article key={year.year}>
              <b>{year.year}</b>
              <span><i style={{ width: `${Math.max(5, (year.ms / maxYear) * 100)}%` }} /></span>
              <strong>{year.artist}</strong>
              <small>{short.format(hours(year.ms))}h</small>
            </article>
          ))}
        </div>
      </section>

      <section className="slide finale">
        <div>
          <p className="eyebrow">Your lifetime wrapped</p>
          <h2>{stats.artists[0]?.name}</h2>
          <h3>{stats.tracks[0]?.name}</h3>
          <section>
            <span><b>{short.format(Math.round(stats.total / 60_000))}</b>minutes</span>
            <span><b>{short.format(stats.artists.length)}</b>artists</span>
            <span><b>{stats.years.length}</b>years</span>
          </section>
          <footer><span>{date(stats.first)} → {date(stats.last)}</span><span>Made privately in your browser</span></footer>
        </div>
        <button onClick={() => window.print()}>Save / print</button>
      </section>
      <Style />
    </main>
  );
}

function Style() {
  return <style jsx global>{`
    :root{color-scheme:dark}.wrapped{--ink:#f8f5ee;--black:#08090b;--lime:#dfff55;--pink:#ff5ba8;--violet:#8c72ff;--cyan:#62e7ff;position:fixed;inset:0;z-index:9999;overflow:auto;background:var(--black);color:var(--ink);font-family:Inter,ui-sans-serif,system-ui,sans-serif}.wrapped *{box-sizing:border-box}.wrapped button,.wrapped input{font:inherit}.wrapped nav{position:relative;z-index:3;display:flex;align-items:center;justify-content:space-between;padding:28px 4vw;font-size:12px;text-transform:uppercase;letter-spacing:.08em}.wrapped nav b,.wrapped nav button{display:flex;align-items:center;gap:10px;border:0;color:inherit;background:none;font-weight:900;text-transform:none;letter-spacing:-.02em;cursor:pointer}.wrapped nav i{width:12px;height:12px;border-radius:50%;background:var(--lime);box-shadow:0 0 26px var(--lime)}.landing{padding:0 2vw;background:radial-gradient(circle at 12% 10%,#5544aa88,transparent 32%),radial-gradient(circle at 85% 30%,#ff5ba844,transparent 32%),#08090b}.glow{position:fixed;width:380px;height:380px;border-radius:50%;filter:blur(90px);opacity:.22;animation:float 8s ease-in-out infinite}.glow.one{left:5%;bottom:5%;background:var(--cyan)}.glow.two{right:8%;top:10%;background:var(--pink);animation-delay:-3s}.hero{position:relative;z-index:2;display:grid;grid-template-columns:1.15fr .85fr;gap:8vw;align-items:center;width:min(1320px,94vw);min-height:calc(100vh - 150px);margin:auto}.eyebrow{margin:0 0 18px;color:var(--lime);font-size:12px;font-weight:900;letter-spacing:.18em;text-transform:uppercase}.wrapped h1{margin:0;font-size:clamp(64px,9vw,144px);line-height:.84;letter-spacing:-.075em}.wrapped em{color:transparent;font-family:Georgia,serif;font-weight:400;background:linear-gradient(110deg,var(--pink),var(--violet),var(--cyan));background-clip:text}.lead{max-width:650px;margin:32px 0 0;color:#f8f5eea8;font-size:clamp(18px,2vw,24px);line-height:1.5}.drop{position:relative;display:flex;min-height:410px;padding:40px;overflow:hidden;flex-direction:column;justify-content:flex-end;border:1px solid #ffffff33;border-radius:32px;background:linear-gradient(145deg,#ffffff18,#ffffff08);box-shadow:0 30px 90px #0008;backdrop-filter:blur(20px);cursor:pointer}.drop:before{content:"";position:absolute;width:300px;height:300px;right:-90px;top:-110px;border-radius:50%;background:linear-gradient(135deg,var(--pink),var(--violet));transition:.5s}.drop:hover:before{transform:scale(1.15) rotate(20deg)}.drop input{position:absolute;opacity:0}.drop>span{position:absolute;top:30px;left:36px;font-size:40px}.drop h2,.drop p,.drop strong{position:relative;z-index:2}.drop h2{margin:0 0 8px;font-size:32px;letter-spacing:-.04em}.drop p{max-width:390px;margin:0 0 24px;color:#f8f5ee99;line-height:1.5}.drop strong,.finale>button{align-self:flex-start;padding:14px 20px;border-radius:99px;color:#08090b;background:var(--lime)}.landing>footer{position:relative;z-index:2;display:flex;padding:0 4vw 28px;justify-content:space-between;color:#f8f5ee77;font-size:12px}.landing>footer button{padding:0;border:0;color:var(--ink);background:none;text-decoration:underline;text-underline-offset:4px;cursor:pointer}.landing aside{position:fixed;left:50%;bottom:24px;z-index:10;padding:12px 18px;border:1px solid #ff8dc055;border-radius:99px;background:#1a0e14;transform:translateX(-50%);font-size:13px}.story{height:100vh;scroll-snap-type:y mandatory;scrollbar-width:none}.story::-webkit-scrollbar{display:none}.fixed{position:fixed!important;top:0;left:0;right:0;z-index:20!important;background:linear-gradient(#08090bdd,transparent);pointer-events:none}.fixed>*{pointer-events:auto}.slide{position:relative;display:flex;min-height:100vh;padding:100px clamp(22px,7vw,120px) 55px;overflow:hidden;flex-direction:column;align-items:center;justify-content:center;scroll-snap-align:start;isolation:isolate}.intro{align-items:flex-start;background:radial-gradient(circle at 85% 70%,#62e7ff44,transparent 30%),radial-gradient(circle at 75% 15%,#ff5ba844,transparent 34%),linear-gradient(140deg,#08090b,#171227)}.intro p{color:#f8f5ee99;font-size:20px}.intro mark{padding:8px 12px;border:1px solid #ffffff33;border-radius:99px;color:var(--ink);background:#0004;font-size:12px}.numbers{text-align:center;color:#08090b;background:linear-gradient(135deg,var(--lime),var(--cyan))}.numbers .eyebrow{color:#08090baa}.giant{font-size:clamp(100px,20vw,315px);line-height:.75;letter-spacing:-.09em}.numbers h2{margin:25px 0 45px;font-size:clamp(38px,6vw,82px);letter-spacing:-.06em}.metrics{display:grid;width:min(900px,100%);grid-template-columns:repeat(4,1fr);gap:10px}.metrics span{display:flex;padding:20px 10px;border:1px solid #08090b33;border-radius:20px;flex-direction:column}.metrics b{font-size:clamp(25px,4vw,45px)}.favorite{text-align:center;background:radial-gradient(circle,#ff5ba855,transparent 35%),#120c17}.favorite>small{display:grid;width:80px;aspect-ratio:1;margin-bottom:28px;place-items:center;border:1px solid #dfff5577;border-radius:50%;color:var(--lime);font-weight:900}.favorite h2{max-width:1100px;margin:0;font:italic 400 clamp(55px,9vw,130px)/.9 Georgia,serif;letter-spacing:-.055em}.favorite>p{color:#f8f5ee99}.favorite>div{display:flex;margin-top:55px;gap:7vw}.favorite>div span{display:flex;flex-direction:column;color:var(--pink);font-size:11px;font-weight:900}.favorite>div b{margin-top:6px;color:var(--ink);font-size:16px}.rankings{display:grid;grid-template-columns:1fr 1fr;gap:6vw;align-items:center;background:radial-gradient(circle at 0 50%,#8c72ff44,transparent 35%),#0b0b10}.panel{width:100%}.list article{display:grid;grid-template-columns:34px 1fr;gap:14px;padding:16px 0;border-top:1px solid #ffffff22}.list article>b{color:var(--lime);font-size:12px}.list h3{margin:0 0 3px;overflow:hidden;font-size:clamp(18px,2vw,28px);letter-spacing:-.035em;text-overflow:ellipsis;white-space:nowrap}.list small{color:#f8f5ee77}.list article div>i{display:block;height:4px;margin-top:11px;border-radius:99px;background:linear-gradient(90deg,var(--pink),var(--violet),var(--cyan));animation:grow 1s ease both}.clock{align-items:stretch;background:radial-gradient(circle,#62e7ff33,transparent 38%),#081017}.clock header,.timeline header{width:min(1100px,100%);margin:auto}.clock h2,.timeline h2{margin:0;font-size:clamp(48px,8vw,108px);line-height:.93;letter-spacing:-.065em}.bars{display:flex;width:min(1100px,100%);height:280px;margin:65px auto 0;align-items:flex-end;gap:8px}.bars>span{position:relative;display:flex;height:100%;flex:1;align-items:flex-end}.bars i{display:block;width:100%;border-radius:8px 8px 2px 2px;background:linear-gradient(var(--cyan),var(--violet));animation:rise .9s ease both}.bars small{position:absolute;left:0;right:0;bottom:-26px;color:#f8f5ee66;text-align:center}.timeline{align-items:stretch;background:radial-gradient(circle at 100% 50%,#ff5ba833,transparent 38%),#10090d}.timeline>div{display:grid;width:min(1100px,100%);max-height:52vh;margin:45px auto 0;overflow:auto;gap:12px}.timeline article{display:grid;grid-template-columns:52px 1fr minmax(110px,.7fr) 44px;align-items:center;gap:14px}.timeline article>b{color:var(--lime);font-size:12px}.timeline article>span{height:8px;overflow:hidden;border-radius:99px;background:#ffffff14}.timeline article i{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,var(--pink),var(--violet))}.timeline article strong{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.timeline article small{color:#f8f5ee77;text-align:right}.finale{background:radial-gradient(circle at 50% 100%,#8c72ff66,transparent 38%),linear-gradient(145deg,#18101d,#08090b 65%)}.finale>div{width:min(850px,100%);padding:clamp(30px,5vw,65px);border:1px solid #ffffff33;border-radius:38px;background:linear-gradient(145deg,#ffffff18,#ffffff08);box-shadow:0 45px 120px #0008;backdrop-filter:blur(20px)}.finale h2{margin:0;font:italic 400 clamp(55px,8vw,105px)/.9 Georgia,serif;letter-spacing:-.055em}.finale h3{margin:18px 0 45px;color:var(--lime);font-size:25px}.finale section{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.finale section span{display:flex;padding:16px 0;border-top:1px solid #ffffff33;flex-direction:column;color:#f8f5ee77;font-size:11px;text-transform:uppercase}.finale section b{color:var(--ink);font-size:42px;letter-spacing:-.05em;text-transform:none}.finale footer{display:flex;margin-top:50px;justify-content:space-between;color:#f8f5ee66;font-size:11px}.finale>button{margin-top:20px;border:0;font-weight:900;cursor:pointer}@keyframes float{50%{transform:translateY(-30px) scale(1.08)}}@keyframes grow{from{width:0}}@keyframes rise{from{height:0}}@media(max-width:850px){.hero{grid-template-columns:1fr;padding:70px 0}.rankings{grid-template-columns:1fr;gap:45px}.metrics{grid-template-columns:repeat(2,1fr)}.fixed>span{display:none}}@media(max-width:600px){.wrapped h1{font-size:18vw}.drop{min-height:330px;padding:28px}.landing>footer{align-items:flex-start;flex-direction:column;gap:12px}.slide{padding:85px 18px 40px}.giant{font-size:24vw}.favorite>div{width:100%;gap:15px;justify-content:space-between}.favorite>div b{font-size:11px}.bars{gap:3px;height:210px}.timeline article{grid-template-columns:42px 1fr 38px}.timeline article strong{display:none}.finale section{grid-template-columns:1fr}.finale footer{flex-direction:column;gap:8px}}@media(prefers-reduced-motion:reduce){.wrapped *{animation:none!important;scroll-behavior:auto!important}}@media print{.fixed,.finale>button{display:none}.wrapped{position:static;overflow:visible}.slide{break-after:page}}
  `}</style>;
}
