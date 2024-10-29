export type PreviewProps = {
  name: string | undefined;
  race: string | undefined;
  background: string | undefined;
  setName: (name: string | undefined) => void;
  setRace: (race: string | undefined) => void;
  setBackground: (background: string | undefined) => void;
};
