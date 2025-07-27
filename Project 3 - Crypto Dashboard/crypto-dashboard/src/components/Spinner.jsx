import { ClipLoader } from 'react-spinners';

const spinnerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '150px',
};

const Spinner = ({ loading = true, size = 50, color = "#0d6efd" }) => {
  return (
    <div style={spinnerStyle}>
      <ClipLoader loading={loading} size={size} color={color} />
    </div>
  );
};

export default Spinner
