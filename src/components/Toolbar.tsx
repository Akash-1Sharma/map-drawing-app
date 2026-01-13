interface Props {
  onExport: () => void;
}

const Toolbar = ({ onExport }: Props) => (
  <button
    onClick={onExport}
    style={{ position: 'absolute', top: 10, left:50, zIndex: 1000 }}
  >
    Export GeoJSON
  </button>
);

export default Toolbar;
