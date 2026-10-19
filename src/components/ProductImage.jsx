import {useState} from 'react';
const RAW = 'https://raw.githubusercontent.com/BenjitaDEV/TiendaOnlineBasico-Eva-1/main';
const BACKUP = '/vinyl-placeholder.svg';

export default function ProductImage({src, alt = '', className = ''}) {
  const [attempt, setAttempt] = useState(0);
  const local = src || BACKUP;
  const remote = src?.startsWith('/images/') ? `${RAW}${encodeURI(src)}` : BACKUP;
  const sources = [local, remote, BACKUP];
  return <img src={sources[Math.min(attempt, sources.length - 1)]} alt={alt} className={className} loading="lazy"
    onError={() => setAttempt(n => Math.min(n + 1, sources.length - 1))}/>;
}
