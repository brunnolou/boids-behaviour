import * as Tone from "tone";
import "./styles.css";
import { createSong, Song } from "./createSong";
import { Oscillator } from "tone";
import { Canvas } from "./Canvas";

export default function App() {
  const play = ({
    duration = 0.3,
    startNote = 7,
    rampTo = 7,
    delay = Tone.now()
  }) => {
    // const synth = new Tone.Synth().toDestination();
    //play a middle 'C' for the duration of an 8th note
    // synth.triggerAttackRelease("C7", "4n");

    const osc = new Oscillator().toDestination();

    osc.frequency.value = "G" + startNote;
    osc.frequency.rampTo("G" + (startNote + rampTo), duration, delay);
    osc.start(delay + 0.01).stop(delay + duration / 2);
  };

  const notes = [
    { startNote: 7, rampTo: 7 },
    { startNote: 8, rampTo: -3 }
  ];

  const playSong = (song: Song) => {
    let now = Tone.now();
    song.forEach(([duration, delay, note]) => {
      play({ duration, delay: now, ...notes[note] });

      now += duration + delay * 0.8;
    });
  };

  const song1: Song = [
    [0.1, 0.02, 0],
    [0.1, 0.02, 1],
    [0.1, 0.02, 0],
    [0.1, 0.02, 1],
    [0.1, 0.02, 0],
    [0.1, 0.02, 1]
  ];

  const song2: Song = [
    [0.3, 0, 1],
    [0.4, 0, 0],
    [0.2, 0, 1],
    [0.2, 0, 1],
    [0.2, 0, 1]
  ];

  return (
    <div className="App">
      <Canvas />
      <h1>Hello CodeSandbox</h1>
      <button onClick={() => play({ duration: 0.3 })}>Play</button>
      <button onClick={() => play({ duration: 0.3, startNote: 8, rampTo: -3 })}>
        Play
      </button>
      <button onClick={() => play({ duration: 0.3, startNote: 9, rampTo: -3 })}>
        Play
      </button>
      <br />
      <br />
      <button onClick={() => playSong(song1)}>Song 1</button>
      <button onClick={() => playSong(song2)}>Song 2</button>
      <br />
      <button onClick={() => playSong(createSong("a"))}>Random A</button>
      <button onClick={() => playSong(createSong("c"))}>Random</button>
    </div>
  );
}
