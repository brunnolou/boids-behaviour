import seed from "seed-random";

export type SongPart = [number, number, number];
export type Song = SongPart[];

export const createSong = (seedString: string): Song => {
  seed(seedString, { global: true, entropy: false }); //over-ride global Math.random
  const song = Array(Math.round(2 + Math.random() * 4))
    .fill(0)
    .map<SongPart>((_, i) => [
      Math.random(),
      Math.random() * 0.3,
      Number(Math.random() > 0.5)
    ]);

  return song;
};
